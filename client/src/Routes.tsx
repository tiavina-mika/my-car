import { Route, Switch } from 'react-router';

import Home from './containers/Home';
// import Login from './containers/login/Login';
import Logout from './containers/Logout';

import Signup from './containers/signup/Signup';
import MainRoute from './MainRoute';


const Routes = () => {

  return (
      <Switch>
        <MainRoute path="/" component={Home} exact />
        {/* <Route path="/login" exact>
          <Login />
        </Route>         */}
        <Route path="/signup" exact>
          <Signup />
        </Route>  

        {/* <PrivateRoutes path="/dashboard" component={Home} exact />
        <PrivateRoutes path="/dashboard/profile" component={Profile} exact />
        <PrivateRoutes path="/dashboard/changer-mot-de-passe" component={ChangePassword} exact />*/}

        <Route path="/logout" component={Logout} />
      </Switch>
  );
};

export default Routes;