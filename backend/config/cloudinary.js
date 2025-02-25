const cloudinary=require ('cloudinary').v2;
const {CloudinaryStorage}=require ('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUDNAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});

const storage= new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"user_images",
        allowed_formats:['jpeg', 'jpg', 'png', 'webp']
    }
})

module.exports={
    cloudinary,
    storage
}