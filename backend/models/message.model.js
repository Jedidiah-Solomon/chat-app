import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    // fileUrl: {
    //   type: String,

    //   default: null, // Default to null if no file is uploaded
    // },
  },
  { timestamps: true }
);

// Index for fast lookup by sender and receiver
messageSchema.index({ senderId: 1, receiverId: 1 });

const Message = mongoose.model("Message", messageSchema);

export default Message;
