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
    <div className='flex bg-cream min-h-screen justify-center items-center font-albert '>
  
    <img className=' absolute z-10 mt-32 md:mt-24 md:w-[700px]' src={designImg} alt="designImg" />

      <div className=' bg-white rounded-xl px-6 pt-10 pb-10 mt-24 w-72 z-20 shadow-lg'>
          <p>{message}</p>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div>
                  <label className=' mb-3 font-semibold text-lg' htmlFor="email">Username:</label>
                  <input
                    className=' h-9 px-6 mt-1 mb-1 border border-sage rounded-lg'
                    type="text"
                    autoComplete="off"
                    id="username"
                    value={formData.username}
                    name="username"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className=' mb-3 font-semibold text-lg' htmlFor="password">Password:</label>
                  <input
                    className=' h-9 px-6 mt-1 mb-1 border border-sage rounded-lg'
                    type="password"
                    autoComplete="off"
                    id="password"
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <div className=' flex justify-between mt-3'>
                  <button className=' bg-sage px-2 rounded-xl hover:bg-white 
                  hover:border hover:border-sage hover:text-darksage'>Log In</button>
                  <Link to="/">
                  <button className=' bg-redorange px-2 rounded-xl hover:bg-white 
                  hover:border hover:border-redorange hover:text-redorange'>Cancel</button>
                  </Link>
                </div>
            </form>
          </div>
      </div>
  );
};

export default SigninForm;

