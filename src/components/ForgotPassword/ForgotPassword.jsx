import React, { useState } from 'react';
import { forgotPasswordRequest, forgotPasswordValidate, forgotPasswordChange } from '../../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import designImg from '/designImg.svg';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [questions, setQuestions] = useState({ securityQuestion1: '', securityQuestion2: '' });
  const [answers, setAnswers] = useState({ securityAnswer1: '', securityAnswer2: '' });
  const [pw, setPw] = useState({ newPassword: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await forgotPasswordRequest(email);
      setQuestions(res);
      setStep(2);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleQuestionsSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await forgotPasswordValidate(email, answers.securityAnswer1, answers.securityAnswer2);
      setStep(3);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    if (pw.newPassword !== pw.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      await forgotPasswordChange(email, pw.newPassword, pw.confirmPassword);
      setMessage('Password changed! Redirecting...');
      setTimeout(() => navigate('/signin'), 2000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex bg-cream min-h-screen justify-center items-center font-albert relative">
      <img className='absolute z-10 mt-32 md:mt-24 md:w-[700px]' src={designImg} alt="designImg" />

      <div className="bg-white rounded-xl px-8 pt-10 pb-10 mt-24 w-full sm:w-4/5 md:w-96 z-20 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ color: "#7AA58C" }}>
          {step === 1 && 'Forgot Password'}
          {step === 2 && 'Security Questions'}
          {step === 3 && 'Reset Password'}
        </h2>

        {message && <p className="text-red-600 mb-2 text-center text-sm">{message}</p>}

        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <label className="font-semibold text-lg">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-sage rounded-lg px-4 py-2 mt-1 mb-4"
            />
            <button className="w-full bg-sage text-white py-2 rounded-lg hover:bg-darksage transition">
              Next
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleQuestionsSubmit}>
            <label className="font-semibold text-lg">{questions.securityQuestion1}</label>
            <input
              type="text"
              required
              value={answers.securityAnswer1}
              onChange={e => setAnswers(a => ({ ...a, securityAnswer1: e.target.value }))}
              className="w-full border border-sage rounded-lg px-4 py-2 mt-1 mb-4"
            />
            <label className="font-semibold text-lg">{questions.securityQuestion2}</label>
            <input
              type="text"
              required
              value={answers.securityAnswer2}
              onChange={e => setAnswers(a => ({ ...a, securityAnswer2: e.target.value }))}
              className="w-full border border-sage rounded-lg px-4 py-2 mt-1 mb-4"
            />
            <div className="flex justify-between mt-4">
              <button type="button"
                onClick={() => setStep(1)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
                Back
              </button>
              <button type="submit"
                className="bg-sage text-white px-4 py-2 rounded-lg hover:bg-darksage transition">
                Next
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleChangePassword}>
            <label className="font-semibold text-lg">New Password</label>
            <input
              type="password"
              required
              value={pw.newPassword}
              onChange={e => setPw(p => ({ ...p, newPassword: e.target.value }))}
              className="w-full border border-sage rounded-lg px-4 py-2 mt-1 mb-4"
            />
            <label className="font-semibold text-lg">Confirm Password</label>
            <input
              type="password"
              required
              value={pw.confirmPassword}
              onChange={e => setPw(p => ({ ...p, confirmPassword: e.target.value }))}
              className="w-full border border-sage rounded-lg px-4 py-2 mt-1 mb-4"
            />
            <div className="flex justify-between mt-4">
              <button type="button"
                onClick={() => setStep(2)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
                Back
              </button>
              <button type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                Change Password
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link to="/signin" className="text-sage font-semibold hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
