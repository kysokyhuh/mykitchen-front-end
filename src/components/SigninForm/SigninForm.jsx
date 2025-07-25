import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import designImg from '/designImg.svg';

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      console.log(user);
      props.setUser(user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <div className='flex bg-cream min-h-screen justify-center items-center font-albert'>
      <img className=' absolute z-10 mt-32 md:mt-24 md:w-[700px]' src={designImg} alt="designImg" />

      <div className='bg-white rounded-xl px-8 pt-10 pb-10 mt-24 w-full sm:w-4/5 md:w-96 z-20 shadow-lg'>
        {/* Sign In Title */}
        <h2 className="text-5xl font-bold text-center" style={{ color: "#7AA58C" }}>
          Sign In
        </h2>

        {/* Error message */}
        {message && <p className="text-red-600 mb-2">{message}</p>}

        <form autoComplete="off" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mt-6">
            <label className='mb-3 font-semibold text-lg' htmlFor="username">Username:</label>
            <input
              className='h-9 px-6 mt-1 mb-3 border border-sage rounded-lg w-full'
              type="text"
              id="username"
              value={formData.username}
              name="username"
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div className="mt-4">
            <label className='mb-3 font-semibold text-lg' htmlFor="password">Password:</label>
            <input
              className='h-9 px-6 mt-1 mb-3 border border-sage rounded-lg w-full'
              type="password"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </div>

          {/* Sign In Button */}
          <div className='flex justify-between mt-4'>
            <button className='relative rounded-full px-5 py-1 overflow-hidden group bg-sage text-white hover:bg-gradient-to-r hover:from-sage
             hover:to-darksage hover:ring-2 hover:ring-offset-2 hover:ring-darksage transition-all ease-out duration-300'>
              <span className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white 
              opacity-10 rotate-12 group-hover:-translate-x-40 ease'></span>
              <span className='relative'>Log In</span>
            </button>
            <Link to="/">
              <button className='relative rounded-full px-5 py-1 overflow-hidden group bg-redorange text-white hover:bg-gradient-to-r hover:from-redorange
               hover:to-red-400 hover:ring-2 hover:ring-offset-2 hover:ring-redorange transition-all ease-out duration-300'>
                <span className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white 
                opacity-10 rotate-12 group-hover:-translate-x-40 ease'></span>
                <span className='relative'>Cancel</span>
              </button>
            </Link>
          </div>
        </form>

        {/* Forgot Password Link */}
        <div className='mt-6 text-center'>
          <Link to="/forgot-password" className="text-sage text-lg font-semibold hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Sign Up Link */}
        <div className='mt-6 text-center'>
          <p className="text-lg">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-sage font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
