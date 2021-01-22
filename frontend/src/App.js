import {Switch, Route} from 'react-router-dom';
import LoginView from './views/LoginView';

function App() {
  return (
    <Switch>
      <Route exact path='/login' component={LoginView} />
    </Switch>
  );
}

export default App;
