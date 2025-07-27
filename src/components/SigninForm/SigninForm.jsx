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
  const [showPassword, setShowPassword] = useState(false);

  const updateMessage = (msg) => setMessage(msg);

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      props.setUser(user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <div className="flex bg-cream min-h-screen justify-center items-center font-albert relative">
      <img
        className="absolute z-10 mt-32 md:mt-24 md:w-[700px]"
        src={designImg}
        alt="designImg"
      />

      <div className="bg-white rounded-2xl px-10 pt-12 pb-10 mt-24 w-full sm:w-4/5 md:w-96 z-20 shadow-2xl">
        <h2 className="text-4xl font-bold text-center text-sage mb-8">
          Welcome Back!
        </h2>

        {message && <p className="text-red-600 text-center mb-4">{message}</p>}

        <form autoComplete="off" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-6">
            <label htmlFor="username" className="block text-lg font-semibold text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full h-10 px-4 border border-sage rounded-lg focus:outline-none focus:ring-2 focus:ring-sage"
              placeholder="Enter your username"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-10 px-4 pr-16 border border-sage rounded-lg focus:outline-none focus:ring-2 focus:ring-sage"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-sage font-medium hover:underline"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="w-[48%] rounded-full px-5 py-2 font-medium bg-sage text-white hover:bg-darksage transition duration-300"
            >
              Log In
            </button>
            <Link to="/" className="w-[48%]">
              <button
                type="button"
                className="w-full rounded-full px-5 py-2 font-medium bg-redorange text-white hover:bg-red-400 transition duration-300"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>

        {/* Links */}
        <div className="text-center mt-6">
          <Link
            to="/forgot-password"
            className="text-sage font-medium text-sm hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="text-center mt-3">
          <p className="text-sm">
            Don’t have an account?{' '}
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
