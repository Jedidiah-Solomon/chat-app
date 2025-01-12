import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Ensure message is provided (file handling commented out)
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Commented out fileUrl handling for now
    // let fileUrl = req.body.fileUrl || null; // Use the file URL if a file was uploaded
    // let fileUrl = null; // File URL is not being processed

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create a new message (file handling commented out)
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      // fileUrl, // File URL logic commented out
    });

    // Add message to conversation and save
    conversation.messages.push(newMessage._id);
    await Promise.all([conversation.save(), newMessage.save()]);

    // Notify receiver if online (socket logic)
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    res
      .status(500)
      .json({ error: "Failed to send message. Please try again." });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
