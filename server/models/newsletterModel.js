const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const newsletterSchema = new Schema({
    email : String

})
module.exports = mongoose.model("Newsletter", newsletterSchema)
// Mongoose automatically looks for the plural, lowercased version of your model name