import {useContext, useEffect, useState} from 'react';
import {onSnapshot, doc} from 'firebase/firestore';

import {db} from '../firebase';
import {AuthContext} from '../context/AuthContext.js';
import {ChatContext} from '../context/ChatContext';

const Chats = () => {
  const [chats, setChats] = useState([]);

  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsubscribe = onSnapshot(
          doc(db, 'userChat', currentUser.uid),
          (doc) => {
            setChats(doc.data());
          }
      );

      return () => {
        unsubscribe();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleClick = (u) => {
    dispatch({type: 'CHANGE_USER', payload: u});
  };

  return (
      <div className="chats">
        {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat, index) => (
            <div className="user-chat" key={index} onClick={() => handleClick(chat[1], userInfo)}>
              <img src={chat[1].userInfo.photoURL} alt=""/>

              <div className="user-chat-info">
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
        ))}
      </div>
  );
};

export default Chats;
