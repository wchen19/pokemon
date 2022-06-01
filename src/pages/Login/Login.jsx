import axios from 'axios';
import React, { useState } from 'react';
import useToken, { API_URL } from '../../api/api';
import './Login.css';

const Login = () => {
  const { setToken } = useToken();
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

    if (eventName === 'username') {
      setIsNameError(!eventValue.match(/^[a-zA-Z0-9]*$/));
    }
    if (eventName === 'email') {
      setIsEmailError(!eventValue.match(/^[a-zA-Z0-9]+@+[a-z]+\.com$/));
    }
    if (eventName === 'password' || eventName === 'confirmPassword') {
      setIsPwdError(
        !eventValue.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      );
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

  const signUp = async () => {
    try {
      const item = await axios.post(`${API_URL}auth/register`, {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });
      if (item?.status === 201) {
        console.log(item);
        setState('login');
      }
    } catch (error) {
      console.log(error.config.data);
      console.log(error);
    }
  };

  const login = async () => {
    try {
      const item = await axios.post(`${API_URL}auth/login`, {
        username: userData.username,
        password: userData.password,
      });
      if (item?.status === 200) {
        console.log(item);
        setToken(item.data);
        setError(false);
        window.location.replace(window.location.origin);
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state === 'signup') {
      signUp();
      document.getElementsByClassName('confirm-pwd')[0].value = '';
      document.getElementsByClassName('email')[0].value = '';
    } else {
      login();
    }
    document.getElementsByClassName('name')[0].value = '';
    document.getElementsByClassName('pwd')[0].value = '';
    document.getElementsByClassName('check-pwd')[0].checked = false;
    showPwd();
  };

  return (
    <div className='login-page'>
      <form className='form' id='loginForm' onSubmit={(e) => handleSubmit(e)}>
        <div className='title'>{state === 'login' ? 'Login' : 'Sign Up'}</div>
        <input
          type='text'
          name='username'
          className='name'
          onChange={handleInputChange}
          value={userData.username ? userData.username : ''}
          placeholder='Username'
          required
        />
        {state === 'signup' && (
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
        )}
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
              : isNameError || isPwdError
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
