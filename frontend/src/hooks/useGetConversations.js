import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Unexpected data format received.");
        }

        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data);
      } catch (error) {
        setError(error.message);
        toast.error(`Failed to load conversations: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations, error };
};

export default useGetConversations;
