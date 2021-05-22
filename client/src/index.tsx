import { createGenerateClassName, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import { create } from 'jss';
import preset from 'jss-preset-default';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { history } from './reducers';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { theme } from './utils/theme';
import './styles.css';

/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-unused-expressions */
const render = () => {
  const Routes = require('./Routes').default;
  const wrapper = document.getElementById('root');

  const jss = create(preset());

  // very important for react-await-dialog
  const generateClassName = createGenerateClassName();

  wrapper
      ? ReactDOM.render(
            <Provider store={store}>
                <HelmetProvider>
                  <StylesProvider jss={jss} generateClassName={generateClassName}>
                    <ThemeProvider theme={theme}>
                      <ConnectedRouter history={history}>
                        <Routes />
                      </ConnectedRouter>
                    </ThemeProvider>
                  </StylesProvider>
                </HelmetProvider>
            </Provider>
          ,
          document.getElementById('root'),
        )
      : false;
};

render();

/* eslint-disable  @typescript-eslint/no-explicit-any */
if (process.env.NODE_ENV === 'development') {
  (module as any).hot?.accept('./Routes', () => render());
}

// init();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();