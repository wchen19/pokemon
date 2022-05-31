import React, { useState } from 'react';
import './Login.css';

const Login = ({ setIsLoggedIn }) => {
  const [state, setState] = useState('login');
  const [userData, setUserData] = useState({});
  const [isNameError, setIsNameError] = useState(true);
  const [isEmailError, setIsEmailError] = useState(true);
  const [isPwdError, setIsPwdError] = useState(true);
  const [isConfirmPwdError, setIsConfirmPwdError] = useState(true);
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    const eventName = event.target.name;
    const eventValue = event.target.value;

    if (eventName === 'name') {
      setIsNameError(!eventValue.match(/^[a-zA-Z ]*$/));
    }
    if (eventName === 'email') {
      setIsEmailError(!eventValue.match(/^[a-zA-Z0-9]+@+[a-z]+\.com$/));
    }
    if (eventName === 'password') {
      setIsPwdError(
        !eventValue.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      );
    }
    if (eventName === 'confirmPassword') {
      setIsConfirmPwdError(userData.password !== eventValue);
    }

    setUserData((previousValues) => {
      return {
        ...previousValues,
        [eventName]: eventValue,
      };
    });
  };

  const showPwd = () => {
    const pwd = document.getElementById('pwd');
    pwd.type === 'password' ? (pwd.type = 'text') : (pwd.type = 'password');

    if (state === 'signup') {
      const confirmPwd = document.getElementById('confirmPwd');
      confirmPwd.type === 'password'
        ? (confirmPwd.type = 'text')
        : (confirmPwd.type = 'password');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state === 'signup') {
      localStorage.setItem(userData.email, JSON.stringify(userData));
      document.getElementsByClassName('confirm-pwd')[0].value = '';
      document.getElementsByClassName('name')[0].value = '';
      setState('login');
    } else {
      const user = JSON.parse(localStorage.getItem(userData.email));
      if (user.password === userData.password) {
        setError(false);
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        window.location.replace(window.location.origin);
      } else {
        setError(true);
      }
    }
    document.getElementsByClassName('email')[0].value = '';
    document.getElementsByClassName('pwd')[0].value = '';
    document.getElementsByClassName('check-pwd')[0].checked = false;
    showPwd();
  };

  return (
    <div className='login-page'>
      <form className='form' id='loginForm' onSubmit={(e) => handleSubmit(e)}>
        <div className='title'>{state === 'login' ? 'Login' : 'Sign Up'}</div>
        {state === 'signup' && (
          <input
            type='text'
            name='name'
            className='name'
            onChange={handleInputChange}
            value={userData.name ? userData.name : ''}
            placeholder='Name'
            required
          />
        )}
        <input
          type='email'
          name='email'
          className='email'
          onChange={handleInputChange}
          pattern='^[a-zA-Z0-9]+@+[a-z]+\.com$'
          value={userData.email ? userData.email : ''}
          placeholder='Email'
          style={{ border: error ? '2px solid red' : 'none' }}
          required
        />
        {state === 'login' ? (
          <input
            type='password'
            name='password'
            className='pwd'
            id='pwd'
            onChange={handleInputChange}
            value={userData.password ? userData.password : ''}
            placeholder='Password'
            style={{ border: error ? '2px solid red' : 'none' }}
            required
          />
        ) : (
          <>
            <div className='email-guide'>Use format example@example.com</div>
            <input
              type='password'
              name='password'
              className='pwd'
              id='pwd'
              onChange={handleInputChange}
              value={userData.password ? userData.password : ''}
              placeholder='Password'
              required
            />
            <input
              type='password'
              name='confirmPassword'
              className='confirm-pwd'
              id='confirmPwd'
              onChange={handleInputChange}
              value={userData.confirmPassword ? userData.confirmPassword : ''}
              placeholder='Confirm Password'
              required
            />
            <div className='pwd-guide'>
              Min. 8 or more characters with lowercase, uppercase, and numbers
            </div>
          </>
        )}
        <div className='show-pwd'>
          <input type='checkbox' className='check-pwd' onClick={showPwd} />
          Show password
        </div>
        <button
          type='submit'
          className='submit-btn'
          disabled={
            state === 'signup'
              ? isEmailError || isNameError || isPwdError || isConfirmPwdError
              : isEmailError || isPwdError
          }
        >
          {state === 'login' ? 'Login' : 'Sign Up'}
        </button>
        <div
          className='change-form'
          onClick={() => {
            state === 'login' ? setState('signup') : setState('login');
          }}
        >
          {state === 'login'
            ? 'Click here to signup a new account'
            : 'Click here to login instead'}
        </div>
      </form>
    </div>
  );
};

export default Login;
