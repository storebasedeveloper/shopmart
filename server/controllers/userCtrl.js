const path = require("path")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const validateMongoDbId = require(path.join(__dirname, "..", "utils", "validateMongodbid.js"))
const generateAccessToken = require(path.join(__dirname, "..", "config", "jwtToken.js"))
const generateRefreshToken = require(path.join(__dirname, "..", "config", "refreshToken.js"))
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const User = require(path.join(__dirname, "..", "models", "userModel.js"))
const Cart = require(path.join(__dirname, "..", "models", "cartModel.js"))
const Coupon = require(path.join(__dirname, "..", "models", "couponModel.js"))
const Product = require(path.join(__dirname, "..", "models", "productModel.js"))
const Order = require(path.join(__dirname, "..", "models", "orderModel.js"))
const sendEmail = require(path.join(__dirname, "..", "controllers", "emailCtrl.js"))
const uniqid = require('uniqid'); 
const otpGenerator = require("otp-generator")
const { log } = require("console")
//Register A User
const createUser = async (req, res) => {
const {firstname, lastname, email, mobile, password, role, profile} = req.body;
    const user = req.body.email
    if(!user){
        return res.json({"message": "Enter your email", "success": false})
    }
    try{
    const foundUser = await User.findOne({email : user})
    if(!foundUser){
        const hashedPwd = await bcrypt.hash(password, 10);
  const newUser = await User.create(
  {
    firstname,
    lastname,
    email,
    mobile,
    password: hashedPwd,
    role,
    profile : profile,
    ipAddress : req.header('x-forwarded-for') || req.socket.remoteAddress
  }
  );
  const data = {
    to : email,
    subject : "Signup Successfull",
    html : `<div class="container" style="width: 100%; height: 100%; background-color: #f3f3f3; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
    margin: auto;
  width: 50%;
  padding: 100px;">
<h3 style="text-align: center; font-weight: 900;">Shopmart</h3>
 <div class="inner-container" style="background-color: white; color: black; padding: 50px; border-top: 2px solid black;"> <p>
    Thank you for creating a Shopmart account.We're very excited to have you on board.
 </p>
<p style="color:black">
<span style="font-weight: 900;">${firstname}${"-"}${lastname}</span>
</p>
  If you have any questions, please visit our <span style="color:black"> Help Center</span> or send an email to <span style="color:#fb9129; font-weight: 700;">adelajawaheed36@gmail.com </span> and we will be happy to assist you.
            <p><li style="list-style-type: none;">       Best Regards,</li>
     <li style="list-style-type: none;">  The Shopmart Team!</li>
          </p>
        </div>
    </div>`,
    text : "Signup Successfull"
}
sendEmail(data)
  res.status(201).json(newUser)
    }else{
        res.json({
            "msg" : "user already exists",
            "success" : false
        })

    }
}catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "createUserError.txt", "user")

}
}
//Login A User
const loginUser = async (req,res)=> {
    const {email, password} = req.body;
    if(!email){
        return res.json({"message": "Enter your email", "success": false})
    }
    try{
        const foundUser = await User.findOne({ email })
        if(!foundUser) {
            return res.status(401).json({"msg": "User does not exist", "success" : false})  //unAuthorized
           } 
           const match = await bcrypt.compare(password, foundUser.password);
        if(foundUser && match){
const id = foundUser?._id.toString()
const refreshToken = generateRefreshToken(id);
const updateUser = await User.findByIdAndUpdate(id, {refreshToken : refreshToken}, {new: true});
console.log(refreshToken)
res.cookie("refreshToken", refreshToken, {httpOnly : true, maxAge : 72 * 60 * 60 * 1000})
            res.json({
                _id : foundUser?._id,
                firstname : foundUser?.firstname,
                lastname: foundUser?.lastname,
            email : foundUser?.email,
            mobile : foundUser?.mobile,
            token : generateAccessToken(id)
                })
       
        }else{
            return res.status(401).json({"msg": "Invalid Credentials", "success" : false})
        }
       
    }catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.stack}`, "loginUserError.txt", "user")
    }
}
//Admin Login
const loginAdmin = async (req,res)=> {
    const {email, password} = req.body;
    if(!email){
        return res.json({"message": "Enter your email", "success": false})
    }
    try{
        const foundAdmin = await User.findOne({ email })
        if(!foundAdmin) {
            return res.status(401).json({"msg": "User does not exist", "success" : false})  //unAuthorized
           } 
           if(foundAdmin.role !== "admin"){
            return res.status(401).json({"msg": "You are unAuthorized", "success" : false})
           }
           const match = await bcrypt.compare(password, foundAdmin.password);
        if(foundAdmin && match){
const id = foundAdmin?._id.toString()
const refreshToken = generateRefreshToken(id);
const updateUser = await User.findByIdAndUpdate(id, {refreshToken : refreshToken}, {new: true});
console.log(refreshToken)
res.cookie("refreshToken", refreshToken, {httpOnly : true, maxAge : 72 * 60 * 60 * 1000})
            res.json({
                _id : foundAdmin?._id,
                firstname : foundAdmin?.firstname,
                lastname: foundAdmin?.lastname,
            email : foundAdmin?.email,
            mobile : foundAdmin?.mobile,
            token : generateAccessToken(id)
                })
       
        }else{
            return res.status(401).json({"msg": "Invalid Credentials", "success" : false})
        }
       
    }catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.stack}`, "loginAdminError.txt", "user")
    }
}
//handle refresh token
const handleRefreshToken = async (req, res)=>{
    const cookies = req.cookies;
if(!cookies?.refreshToken){
    return res.json({"message": "No refreshToken in cookies", success : false})
}
const refreshToken = cookies.refreshToken;
const user = await User.findOne({refreshToken})
console.log(refreshToken)
if(!user){
    return res.json({"message": "No refreshToken in database or not matched", success : false})
}
const id = user._id.toString();
jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded)=>{
    console.log(decoded)
    if(err || id !== decoded.id){
        return res.json({"message": "Wrong refresh token because it has expired", "success": false})
    }
    const accessToken = generateAccessToken(id)
    res.json({accessToken})
    console.log(decoded)
})
}
//LogOut Functionality
const logout = async (req, res) =>{
    const cookies = req.cookies
    if(!cookies?.refreshToken){
        return res.json({"message": "No refreshToken in cookies", "success" : false})
    }
    const refreshToken = cookies.refreshToken;
    const user = await User.findOne({refreshToken})
    console.log(user)
    if(!user){
        res.clearCookie("refreshToken", {httpOnly: true, secure : true})
        console.log("I Also Got Here");
        return res.sendStatus(204)
    }
    await User.findOneAndUpdate({refreshToken}, {refreshToken: ""})
    res.clearCookie("refreshToken", {httpOnly: true, secure : true})
    return res.sendStatus(204)
    }
//Get All Users
const getAllUsers = async (req, res) => {
try{
const gotUsers = await User.find()
res.status(200).json(gotUsers)
}
catch(error){
    console.log(error)
}
}
 async function verifyUser (req, res, next){
    try {
        
        const { email } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await User.findOne({ email });
        if(!exist) return res.status(404).send({ error : "Can't find User!"});
        next();

    } catch (error) {
        console.log(error)
        return res.status(404).send({ error: "Authentication Error"});
    }
}
const generateOTP = async (req, res) => {

req.app.locals.OTP = await otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets : false });
res.status(201).json({code : req.app.locals.OTP})
}
const verifyOTP = (req, res) => {
    const {code} =req.query;
    console.log(code);
    if(parseInt(req.app.locals.OTP) == parseInt(code)){
        req.app.locals.OTP = null //reset otp value
        req.app.locals.resetSession = true
        return res.status(201).json({"msg" : "verify successfull"})
    }
    return res.status(400).json({"error" : "Invalid OTP"})
}
const createResetSession= (req, res) => {
    if(req.app.locals.resetSession){
        req.app.locals.resetSession = false //allow access to this route only once
        return res.status(440).json({"msg" : "Access Granted"})
    }
    return res.status(440).json({"error" : "session expired"})
    
}
const otpResetPassword= async (req, res) => {
    if(!req.app.locals.resetSession) return res.status(440).json({"error" : "session expired"})
    const {email, password} = req.body;
    try{
const user = await User.findOne({email})
if(!user){
    return res.status(404).json({"msg" : "user does not exist"})
}
console.log(user)
const hashedPwd = await bcrypt.hash(password, 10);
user.password = hashedPwd;
await user.save();
req.app.locals.resetSession = false
console.log("Gideon")
res.status(201).json({"msg" : "Record updated"})
    }catch(error){
console.log(error)
    }
}
//Get a single user
const getAUser = async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
try{
const gotUser = await User.findById(id)
const {password, ...rest} = Object.assign({}, gotUser.toJSON())
res.json(rest);
}catch(error){
    logEvents(`${error.name}: ${error.stack}`, "getAUserError.txt", "user")
}
}
//Delete a single user
const deleteAUser = async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
try{
const deleteUser = await User.findByIdAndDelete(id)
res.json({ deleteUser })
}catch(error){
throw new Error(error)
}
}
//Update A User
const updateAUser = async(req, res)=>{
    const {_id} = req.user;
    validateMongoDbId(_id)
const id = _id.toString();
try{
    const updatedUser =  await User.findByIdAndUpdate(id, {
firstname:req?.body?.firstname,
lastname: req?.body?.lastname,
email :req?.body?.email,
mobile :req?.body?.mobile,
profile :req?.body?.profile,
    },
    {
        new : true
    })
    res.status(201).json(updatedUser)
}catch(error){
    logEvents(`${error.name}: ${error.stack}`, "UpdateAUserError.txt", "user")
}
}
//Save Users Address
const saveAddress = async(req, res, next) => {
    const {_id} = req.user;
    validateMongoDbId(_id)
    try{
        const updatedUser =  await User.findByIdAndUpdate(_id, {
address : req?.body?.address
        },
        {
            new : true
        })
        res.status(201).json(updatedUser)
    }catch(error){
        logEvents(`${error.name}: ${error.stack}`, "saveAddressError.txt", "user")
    }

}
const blockUser = async (req, res)=> {
const { id } = req.params;
validateMongoDbId(id)
try{
    const block = await User.findByIdAndUpdate(id, {
        isBlocked : true
    }, {
        new : true
    }
    )
    res.status(201).json({"message": "User is blocked", "success":true})
}
catch(error){
    logEvents(`${error.name}: ${error.stack}`, "blockUserError.txt", "user")
}
}
const unblockUser = async (req, res)=> {
    const {id} = req.params;
    validateMongoDbId(id)
try{
    const block = await User.findByIdAndUpdate(id, {
        isBlocked : false
    }, {
        new : true
    }
    )
    res.status(201).json({"message": "User is unblocked", "success":true})
}
catch(error){
    logEvents(`${error.name}: ${error.stack}`, "unblockUserError.txt", "user")
}
}
const updatePassword = async (req, res) => {
const { _id } = req.user;
const {password} = req.body;
validateMongoDbId(_id)
const user = await User.findById(_id);
if(password){
    const hashedPwd = await bcrypt.hash(password, 10);
    user.password = hashedPwd
    const updatedPassword = await user.save();
    res.status(201).json(updatedPassword)
}else{
    res.status(200).json(user)
}
}
const forgotPasswordToken = async(req, res) =>{
const {email} = req.body
console.log(email)
    const user = await User.findOne({email})
    if(!user){
        return res.json({"message": "No user found with this email", "success": "false"} )
    }
    try{
const token = await user.createPasswordResetToken();
await user.save();
const resetURL = `Hi, please folllow this link to reset your password. This link is valid till 10 minutes from now 
<a href="http://localhost:5000/api/user/reset-password/${token}">Click Here</a>`
const data = {
    to : email,
    subject : "Forgot Password Link",
    html : resetURL,
    text : "Hey User"
}
sendEmail(data)
.catch((error)=>{
    logEvents(`${error.name}: ${error.message}`, "sendEmailError.txt", "user")
})
res.json(token)
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "forgotPasswordTokenError.txt", "user")
    }

}
//install code greeper
const resetPassword = async(req, res) => {
    const {token} = req.params;
    const {password} = req.body;
    console.log(token)
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
    const user = await User.findOne({
        passwordResetToken : hashedToken,
        passwordResetExpires : { $gt : Date.now()}
        // This part ensures that the user's passwordResetExpires property is greater than the current date and time. This is a check to see if the password reset token is still valid and has not expired.
    })
    if(!user){
        return res.json({"message": "Token expired, please try again later", "success": false})
    }
    const hashedPwd = await bcrypt.hash(password, 10);
    user.password = hashedPwd;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user)

}
const getWishList = async(req, res) => {
    const { _id } = req.user;
    console.log(_id)
    try{
const foundUser = await User.findById(_id).populate("wishlist")
res.status(200).json(foundUser)
    }
    catch(error){
        logEvents(`${error.name}: ${error.message}`, "getWishListError.txt", "user")
    }
}
const userCart = async(req, res) => {
    const { _id } = req.user;
const { cart }  = req.body;
validateMongoDbId(_id)
try{
    let products = []
    const user = await User.findById(_id)
     const alreadyExistCart  = await Cart.findOne({ orderby : user._id})
     if(alreadyExistCart){
        alreadyExistCart.deleteOne()
     }
     for(let i = 0; i < cart.length; i++){
        let object = {}
        object.product = cart[i]._id;
        object.count = cart[i].count;
        object.color = cart[i].color;
        let getPrice = await Product.findById(cart[i]._id).select("price").exec();
        object.price = getPrice.price
        products.push(object)
     };
     let cartTotal = 0;
     let i = 0;
     while(i < products.length){
        console.log(i)
        cartTotal = cartTotal + products[i].price * products[i].count
        i++
     }
//      for(let i = 0; i < products.length; i++){
// cartTotal = cartTotal + products[i].price * products[i].count
//      };
let newCart = new Cart({
    products,
    cartTotal,
    orderby : user?._id
})
await newCart.save();
res.status(201).json(newCart)
}catch(error){
    logEvents(`${error.name}: ${error.message}`, "userCartError.txt", "user")
}
}
const getUserCart = async(req, res) =>{
const { _id } = req.user;
validateMongoDbId(_id)
try{
const cart = await Cart.findOne({ orderby : _id}).populate("products.product")
res.status(200).json(cart)
}catch(error){
    logEvents(`${error.name}: ${error.message}`, "getUserCartError.txt", "user")
}
}
const emptyCart = async(req, res) => {
const {_id} = req.user;
validateMongoDbId(_id)
try{
const user = await User.findOne({_id})
const cart = await Cart.findOneAndDelete({ orderby : user?._id});
res.json(cart)
}catch(error){
    logEvents(`${error.name}: ${error.message}`, "emptyCartError.txt", "user")
}
}
const applyCoupon = async(req, res) => {
    const { _id } = req.user
const { coupon } = req.body;
const validCoupon = await Coupon.findOne({ name : coupon})
if(validCoupon === null){
   return res.json({"message" : "Invalid Coupon", success : false})

}
const user = await User.findOne({_id})
let {products, cartTotal} = await Cart.findOne({ orderby : user?._id}).populate("products.product");
let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2);
await Cart.findOneAndUpdate({orderby : user?._id}, {totalAfterDiscount}, { new : true})
res.status(201).json(totalAfterDiscount)
}
const createOrder = async (req, res) => {
    const { COD, couponApplied} = req.body;
    const {_id, email} = req.user
    validateMongoDbId(_id)
    try{
    if(!COD){
     return res.json({"message" : "create cash order failed", "success" : false})
    }
    const user = await User.findById(_id)
    let userCart = await Cart.findOne({ orderby : user._id})
    let finalAmount = 0;
    if(couponApplied && userCart.totalAfterDiscount){
        finalAmount = userCart.totalAfterDiscount
    }else{
        finalAmount = userCart.cartTotal
    }
    let newOrder =  new Order({
products: userCart.products,
paymentIntent : {
    id :  uniqid(),
    method : "COD",
    amount : finalAmount,
    status : "Cash On Delivery",
    created: Date.now(),
    currency : "NGN"
},
orderby : user._id,
orderStatus : "Cash on Delivery"
    })
await newOrder.save();
let update = userCart.products.map((product) => {
    return {
        updateOne : {
            filter :  {_id: product.product._id},
            update : { $inc : { quantity :  -product.count, sold : +product.count}}
        }
    }
})
const cart = await Cart.findOne({ orderby : _id}).populate("products.product")
const transactionalMail = cart.products.map((product) => {
    return product
})
await Product.bulkWrite(update, {})
res.json({"message" : "success", "success" : true})
let emailContent = `Good Evening, Thank you for purchasing the following products:\n`;

transactionalMail.forEach((transaction) => {
  emailContent += `${transaction.count} quantity of ${transaction.product.title},\n`;
});
const data = {
    to : email,
    subject : "Purchase Of A Product",
    html : emailContent,
    text : "Hey User"
}
sendEmail(data)
//The bulk write operation is an efficient way to update multiple documents in a single database operation.
}catch(error){
        logEvents(`${error.name}: ${error.message}`, "createOrderError.txt", "user")
    }
    
}
const getOrders = async(req, res) => {
const { _id } = req.user;
validateMongoDbId(_id)
try{
const userOrders = await Order.findOne({orderby: _id}).populate("products.product").exec()
res.json(userOrders)
}catch(error){
    logEvents(`${error.name}: ${error.message}`, "getOrderError.txt", "user")
}
}
const updateOrderStatus = async(req, res) => {
const {status} = req.body;
const { id } = req.params;
console.log(status)
validateMongoDbId(id);
try{ 
    const updateOrderStatus =  await Order.findByIdAndUpdate(id, {
        orderStatus : status,
        paymentIntent : {
            status : status
        }
    
    }, { new : true})
    res.status(201).json(updateOrderStatus)
}catch(err){
    logEvents(`${error.name}: ${error.message}`, "updateOrderError.txt", "user")
}
}
module.exports = {
createUser,
loginUser,
getAllUsers,
getAUser,
deleteAUser,
updateAUser,
blockUser,
unblockUser,
handleRefreshToken,
logout,
updatePassword,
forgotPasswordToken,
resetPassword,
loginAdmin,
getWishList,
saveAddress,
userCart,
getUserCart,
emptyCart,
applyCoupon,
createOrder,
getOrders,
updateOrderStatus,
generateOTP,
verifyOTP,
createResetSession,
otpResetPassword, 
verifyUser}