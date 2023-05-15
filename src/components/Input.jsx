import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {doc, updateDoc, arrayUnion, Timestamp, serverTimestamp} from "firebase/firestore";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {v4 as uuid} from 'uuid';

import Img from '../img/img.png';
import Attach from '../img/attach.png';
import {AuthContext} from "../context/AuthContext.js";
import {ChatContext} from "../context/ChatContext.js";
import {db, storage} from "../firebase.js";

const Input = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const navigate = useNavigate();

  const handleClick = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
          (error) => {
            // setError(true);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
                .then(async (downloadURL) => {
                  await updateDoc(doc(db, 'chats', data.chatId), {
                    message: arrayUnion({
                      id: uuid(),
                      senderId: currentUser.uid,
                      date: Timestamp.now(),
                      image: downloadURL
                    })
                  });
                });
          }
      );
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        message: arrayUnion({
          id: uuid(),
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      });
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {text},
      [data.chatId + '.date']: serverTimestamp()
    });

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {text},
      [data.chatId + '.date']: serverTimestamp()
    });

    setText('');
    setImage(null);
  }

  return (
      <div className='input'>
        <input
            type="text"
            placeholder='Type something...'
            value={text}
            onChange={(e) => setText(e.target.value)}
        />

        <div className="send">
          <img src={Attach} alt=""/>
          <input
              type="file"
              id='file'
              style={{display: 'none'}}
              onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="file">
            <img src={Img} alt=""/>
          </label>

          <button onClick={handleClick}>Send</button>
        </div>
      </div>
  );
}

export default Input;