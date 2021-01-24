import React from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserState } from "../recoil/atom";

const HomeView = () => {
  const [user, setUser] = useRecoilState(UserState);
  const history = useHistory();

  const onClickHandler = async () => {
    try {
      await axios.get("/logoutUser");
      setUser(null);
    } catch (e) {
      console.log("some error occurred while logging out the user");
    }
  };
  if (!user) return <Redirect to={"/login"} />;

  return (
    <div>
      <p>home screen</p>
      {user.name}
      {user.email}
      {user.id}
      <button onClick={onClickHandler}>logout</button>
    </div>
  );
};

export default HomeView;
