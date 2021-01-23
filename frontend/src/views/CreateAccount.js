import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { AiFillGoogleCircle, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";

const CreateAccount = () => {
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password");
  const onSubmitHandler = (data) => {
    console.log(data);
  };

  const validator = (data) => {
    return data === password.current;
  };

  return (
    <div className="flex min-h-screen justify-center items-center flex-col bg-blue-50">
      <h1 className="text-3xl font-bold text-gray-600">Create New Account</h1>
      <p className="mb-7 text-gray-500 mt-2">It will only take few seconds</p>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="bg-white max-w-md w-full px-14 py-5 rounded-xl shadow-xl"
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
          className="text-sm font-semibold w-full mt-3 py-2 mb-5 bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none text-white"
        >
          Create Account
        </button>
        <div className="grid grid-cols-3 items-center">
          <hr className="mx-2" />
          <p className="text-sm text-gray-500 font-semibold">
            Or continue with
          </p>
          <hr className="mx-2" />
        </div>
        <div className="grid grid-cols-3 gap-5 mt-5 mb-3">
          <button className="w-full py-1 border-2 rounded-md">
            <AiFillGoogleCircle size={20} className="mx-auto text-gray-600" />
          </button>
          <button className="w-full py-1 border-2 rounded-md">
            <FaFacebook size={18} className="mx-auto text-gray-600" />
          </button>
          <button className="w-full py-1 border-2 rounded-md">
            <AiOutlineTwitter size={20} className="mx-auto text-gray-600" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
