const path = require("path")
const Newsletter = require(path.join(__dirname, "..", "models", "newsletterModel.js"))
const createNewsletter = async (req, res) => {
const email = req.body.email;
try{
  const alreadySubscribed = await Newsletter.findOne({email})
  if(alreadySubscribed){
    return res.status(200).json({"message" : "user already subscribed", "success": "false"})
  }

  const newSubscriber =  new Newsletter({
    email : email
  })
  await newSubscriber.save()
  res.status(201).json(newSubscriber)

}
catch(error){
console.log(error)
}
}
module.exports = { createNewsletter}