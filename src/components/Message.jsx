const Message = () => {
  return (
      <div className='message owner'>
        <div className="message-info">
          <img
              src="https://images.pexels.com/photos/11432837/pexels-photo-11432837.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
              alt=""
          />
          <span>just now</span>
        </div>

        <div className="message-content">
          <p>hello</p>
          <img
              src="https://images.pexels.com/photos/11432837/pexels-photo-11432837.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
              alt=""
          />
        </div>
      </div>
  );
}

export default Message;