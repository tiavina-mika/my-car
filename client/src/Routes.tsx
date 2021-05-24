import { Route, Switch } from 'react-router';

import Auth from './containers/auth/Auth';
import EditProfile from './containers/edit-profile/EditProfile';
import Home from './containers/Home';
import Logout from './containers/Logout';
import MainRoute from './MainRoute';
import { LOGIN_PATHNAME, SIGNUP_PATHNAME, EDIT_PROFILE_PATHNAME } from './utils/constants';


const Routes = () => {
  return (
      <Switch>
        <MainRoute path="/" component={Home} exact />
        <MainRoute path={EDIT_PROFILE_PATHNAME} component={EditProfile} />
        <Route path={LOGIN_PATHNAME} exact>
          <Auth />
        </Route>        
        <Route path={SIGNUP_PATHNAME} exact>
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