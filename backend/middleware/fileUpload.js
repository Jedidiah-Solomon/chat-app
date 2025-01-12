import multer from "multer";
import { adminStorage } from "../config/firebase-admin.js"; // Firebase Admin import

// Multer configuration: in-memory storage (for Firebase storage)
const storage = multer.memoryStorage(); // Store files in memory as buffer

// Define file filter for allowed types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
    "video/mp4",
    "video/x-msvideo",
    "video/mpeg",
    "video/webm",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type"), false); // Reject the file
  }
};

// Multer setup with in-memory storage
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit to 5MB
}).single("file");

export default (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Multer error:", err.message);
      return res.status(400).json({ error: err.message });
    }

    if (req.file) {
      // Upload file to Firebase Storage
      const fileBuffer = req.file.buffer;
      const fileName = `${Date.now()}-${req.file.originalname}`;
      const filePath = `uploads/${fileName}`;

      // Firebase Storage bucket upload
      const fileUpload = adminStorage.bucket().file(filePath);

      fileUpload
        .save(fileBuffer, {
          contentType: req.file.mimetype,
          public: true, // Make the file publicly accessible
        })
        .then(() => {
          // Once uploaded, get the file URL
          const fileUrl = `https://storage.googleapis.com/${
            adminStorage.bucket().name
          }/${filePath}`;

          // Attach the file URL to the request body
          req.body.fileUrl = fileUrl; // Ensure it's added to req.body
          next(); // Proceed to the next middleware/controller
        })
        .catch((uploadError) => {
          console.error(
            "Error uploading file to Firebase Storage:",
            uploadError.message
          );
          return res
            .status(500)
            .json({ error: "Error uploading file to Firebase Storage" });
        });
    } else {
      next(); // No file uploaded, proceed with message creation
    }
  });
};
