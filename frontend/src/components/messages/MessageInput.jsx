import { useState, useEffect, useRef } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { GrEmoji } from "react-icons/gr";
import EmojiPicker from "emoji-picker-react";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { loading, sendMessage } = useSendMessage();
  const emojiPickerRef = useRef(null);
  const inputRef = useRef(null);

  // const [file, setFile] = useState(null); // Commented out file state
  // const [fileError, setFileError] = useState(null); // Commented out file error state
  // const MAX_FILE_SIZE_MB = 5; // Commented out max file size

  // File change handler
  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   if (selectedFile) {
  //     if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
  //       setFileError(`File size should not exceed ${MAX_FILE_SIZE_MB}MB.`);
  //       e.target.value = ""; // Clear the file input
  //       setFile(null); // Reset the file state if the file is too large
  //       return;
  //     } else {
  //       setFileError(null); // Clear error message if the file is valid
  //       setFile(selectedFile);
  //     }
  //   }
  // };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim() /* && !file */) return; // Prevent sending empty or whitespace-only messages

    // Send JSON data
    const data = { message: message.trim() };
    await sendMessage(data);
    setMessage(""); // Clear the input after sending the message
    // setFile(null); // Reset file state (commented out)
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="px-4 my-3 relative">
      <form onSubmit={handleSubmit}>
        <div className="w-full relative">
          <input
            ref={inputRef}
            type="text"
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white pl-10"
            placeholder="Send a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-label="Message input"
          />
          <button
            type="button"
            className="absolute inset-y-0 start-0 flex items-center ps-3 text-xl"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            aria-label="Toggle emoji picker"
          >
            <GrEmoji />
          </button>
          <button
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
            aria-label="Send message"
          >
            {loading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              <BsSend />
            )}
          </button>
        </div>
      </form>

      {showEmojiPicker && (
        <div
          ref={emojiPickerRef}
          className="absolute bottom-full mb-2 left-0 bg-white shadow-lg z-50"
        >
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default MessageInput;
