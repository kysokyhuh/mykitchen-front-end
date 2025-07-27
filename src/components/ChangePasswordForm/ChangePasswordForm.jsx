import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import { AuthedUserContext } from '../../App';

const ChangePasswordForm = (props) => {
  const user = useContext(AuthedUserContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',  
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('New password and confirm password do not match.');
      return;
    }

    try {
      await authService.changepassword(formData);
      setMessage('Password updated successfully!');
      navigate('/signin');  
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const { username, currentPassword, newPassword, confirmPassword } = formData;

  const isFormInvalid = () => {
    return !(newPassword && confirmPassword && newPassword === confirmPassword);
  };

  return (
    <div className='flex bg-cream min-h-screen justify-center items-center font-albert'>
      <div className='bg-white rounded-xl px-6 pt-10 pb-10 mt-24 w-72 z-20 shadow-lg'>
        <p>{message}</p>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div>
            <label className='mb-3 font-semibold text-lg' htmlFor="username">Username:</label>
            <input
              className='h-9 px-6 mt-1 mb-1 border border-sage rounded-lg'
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={handleChange}
              required
            />
          </div>

          {/* Current Password */}
          <div>
            <label className='mb-3 font-semibold text-lg' htmlFor="currentPassword">Current Password:</label>
            <input
              className='h-9 px-6 mt-1 mb-1 border border-sage rounded-lg'
              type="password"
              id="currentPassword"
              value={currentPassword}
              name="currentPassword"
              onChange={handleChange}
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label className='mb-3 font-semibold text-lg' htmlFor="newPassword">New Password:</label>
            <input
              className='h-9 px-6 mt-1 mb-1 border border-sage rounded-lg'
              type="password"
              id="newPassword"
              value={newPassword}
              name="newPassword"
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <label className='mb-3 font-semibold text-lg' htmlFor="confirmPassword">Confirm New Password:</label>
            <input
              className='h-9 px-6 mt-1 mb-1 border border-sage rounded-lg'
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              required
            />
          </div>

          <div className='flex justify-between mt-3'>
            <button
              type="submit"
              disabled={isFormInvalid()}
              className='relative rounded-full px-5 py-1 overflow-hidden group bg-sage text-white hover:bg-gradient-to-r hover:from-sage hover:to-darksage hover:ring-2 hover:ring-offset-2 hover:ring-darksage transition-all ease-out duration-300'>
              <span className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease'></span>
              <span className='relative'>Change Password</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className='relative rounded-full px-5 py-1 overflow-hidden group bg-redorange text-white hover:bg-gradient-to-r hover:from-redorange hover:to-red-400 hover:ring-2 hover:ring-offset-2 hover:ring-redorange transition-all ease-out duration-300'>
              <span className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease'></span>
              <span className='relative'>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
