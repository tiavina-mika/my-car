import { ElementType } from 'react';

import { Route } from 'react-router';

import Main from './containers/Main';
import { useAuth } from './hooks/useAuth';

type Props ={ component: ElementType; [x: string]: any };
const MainRoute = ({ component: Component, ...rest }: Props) => {

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