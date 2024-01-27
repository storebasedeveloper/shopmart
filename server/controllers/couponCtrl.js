const path = require("path")
const Coupon = require(path.join(__dirname,  "..", "models", "couponModel.js"))
const validateMongodbId = require(path.join(__dirname, "..", "utils", "validateMongodbId"))
const { logEvents }= require(path.join(__dirname, "..","middlewares", "logEvents.js"))
const createCoupon = async(req, res) => {
try{
const newCoupon = await Coupon.create(req.body)
res.status(201).json(newCoupon)
}
catch(error){
    logEvents(`${error.name}:${error.message}`, "createCouponError.txt", "coupon")  
}
}
const getAllCoupon = async(req, res) => {
    try{
    const coupons = await Coupon.find()
    res.status(200).json(coupons)
    }
    catch(error){
        logEvents(`${error.name}:${error.message}`, "getAllCouponError.txt", "coupon")  
    }
    }
    const updateCoupon = async(req, res) => {
        const { id } = req.params;
        console.log(id)
        validateMongodbId(id)
        try{
        const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, { new : true})
        res.status(201).json(updateCoupon)
        }
        catch(error){
            logEvents(`${error.name}:${error.message}`, "updateCouponError.txt", "coupon")  
        }
        }
        const deleteCoupon = async(req, res) => {
            const { id } = req.params;
            validateMongodbId(id)
            try{
            const deleteCoupon = await Coupon.findByIdAndDelete(id)
            res.status(200).json(deleteCoupon)
            }
            catch(error){
                logEvents(`${error.name}:${error.message}`, "deleteCouponError.txt", "coupon")  
            }
            }
module.exports = {
    createCoupon,
    getAllCoupon,
    updateCoupon,
    deleteCoupon
}