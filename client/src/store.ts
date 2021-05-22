import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, Action, StoreEnhancer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import rootReducer, { history } from './reducers';

// ---- middleware ----//
const middlewares = [routerMiddleware(history), thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const composedEnhancers: StoreEnhancer<unknown, {}> = composeWithDevTools(...enhancers);
// rehydrate state on app start
const initialState = {};
// ---- store ----//
const store = createStore(rootReducer, initialState, composedEnhancers);

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
export type Dispatch<S> = ThunkDispatch<S, null, Action<string>>;
export type AppDispatch = Dispatch<RootState>;

export type RootState = ReturnType<typeof rootReducer>;

export { store };

if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
  (module as any).hot.accept('./reducers', () => store.replaceReducer(rootReducer));
}