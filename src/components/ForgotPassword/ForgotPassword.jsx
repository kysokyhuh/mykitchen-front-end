import React, { useState } from 'react';
import { forgotPasswordRequest, forgotPasswordValidate, forgotPasswordChange } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [questions, setQuestions] = useState({securityQuestion1: '', securityQuestion2: ''});
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
    }

    const handleQuestionsSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); 

        try {
            await forgotPasswordValidate(email, answers.securityAnswer1, answers.securityAnswer2);
            setStep(3);
        } catch (error) {
            setMessage(error.message);
        }
    }


    const handleChangePassword = async (e) => {
        e.preventDefault(); 
        setMessage('');

        if (pw.newPassword !== pw.confirmPassword){
            setMessage("Passwords do not match");
            return;
        }

        try {
            await forgotPasswordChange(email, pw.newPassword, pw.confirmPassword);
            setMessage("Password Changed! Redirecting to Sign in...");
            setTimeout(() => navigate('/signin'), 2000);
        } catch (error) {
            setMessage(error.message);
        }
    }
  return (
    
    <>
   <div className=" mt-60">
      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <h2>Forgot Password</h2>
          <label>Email:</label>
          <input type="email" value={email} required onChange={e => setEmail(e.target.value)} />
          <button type="submit">Next</button>
          {message && <p>{message}</p>}
        </form>
      )}
      {step === 2 && (
        
        <form onSubmit={handleQuestionsSubmit}>
          <h2>Security Questions</h2>
          <label>{questions.securityQuestion1}</label>
          <input type="text" required value={answers.securityAnswer1} onChange={e => setAnswers(a => ({...a, securityAnswer1: e.target.value}))} />
          <label>{questions.securityQuestion2}</label>
          <input type="text" required value={answers.securityAnswer2} onChange={e => setAnswers(a => ({...a, securityAnswer2: e.target.value}))} />
          <button type="submit">Next</button>
          <button type="button" onClick={() => setStep(1)}>Back</button>
          {message && <p>{message}</p>}
        </form>
      )}
      {step === 3 && (
        <form onSubmit={handleChangePassword}>
          <h2>Set New Password</h2>
          <label>New Password:</label>
          <input type="password" required value={pw.newPassword} onChange={e => setPw(p => ({...p, newPassword: e.target.value}))} />
          <label>Confirm Password:</label>
          <input type="password" required value={pw.confirmPassword} onChange={e => setPw(p => ({...p, confirmPassword: e.target.value}))} />
          <button type="submit">Change Password</button>
          <button type="button" onClick={() => setStep(2)}>Back</button>
          {message && <p>{message}</p>}
        </form>
      )}
    </div>
    </>
  )
}

export default ForgotPassword
