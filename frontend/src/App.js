import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomeView from "./views/HomeView";
import axios from "axios";
import { useRecoilState } from "recoil";
import { UserState } from "./recoil/atom";
import CreateAccountView from './views/CreateAccountView';

function App() {
  const [user, setUser] = useRecoilState(UserState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("https://hidden-temple-89315.herokuapp.com/jwtToUser");
        setUser(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log("some error occurred while authenticating user");
      }
    };
    getUser().then();
  }, []);
  if (loading) return <p>loading</p>;
  return (
    <Switch>
      <Route exact path="/login" component={LoginView} />
      <Route exact path='/signup' component={CreateAccountView} />
      <ProtectedRoute component={HomeView} />
    </Switch>
  );
}

export default App;
