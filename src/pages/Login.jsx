const Login = () => {
  return (
      <div className='form-container'>
        <div className="form-wrapper">
          <span className='logo'>Hope Chat</span>
          <span className='title'>Login</span>

          <form>
            <input type="email" placeholder='email'/>
            <input type="password" placeholder='password'/>

            <button>Sign in</button>
          </form>

          <p>You don't have an account? Register</p>
        </div>
      </div>
  );
}

export default Login;