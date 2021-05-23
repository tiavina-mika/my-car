import { ElementType } from 'react';

import { Route } from 'react-router';

import Main from './containers/Main';
import { useAuth } from './hooks/useAuth';

type Props ={ component: ElementType; [x: string]: any };
const MainRoute = ({ component: Component, ...rest }: Props) => {

  // save the user to the store if the user is connected
  useAuth();
  
  return (
    <Route {...rest}>
      <Main>
        <Component />
      </Main>
    </Route>
  );
};

export default MainRoute;