import React, { useState } from 'react';
import './Signup.css';
import HeadingComp from './HeadingComp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: '',
    username: '',
    password: '',
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1000/api/v1/register', Inputs);
      console.log("API response data:", response.data);
  
      if (response.data && response.data._id) {
        alert("Signup successful! Please log in.");
        history('/signin'); // ✅ Redirect to Sign-In page after signup
      } else {
        throw new Error('Invalid response structure from the API');
      }
  
      setInputs({
        email: '',
        username: '',
        password: '',
      });
  
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        console.error('Error during API call:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };
  

  return (
    <div className='signup'>
      <div className='container'>
        <div className='row align-items-center justify-content-center'>
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
                  type='text'
                  name='username'
                  placeholder='Enter Your Username'
                  onChange={change}
                  value={Inputs.username}
                />
                <input
                  className='form-control mb-3'
                  type='password'
                  name='password'
                  placeholder='Enter Your Password'
                  onChange={change}
                  value={Inputs.password}
                />
                <button className='btn-signup w-100' type='submit'>Sign Up</button>
              </form>
            </div>
          </div>
          <div className='col-lg-4 column col-left d-flex justify-content-center align-items-center'>
            <HeadingComp first='Sign' second='Up' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
