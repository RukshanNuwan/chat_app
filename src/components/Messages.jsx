import {useContext, useEffect, useState} from "react";
import {doc, onSnapshot} from "firebase/firestore";

import Message from "./Message.jsx";
import {ChatContext} from "../context/ChatContext.js";
import {db} from "../firebase.js";

const Messages = () => {
  const [messages, setMessage] = useState([]);
  const {data} = useContext(ChatContext);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessage(doc.data().messages);
    });

    return () => {
      unsubscribe();
    }
  }, [data.chatId])

  return (
      <div className='messages'>
        {messages.map((message, index) => (
            <Message message={message} key={index}/>
        ))}
      </div>
  );
}

export default Messages;