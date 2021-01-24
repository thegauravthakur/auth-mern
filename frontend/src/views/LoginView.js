import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { RiLoader2Line } from 'react-icons/ri';
import { Redirect, useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilState } from 'recoil';
import { UserState } from '../recoil/atom';
import { AiFillGoogleCircle, AiOutlineTwitter } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import { GoogleLogin } from 'react-google-login';

const LoginView = () => {
  const [user, setUser] = useRecoilState(UserState);
  const {register, handleSubmit} = useForm();
  const [loading, setLoading] = useState(false);
  const options = {headers: {'Content-Type': 'application/json'}};
  const googleLoginResponseHandler = async (response) => {
    try {
      setLoading(true);
      const {data} = await axios.post('/loginUser/google', response, options);
      setUser(data);
      setLoading(false);
    } catch (e) {
      const {data} = e.response;
      setLoading(false);
      toast(data ? data : 'error occurred while logging in', {type: 'error'})
    }
  };

  const onSubmitHandler = async (data) => {
    const {email, password} = data;
    setLoading(true);
    const error = password.length < 6;
    if (!error) {
      try {
        const {data} = await axios.post(
          '/loginUser/email-password',
          {email, password},
          options,
        );
        setLoading(false);
        setUser(data);
      } catch (e) {
        const {data} = e.response;
        toast(data ? data : 'some error occurred while logging in', {
          type: 'error',
        });
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast('wrong email/password', {type: 'error'});
    }
  };

  if (user) {
    return <Redirect to={'/'}/>;
  }

  return (
    <div className="flex min-h-screen justify-center items-center flex-col bg-blue-50">
      <h1 className="text-3xl font-bold text-gray-600">
        Login to your account
      </h1>
      <p className="mb-7 text-gray-500 mt-2">Welcome Back</p>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="bg-white max-w-md w-full px-14 py-5 rounded-xl shadow-xl"
      >
        <p className="text-sm font-semibold text-gray-600 mt-1">
          Email address
        </p>
        <input
          ref={register}
          className="w-full mb-3 mt-1 border focus:outline-none focus:ring-1 py-1.5 px-1 rounded-md focus:rounded-md  "
          required
          name={'email'}
          type={'email'}
          autoComplete={'email'}
        />
        <p className="text-sm font-semibold text-gray-600">Password</p>
        <input
          ref={register}
          className="w-full mb-3 mt-1 border focus:outline-none focus:ring-1 py-1.5 px-1 rounded-md focus:rounded-md  "
          required
          name={'password'}
          type={'password'}
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="relative text-sm font-semibold w-full mt-3 py-2 mb-5 bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none text-white transition duration-500 ease-in-out"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            {!loading ? (
              <svg
                className="h-5 w-5 text-gray-200 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <RiLoader2Line className="h-5 w-5 animate-spin"/>
            )}
          </span>
          Create Account
        </button>
        <div className="grid grid-cols-3 items-center">
          <hr className="mx-2"/>
          <p className="text-sm text-gray-500 font-semibold">
            Or continue with
          </p>
          <hr className="mx-2"/>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-5 mb-3">
          <GoogleLogin
            clientId="206612287240-pdsfsm9qb0u6kgfgpsb86ejg220t74v0.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                type="button"
                className="w-full py-1 border-2 rounded-md transition duration-500 ease-in-out hover:bg-gray-100 focus:outline-none"
              >
                <AiFillGoogleCircle
                  size={20}
                  className="mx-auto text-gray-600"
                />
              </button>
            )}
            buttonText="Login"
            onSuccess={googleLoginResponseHandler}
            onFailure={(e) => console.log(e)}
            cookiePolicy={'single_host_origin'}
          />

          <button
            type="button"
            className="w-full py-1 border-2 rounded-md transition duration-500 ease-in-out hover:bg-gray-100 focus:outline-none"
          >
            <FaFacebook size={18} className="mx-auto text-gray-600"/>
          </button>
          <button
            type="button"
            className="w-full py-1 border-2 rounded-md transition duration-500 ease-in-out hover:bg-gray-100 focus:outline-none"
          >
            <AiOutlineTwitter size={20} className="mx-auto text-gray-600"/>
          </button>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default LoginView;
