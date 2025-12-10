// import { useEffect, useState } from "react";
// import { socket } from "../../shared/services/socket.js";
// import styles from "./MessagesPage.module.css";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// const MessagesPage = () => {
//   const [chats, setChats] = useState([]);
//   const [chatId, setChatId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [meId, setMeId] = useState(null);


//   useEffect(() => {
//     const loadChats = async () => {
//       try {
//         const res = await fetch(`${API_URL}/api/chats`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         setChats(data.chats);
//         setMeId(data.meId);


//         if (data.chats.length > 0 && !chatId) {
//           setChatId(data.chats[0]._id);
//         }
//       } catch (error) {
//         console.error("Fehler beim Laden der Chats:", error);
//       }
//     };

//     loadChats();
//   }, []);


//   useEffect(() => {
//     if (!chatId) return;

//     const loadMessages = async () => {
//       try {
//         const res = await fetch(`${API_URL}/api/chats/${chatId}/messages`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         setMessages(data.messages);
//       } catch (error) {
//         console.error("Fehler beim Laden der Nachrichten:", error);
//       }
//     };

//     loadMessages();


//     // socket.emit("join_room", chatId);

//     const handleNewMessage = (msg) => {
//       if (msg.chatId === chatId) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     };

//     // socket.on("new_message", handleNewMessage);

//   //   return () => {
//   //     socket.off("new_message", handleNewMessage);
//   //   };
//   // }, [chatId]);


//   const sendMessage = (e) => {
//     e.preventDefault();
//     const value = text.trim();
//     if (!value || !chatId || !meId) return;

//     const message = {
//       chatId,
//       text: value,
//       fromUserId: meId,
//       createdAt: new Date().toISOString(),
//     };

//     // socket.emit("send_message", message);
//     setMessages((prev) => [...prev, message]);
//     setText("");
//   };

//   const activeChat = chats.find((c) => c._id === chatId);

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.chatList}>
//         <h2 className={styles.chatListTitle}>itcareerhub</h2>

//         {chats.map((chat) => (
//           <button
//             key={chat._id}
//             type="button"
//             className={
//               chat._id === chatId
//                 ? `${styles.chatItem} ${styles.chatItemActive}`
//                 : styles.chatItem
//             }
//             onClick={() => {
//               setMessages([]);
//               setChatId(chat._id);
//             }}
//           >
//             <div className={styles.chatAvatar}>
//             </div>
//             <div className={styles.chatInfo}>
//               <span className={styles.chatName}>{chat.user.username}</span>
//               <span className={styles.chatLast}>{chat.lastMessageText}</span>
//             </div>

//             <span className={styles.chatTime}>{chat.lastMessageTime}</span>
//           </button>
//         ))}
//       </div>

//       <div className={styles.chatWindow}>
//         <div className={styles.chatHeader}>
//           <div className={styles.profileAvatar} />
//           <div className={styles.profileInfo}>
//             <span className={styles.profileName}>
//               {activeChat?.user.username}
//             </span>
//             <span className={styles.profileSub}>
//               {activeChat?.user.username} · ICHgram
//             </span>
//             <button className={styles.viewProfileBtn} type="button">
//               View profile
//             </button>
//           </div>
//         </div>


//         <div className={styles.messagesArea}>
//           {messages.map((msg) => {
//             const mine = msg.fromUserId === meId;
//             return (
//               <div
//                 key={msg._id}
//                 className={mine ? styles.messageRowMine : styles.messageRow}
//               >
//                 {!mine && <div className={styles.bubbleAvatar} />}
//                 <div
//                   className={
//                     mine ? styles.messageBubbleMine : styles.messageBubble
//                   }
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             );
//           })}
//         </div>


//         <form className={styles.inputWrapper} onSubmit={sendMessage}>
//           <input
//             className={styles.input}
//             type="text"
//             placeholder="Write message"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           />
//           <button className={styles.sendBtn} type="submit">
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default MessagesPage;