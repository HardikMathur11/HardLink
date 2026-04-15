const {Schema} = require('mongoose');
const mongose = require('mongoose');


const userSchema = new Schema({
    FirstName : {
        type : String ,
        reuired : true,
    },
    LastName : {
        type : String ,
        reuired : true,
    },
    Email : {
        type : String ,
        required : true,
        unique : true,
    },
    password : {
        type : String ,
        required : true,
    }
}),runvalidators = true;
const User = mongose.model('user',userSchema);
module.exports = User;