import Add from '../img/addAvatar.png';

const Register = () => {
  return (
      <div className='form-container'>
        <div className="form-wrapper">
          <span className='logo'>Hope Chat</span>
          <span className='title'>Register</span>

          <form>
            <input type="text" placeholder='display name'/>
            <input type="email" placeholder='email'/>
            <input type="password" placeholder='password'/>
            <input type="file" id='file' style={{display: 'none'}}/>
            <label htmlFor="file">
              <img src={Add} alt=""/>
              <span>Add an avatar</span>
            </label>

            <button>Sign up</button>
          </form>

          <p>You have an account? Login</p>
        </div>
      </div>
  );
}

export default Register;