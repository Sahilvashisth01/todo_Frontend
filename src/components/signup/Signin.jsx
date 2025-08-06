import React, { useState } from 'react';
import './Signup.css';
import HeadingComp from './HeadingComp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';

const Signin = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [Inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://todo-backend-0o4p.onrender.com/api/v1/signin', Inputs);

      console.log("API response data:", response.data);

      if (response.data && response.data.user && response.data.user._id) {
        sessionStorage.setItem('id', response.data.user._id);
        dispatch(authActions.login({ user: response.data.user.username }));
      } else {
        throw new Error("Invalid response structure from the API");
      }

      setInputs({ email: '', password: '' });

      history('/todo');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        console.error("Error during API call:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className='signin'>
      <div className='container'>
        <div className='row align-items-center justify-content-center'>
          <div className='col-lg-4 column col-left d-flex justify-content-center align-items-center'>
            <HeadingComp first='Sign' second='In' />
          </div>
          <div className='col-lg-8 column d-flex justify-content-center align-items-center'>
            <div className='signup-form w-100 p-5'>
              <form onSubmit={submit}>
                <input
                  className='form-control mb-3'
                  type='email'
                  name='email'
                  placeholder='Enter Your Email'
                  onChange={change}
                  value={Inputs.email}
                />
                <input
                  className='form-control mb-3'
                  type='password'
                  name='password'
                  placeholder='Enter Your Password'
                  onChange={change}
                  value={Inputs.password}
                />
                <button className='btn-signup w-100' type='submit'>
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
