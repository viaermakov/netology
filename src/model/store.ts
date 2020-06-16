import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import { IPersonsStoreState } from './reducer';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

export interface IStore {
  main: IPersonsStoreState;
}

export const configureStore = (initialState?: IStore) => {
  const logger = createLogger();

  const middlewares = [thunk];

  let composeEnhancers = compose;

  if (process.env.NODE_ENV !== 'production') {
    composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    middlewares.push(logger as any);
  }

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  return store;
};

export default configureStore;
