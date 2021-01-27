import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { AiFillGoogleCircle, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState } from "recoil";
import { UserState } from "../recoil/atom";
import { Redirect } from "react-router-dom";
import { RiLoader2Line } from "react-icons/ri";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const CreateAccountView = () => {
  const { register, handleSubmit, errors, watch } = useForm();
  const [user, setUser] = useRecoilState(UserState);
  const [loading, setLoading] = useState(false);
  const password = useRef({});
  password.current = watch("password");
  const options = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  const onSubmitHandler = async (data) => {
    const { name, email, password } = data;
    const options = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://hidden-temple-89315.herokuapp.com/createUser/email-password",
        { name, email, password },
        options
      );
      setUser(data);
      setLoading(false);
    } catch (e) {
      const { data } = e.response ? e.response : { data: "" };
      toast(data !== "" ? data : "Some error occurred while creating user", {
        type: "error",
      });
      setLoading(false);
    }
  };

  const googleLoginResponseHandler = async (response) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://hidden-temple-89315.herokuapp.com/createUser/google",
        response,
        options
      );
      setUser(data);
      setLoading(false);
    } catch (e) {
      console.log({e})
      const { data } = e.response ? e.response : { data: "" };
      setLoading(false);
      toast(data !== "" ? data : "error occurred while creating account", {
        type: "error",
      });
    }
  };
  const facebookLoginHandler = async (response) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://hidden-temple-89315.herokuapp.com/createUser/facebook",
        response,
        options
      );
      setUser(data);
    } catch (e) {
      const { data } = e.response ? e.response : { data: "" };
      setLoading(false);
      toast(data !== "" ? data : "error occurred while creating account", {
        type: "error",
      });
    }
  };

  const validator = (data) => {
    return data === password.current;
  };

  if (user) {
    return <Redirect to={"/"} />;
  }

  return (
    <div className="flex min-h-screen justify-center items-center flex-col bg-blue-50">
      <h1 className="text-3xl font-bold text-gray-600">Create New Account</h1>
      <p className="mb-7 text-gray-500 mt-2">It will only take few seconds</p>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="bg-white max-w-md px-5 md:px-14 py-5 rounded-xl shadow-xl mx-5 "
      >
        <p
          className={`text-sm font-semibold ${
            errors.name ? "text-red-600" : "text-gray-600"
          }`}
        >
          Name
        </p>
        <input
          ref={register({ minLength: 3 })}
          className={`w-full  mt-1 border focus:outline-none focus:ring-1 py-1.5 px-1 rounded-md focus:rounded-md ${
            errors.name ? "focus:ring-red-600 border-red-600" : ""
          }`}
          required
          name={"name"}
          type={"text"}
        />
        <div className="mb-3">
          {errors.name && (
            <p className="text-xs mt-1 text-red-600">
              minimum length should be at least 3 characters
            </p>
          )}
        </div>
        <p className="text-sm font-semibold text-gray-600">Email address</p>
        <input
          ref={register}
          className="w-full mb-3 mt-1 border focus:outline-none focus:ring-1 py-1.5 px-1 rounded-md focus:rounded-md  "
          required
          name={"email"}
          type={"email"}
        />
        <p
          className={`text-sm font-semibold ${
            errors.password ? "text-red-600" : "text-gray-600"
          }`}
        >
          Password
        </p>
        <input
          ref={register({ minLength: 6 })}
          className={`w-full  mt-1 border focus:outline-none focus:ring-1 py-1.5 px-1 rounded-md focus:rounded-md ${
            errors.password ? "focus:ring-red-600 border-red-600" : ""
          }`}
          required
          name={"password"}
          type={"password"}
        />
        <div className="mb-3">
          {errors.password && (
            <p className="text-xs mt-1 text-red-600">
              minimum length should be at least 6 characters
            </p>
          )}
        </div>
        <p
          className={`text-sm font-semibold ${
            errors.confirmPassword ? "text-red-600" : "text-gray-600"
          }`}
        >
          confirm Password
        </p>
        <input
          ref={register({ validate: validator })}
          className={`w-full  mt-1 border focus:outline-none focus:ring-1 py-1.5 px-1 rounded-md focus:rounded-md ${
            errors.confirmPassword ? "focus:ring-red-600 border-red-600" : ""
          }`}
          required
          type={"password"}
          name="confirmPassword"
        />
        <div className="mb-3">
          {errors.confirmPassword && (
            <p className="text-xs mt-1 text-red-600">Passwords do not match</p>
          )}
        </div>
        <button
          type="submit"
          className="relative text-sm font-semibold w-full mt-3 py-2 mb-5 bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none text-white transition duration-500 ease-in-out "
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
              <RiLoader2Line className="h-5 w-5 animate-spin" />
            )}
          </span>
          Create Account
        </button>
        <div className="grid grid-cols-3 items-center">
          <hr className="mx-2" />
          <p className="text-sm text-gray-500 font-semibold">
            Or continue with
          </p>
          <hr className="mx-2" />
        </div>
        <div className="grid grid-cols-2 gap-5 mt-5 mb-3">
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
            cookiePolicy={"single_host_origin"}
          />
          <FacebookLogin
            appId="428705644999130"
            callback={facebookLoginHandler}
            render={(renderProps) => (
              <button
                type="button"
                onClick={renderProps.onClick}
                className="w-full py-1 border-2 rounded-md transition duration-500 ease-in-out hover:bg-gray-100 focus:outline-none"
              >
                <FaFacebook size={18} className="mx-auto text-gray-600" />
              </button>
            )}
          />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateAccountView;
