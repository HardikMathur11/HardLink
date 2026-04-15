const rateobject = {
    windowMs: 10 * 60 * 1000,
    maxrequest: 100,
    ip: {}
}
const ratelimit = async (req, res, next) => {

    if (!rateobject.ip[req.ip]) {
        rateobject.ip[req.ip] = {
            count: 1,
            lastreq: Date.now(),
            windowlength: rateobject.windowMs

        }
        return next()
    }
    else {
        let diff = Date.now() - rateobject.ip[req.ip].lastreq
        if (diff < rateobject.windowMs) {
            if (rateobject.ip[req.ip].count < rateobject.maxrequest) {
                rateobject.ip[req.ip].count++

                return next()
            }
            else {
                rateobject.ip[req.ip].windowlength = rateobject.ip[req.ip].lastreq + rateobject.windowMs
                return res.status(429).json({ message: "Too many requests, pause and take rest" })
            }
        }
        else {
            rateobject.ip[req.ip].count = 1
            rateobject.ip[req.ip].lastreq = Date.now()
            rateobject.ip[req.ip].windowlength = Date.now() + rateobject.windowMs
            return next()
        }


    }
}



module.exports = ratelimit