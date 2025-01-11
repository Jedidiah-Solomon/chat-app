import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations, error } = useGetConversations();

  if (error) {
    return <div>Error loading conversations. Please try again later.</div>;
  }

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.length === 0 && !loading && (
        <span>No conversations available.</span>
      )}

      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}

      {loading && conversations.length === 0 && (
        <span className="loading loading-spinner mx-auto"></span>
      )}
    </div>
  );
};

export default Conversations;

// STARTER CODE SNIPPET
// import Conversation from "./Conversation";

// const Conversations = () => {
// 	return (
// 		<div className='py-2 flex flex-col overflow-auto'>
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 		</div>
// 	);
// };
// export default Conversations;
