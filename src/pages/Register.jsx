import {useState} from "react";
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {setDoc, doc} from 'firebase/firestore';
import {Link, useNavigate} from "react-router-dom";

import Add from '../img/addAvatar.png';
import {auth, storage, db} from "../firebase.js";

const Register = () => {
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const avatar = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, avatar);

      uploadTask.on(
          (error) => {
            setError(true);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
                .then(async (downloadURL) => {
                  await updateProfile(res.user, {
                    displayName,
                    photoURL: downloadURL
                  });

                  await setDoc(doc(db, 'users', res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL
                  });

                  await setDoc(doc(db, 'userChats', res.user.uid), {});

                  navigate('/');
                });
          }
      );
    } catch (err) {
      setError(true);
    }
  }

  return (
      <div className='form-container'>
        <div className="form-wrapper">
          <span className='logo'>Hope Chat</span>
          <span className='title'>Register</span>

          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='display name'/>
            <input type="email" placeholder='email'/>
            <input type="password" placeholder='password'/>
            <input type="file" id='file' style={{display: 'none'}}/>
            <label htmlFor="file">
              <img src={Add} alt=""/>
              <span>Add an avatar</span>
            </label>

            <button type='submit'>Sign up</button>

            {error && (
                <span className='errMessage'>Something went wrong</span>
            )}
          </form>

          <p>You have an account? <Link to='/login'>Login</Link></p>
        </div>
      </div>
  );
}

export default Register;