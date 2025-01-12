import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
// import fileUpload from "../middleware/fileUpload.js"; // Commented out the fileUpload middleware

const router = express.Router();

// Route to get messages for a conversation
router.get("/:id", protectRoute, getMessages);

// Route to send a message with optional file upload
router.post("/send/:id", protectRoute, /*fileUpload,*/ sendMessage); // Commented out fileUpload middleware

export default router;
