const mongoose = require('mongoose'); // Erase if already required
const crypto = require("crypto");
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        index:true,
    },
        lastname:{
        type:String,
        required:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profile:{
        type:String,
        default : ""
    },
    passwordChangedAt : Date,
    passwordResetToken : String,
    passwordResetExpires : Date,

    role : {
        type : String,
        default : "user"
    },
    cart : {
        type: Array,
        default: []
    },
    isBlocked : {
        type : Boolean,
        default : false
    },
    refreshToken : {
     type : String
    },
    address : {
        type : String
    },
    wishlist : [{type : mongoose.Schema.Types.ObjectId, ref: "Product"}]
}, {
timestamps : true
});
userSchema.methods.createPasswordResetToken = async function() {
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000 //10 minutes //saved ten minutes ahead in the future
    return resetToken;
}
//Export the model
module.exports = mongoose.model('User', userSchema);