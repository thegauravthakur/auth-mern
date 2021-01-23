import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserState } from "../recoil/atom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = useRecoilValue(UserState);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to={"/login"} />
      }
    />
  );
};

export default ProtectedRoute;
