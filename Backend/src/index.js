const Express = require('express');
require('dotenv').config();
const app = Express();
const cookieparser = require('cookie-parser')
const main = require('./config/db')
const generateShortUrl = require('./utils/short');
const Longschema = require('./models/longtoshort')

const cors = require('cors')

const ratelimit = require('./middleware/ratelimiter');
const authrouter = require('./routes/authroutes');
const usermiddleware = require('./middleware/usermiddleare');

let frontendUrl = process.env.FRONTEND_URL || "";
if (frontendUrl && !frontendUrl.startsWith('http')) {
  frontendUrl = `https://${frontendUrl}`;
}

const allowedOrigins = [
  'http://localhost:5173',
  'https://hardlink.vercel.app',
  'https://hard-link.vercel.app',
  frontendUrl
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(Express.json());
app.use(cookieparser())
app.use(ratelimit);
app.use('/auth', authrouter)



app.post('/short', usermiddleware, async (req, res) => {
  const { Longurl, customAlias } = req.body;
  const userID = req.user._id;

  let shorturl;

  if (customAlias) {
    const exist = await Longschema.findOne({ Shorturl: customAlias });
    if (exist) {
      return res.status(400).json({ message: "Custom Alias is already taken!" });
    }
    shorturl = customAlias;
  } else {
    const exist = await Longschema.findOne({ Longurl, userID });
    if (exist && !exist.Shorturl.includes("-")) {
      const fullShortUrl = `${req.protocol}://${req.get('host')}/${exist.Shorturl}`;
      return res.json({ shorturl: fullShortUrl });
    }
    shorturl = generateShortUrl(Longurl + userID)
  }

  const fullShortUrl = `${req.protocol}://${req.get('host')}/${shorturl}`;

  await Longschema.create({
    userID,
    Longurl,
    Shorturl: shorturl
  });

  res.status(200).json({
    message: "Short URL created successfully",
    shorturl: fullShortUrl,
  });
});

app.get('/fetchdata', usermiddleware, async (req, res) => {
  try {
    const userUrls = await Longschema.find({ userID: req.user._id });

    res.status(200).json(userUrls);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch URLs" });
  }
})

app.get('/:shortCode', async (req, res) => {
  const Shorturl = req.params.shortCode;

  const url = await Longschema.findOne({ Shorturl });

  if (!url) {
    return res.status(404).json({ message: 'URL not found' });
  }

  url.clicks += 1;
  await url.save();

  res.redirect(url.Longurl);
});

const Initializeconnection = async () => {
  try {
    await main()
    await Longschema.syncIndexes();
    const port = process.env.PORT || 4000;
    app.listen(port)
  }
  catch (err) {
  }
}

if (process.env.NODE_ENV !== 'production') {
  Initializeconnection();
} else {
  // Setup logic for serverless (Vercel)
  main().then(() => {
    Longschema.syncIndexes().catch(err => console.error("Sync error:", err));
  }).catch(err => console.error("DB Connection error:", err));
}

module.exports = app;