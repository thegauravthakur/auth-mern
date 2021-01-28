import React, { useState } from 'react';
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserState } from "../recoil/atom";
import { RiLoader2Line } from 'react-icons/ri';

const HomeView = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState(UserState);
  const onClickHandler = async () => {
    try {
      setLoading(true);
      await axios.get("https://hidden-temple-89315.herokuapp.com/logoutUser", {
        withCredentials: true,
      });
      setLoading(false);
      setUser(null);
    } catch (e) {
      setLoading(false);
      console.log("some error occurred while logging out the user");
    }
  };
  if (!user) return <Redirect to={"/login"} />;
  return (
    <div className="text-center px-5">
      <p className="text-2xl text-center font-bold text-gray-700 my-3">
        You are logged in
      </p>
      <p className="max-w-xs mx-auto mb-3 text-gray-600">
        You will be logged in by default next time you reopen the website
      </p>
      <div className="max-w-md shadow rounded-2xl mx-auto px-5 py-5">
        <p className="text-center font-semibold text-gray-700 text-lg">
          User Info
        </p>
        <div className="flex justify-between mt-5">
          <p className="font-semibold text-gray-700">Name</p>
          <p className="text-gray-700">{user.name}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold text-gray-700">Email</p>
          <p className="text-gray-700">{user.email}</p>
        </div>
      </div>
      <button
        onClick={onClickHandler}
        className="relative text-sm font-semibold w-full max-w-md mt-3 py-2 mb-5 bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none text-white transition duration-500 ease-in-out"
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
        Logout
      </button>
    </div>
  );
};

export default HomeView;
