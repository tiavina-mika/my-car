import { Route, Switch } from 'react-router';

import Auth from './containers/auth/Auth';
import Home from './containers/Home';
import Logout from './containers/Logout';
import MainRoute from './MainRoute';
import { LOGIN_PATHNAME } from './utils/constants';

const Routes = () => {
  return (
      <Switch>
        <MainRoute path="/" component={Home} exact />
        <Route path={LOGIN_PATHNAME} exact>
          <Auth />
        </Route>        
        <Route path="/signup" exact>
          <Auth />
        </Route>  

        {/* <PrivateRoutes path="/dashboard" component={Home} exact />
        <PrivateRoutes path="/dashboard/profile" component={Profile} exact />
        <PrivateRoutes path="/dashboard/changer-mot-de-passe" component={ChangePassword} exact /> */}

        <Route path="/logout" component={Logout} />
      </Switch>
  );
};

export default Routes;