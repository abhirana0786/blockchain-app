import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { handleActions } from 'redux-actions';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import appReducers, { INITIAL_APP_STATE } from './reducers';

// Combine all reducers to pass to the store
const createReducer = (history, asyncReducers) => combineReducers({
  data: handleActions(appReducers, INITIAL_APP_STATE),
  router: connectRouter(history),
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Create the store
const initializeStore = (history) => {

  const store = createStore(
    createReducer(history),
    composeEnhancers(
      applyMiddleware(thunk, routerMiddleware(history)),  
    )
  );

  return store;
};

export default initializeStore;
