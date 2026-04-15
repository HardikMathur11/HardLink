const mongoose = require('mongoose');



async function main()
{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
       
    }
    catch(err){
         throw new Error("Error while connecting to DB : " + err);
}
}


module.exports = main;