import {useState} from "react";
import {collection, query, where, getDocs} from 'firebase/firestore';

import {db} from "../firebase.js";

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = async () => {
    const q = query(
        collection(db, 'users'),
        where('displayName', '==', username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    } catch (err) {
      setError(true);
    }
  }
  const handleKeyDown = (e) => {
    e.code === 'Enter' && handleSearch();
  }

  return (
      <div className='search'>
        <div className="search-form">
          <input
              type="text"
              placeholder='Find a user'
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
          />
        </div>

        {error && (
            <span className='error'>User not found</span>
        )}

        {user && (<div className="user-chat">
          <img
              src={user.photoURL}
              alt=""
          />
          <div className="user-chat-info">
            <span>{user.displayName}</span>
          </div>
        </div>)}
      </div>
  );
}

export default Search;