import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import designImg from '/designImg.svg';

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    firstname: '', 
    lastname: '',
    email: '', 
    username: '',
    password: '',
    passwordConf: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { firstname, lastname, email, username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <div className='flex bg-cream min-h-screen justify-center items-center font-albert '>
     

     <img className=' absolute z-10 mt-32 md:mt-24 md:w-[700px]' src={designImg} alt="designImg" />

     <div className=' bg-white rounded-xl px-6 pt-10 pb-10 mt-24 w-72 z-20 shadow-lg'>
        <p>{message}</p>
        <form onSubmit={handleSubmit}>
          <div>

            <label className=' mb-3 font-semibold text-lg' htmlFor="firstname">Firstname:</label>
            <input
             className=' h-9 px-6 mt-1 mb-1 border border-sage rounded-lg'
              type="text"
              id="firstname"
              value={firstname}
              name="firstname"
              onChange={handleChange}
            />


            <label className=' mb-3 font-semibold text-lg' htmlFor="lastname">Lastname:</label>
            <input
             className=' h-9 px-6 mt-1 mb-1 border border-sage rounded-lg'
              type="text"
              id="lastname"
              value={lastname}
              name="lastname"
              onChange={handleChange}
            />

            <label className=' mb-3 font-semibold text-lg' htmlFor="email">Email:</label>
            <input
             className=' h-9 px-6 mt-1 mb-1 border border-sage rounded-lg'
              type="text"
              id="email"
              value={email}
              name="email"
              onChange={handleChange}
            />

            <label className=' mb-3 font-semibold text-lg' htmlFor="username">Username:</label>
            <input
             className=' h-9 px-6 mt-1 mb-1 border border-sage rounded-lg'
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className=' mb-3 font-semibold text-lg' htmlFor="password">Password:</label>
            <input
             className=' h-9 px-6 mt-1 mb-1 border border-sage rounded-lg'
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className=' mb-3 font-semibold text-lg' htmlFor="confirm">Confirm Password:</label>
            <input
             className=' h-9 px-6 mt-1 mb-1 border border-sage rounded-lg'
              type="password"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
            />
          </div>

          <div className=' flex justify-between mt-3'>
            <button disabled={isFormInvalid()} className=' bg-sage px-2 rounded-xl hover:bg-white 
                  hover:border hover:border-sage hover:text-darksage'>Sign Up</button>
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

export default SignupForm;
