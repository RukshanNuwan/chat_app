const Search = () => {
  return (
      <div className='search'>
        <div className="search-form">
          <input type="text" placeholder='Find a user'/>
        </div>

        <div className="user-chat">
          <img
              src="https://images.pexels.com/photos/11432837/pexels-photo-11432837.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
              alt=""
          />
          <div className="user-chat-info">
            <span>Jane</span>
          </div>
        </div>
      </div>
  );
}

export default Search;