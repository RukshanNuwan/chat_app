// import Avatar from '../img/'

const Navbar = () => {
  return (
      <div className='navbar'>
        <span className="logo">Hope Chat</span>
        <div className="user">
          <img
              src='https://images.pexels.com/photos/11432837/pexels-photo-11432837.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'
              alt=""
          />
          <span>John</span>
          <button>Logout</button>
        </div>
      </div>
  );
}

export default Navbar;