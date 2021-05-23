import { ElementType } from 'react';

import { Route } from 'react-router';

import Main from './containers/Main';

type Props ={ component: ElementType; [x: string]: any };
const MainRoute = ({ component: Component, ...rest }: Props) => {

  return (
    <Route {...rest}>
      <Main>
        <Component {...rest} />
      </Main>
    </Route>
  );
};

export default MainRoute;