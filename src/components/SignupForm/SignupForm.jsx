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
    securityQuestion1: '',
    securityAnswer1: '',
    securityQuestion2: '',
    securityAnswer2: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      // send form data to backend to create the new user
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { firstname, lastname, email, username, password, passwordConf, securityQuestion1, securityAnswer1,
    securityQuestion2, securityAnswer2} = formData;

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

          {/* Security Question 1 */}
          <div>
            <label className=' mb-3 font-semibold text-lg' htmlFor="securityQuestion1">Question 1:</label>
            <select
              className=' h-9 px-6 mt-1 mb-1 border border-sage rounded-lg'
              id="securityQuestion1"
              name="securityQuestion1"
              value={securityQuestion1}
              onChange={handleChange}
            >
              <option value="">Select a question</option>
              <option value="What was the name of your first pet?">What was the name of your first pet?</option>
              <option value="What was the name of the street you grew up on?">What was the name of the street you grew up on?</option>
              <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
            </select>
          </div>
          <div>
            <label className=' mb-3 font-semibold text-lg' htmlFor="securityAnswer1">Answer:</label>
            <input
              className=' h-9 px-6 mt-1 mb-1 border border-sage rounded-lg'
              type="text"
              id="securityAnswer1"
              value={securityAnswer1}
              name="securityAnswer1"
              onChange={handleChange}
            />
          </div>

          {/* Security Question 2 */}
          <div>
            <label className=' mb-3 font-semibold text-lg' htmlFor="securityQuestion2">Question 2:</label>
            <select
              className=' h-9 px-6 mt-1 mb-1 border border-sage rounded-lg'
              id="securityQuestion2"
              name="securityQuestion2"
              value={securityQuestion2}
              onChange={handleChange}
            >
              <option value="">Select a question</option>
              <option value="What was your childhood nickname?">What was your childhood nickname?</option>
              <option value="What city were you born in?">What city were you born in?</option>
              <option value="What was the make and model of your first car?">What was the make and model of your first car?</option>
            </select>
          </div>
          <div>

            <label className=' mb-3 font-semibold text-lg' htmlFor="securityAnswer2">Answer: thugvg</label>

            <input
              className=' h-9 px-6 mt-1 mb-1 border border-sage rounded-lg'
              type="text"
              id="securityAnswer2"
              value={securityAnswer2}
              name="securityAnswer2"
              onChange={handleChange}
            />
          </div>

          <div className=' flex justify-between mt-3'>
            <button disabled={isFormInvalid()} className=' relative rounded-full px-5 py-1  overflow-hidden group bg-sage text-white hover:bg-gradient-to-r hover:from-sage hover:to-darksage hover:ring-2 hover:ring-offset-2 hover:ring-darksage transition-all ease-out duration-300'>
                  <span className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease'></span>
                  <span className='relative'>Sign up</span>
            </button>
            <Link to="/">
            <button className='relative rounded-full px-5 py-1 overflow-hidden group bg-redorange text-white hover:bg-gradient-to-r hover:from-redorange hover:to-red-400 hover:ring-2 hover:ring-offset-2 hover:ring-redorange transition-all ease-out duration-300'>
                  <span className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease'></span>
                  <span className='relative'>Cancel</span>
            </button>
            </Link>
          </div>
        </form>
     </div>
    </div>
  );
};
// hello po 
export default SignupForm;
