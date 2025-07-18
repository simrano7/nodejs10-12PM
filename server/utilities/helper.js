const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "dd9ipyppz",  // your cloud name
    api_key: "963944345251742",
    api_secret: "HtfdTyRDuIw4GCaeeZ0Cs2lTgr8",
    secure: true,
    cdn_subdomain: true,
});




const uploadImg = async (fileBuffer, publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                public_id: publicId,
                resource_type: "auto" },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        ).end(fileBuffer);
    });
};




module.exports = {uploadImg}