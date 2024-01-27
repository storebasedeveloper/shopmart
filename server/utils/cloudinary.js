const cloudinary = require("cloudinary").v2
const path = require("path")
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
    
})
const cloudinaryUpload = async (filesToUpload, folderName) => {
    try{
        const result = await cloudinary.uploader.upload(
            filesToUpload,
            {
              folder: folderName,
            }
          );

return { url : result.secure_url}
    }catch(error){
        logEvents(`${error.error}`, "cloudinaryUploadImgError.txt", "cloudinary")
    }
}

module.exports =  { cloudinaryUpload }