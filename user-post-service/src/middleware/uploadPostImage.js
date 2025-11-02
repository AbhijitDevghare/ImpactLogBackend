require("dotenv").config();
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// 🔹 Reusable upload function
const uploadPostImage = async (localFilePath, folder = "posts") => {
  try {
    console.log("UPLOADPOSTIMAGE")
    if (!localFilePath) return null;

    // File info
    const fileSize = fs.statSync(localFilePath).size;
    const extension = path.extname(localFilePath).toLowerCase();
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".avif", ".webp"];
    const MAX_IMAGE_SIZE_MB = 15; // posts can be bigger

    // Validation
    if (!imageExtensions.includes(extension)) {
      console.error("Unsupported file type.");
      return null;
    }
    if (fileSize > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      console.error(`Image file size exceeds ${MAX_IMAGE_SIZE_MB} MB limit.`);
      return null;
    }

    // Upload to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
      folder,
      allowed_formats: imageExtensions.map((ext) => ext.slice(1)), // jpg, png, etc.
      transformation: [
        {
          width: 1080,
          height: 1080,
          crop: "limit", // keep aspect ratio, limit max size
        },
      ],
    });

    console.log("Post image uploaded to Cloudinary:", response.secure_url);
    return response;
  } catch (error) {
    console.error("Error uploading post image:", error);
    return null;
  } finally {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // cleanup local file
    }
  }
};

module.exports = { uploadPostImage };
