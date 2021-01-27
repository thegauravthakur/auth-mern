import React from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserState } from "../recoil/atom";

const HomeView = () => {
  const [user, setUser] = useRecoilState(UserState);

  const onClickHandler = async () => {
    try {
      await axios.get("https://hidden-temple-89315.herokuapp.com/logoutUser", {
        withCredentials: true,
      });
      setUser(null);
    } catch (e) {
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
        className="bg-blue-600 w-24 py-1 rounded text-white mt-5"
        onClick={onClickHandler}
      >
        logout
      </button>
    </div>
  );
};

export default HomeView;
