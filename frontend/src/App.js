import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomeView from "./views/HomeView";
import axios from "axios";
import { useRecoilState } from "recoil";
import { UserState } from "./recoil/atom";
import CreateAccountView from "./views/CreateAccountView";
import { RiLoader2Line } from "react-icons/ri";

function App() {
  const [user, setUser] = useRecoilState(UserState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const {
          data,
        } = await axios.get(
          "https://hidden-temple-89315.herokuapp.com/jwtToUser",
          { withCredentials: true }
        );
        setUser(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log("some error occurred while authenticating user");
      }
    };
    getUser().then();
  }, []);
  if (loading)
    return (
      <div className='min-h-screen flex justify-center items-center bg-blue-50'>
        <RiLoader2Line className="h-5 w-5 animate-spin" />
      </div>
    );
  return (
    <Switch>
      <Route exact path="/login" component={LoginView} />
      <Route exact path="/signup" component={CreateAccountView} />
      <ProtectedRoute component={HomeView} />
    </Switch>
  );
}

export default App;
