import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Navbar from './Navbar';
import SingleBlockCard from './SingleBlockCard/SingleBlockCard';
import SingleTxnCard from './SingleTxnCard/SingleTxnCard';
import App from './App';

// Root component
const Root = ({ store, history, theme }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
          <Navbar />
          <Switch>
            <Route path="/block/:blockHash" component={SingleBlockCard} />
            <Route path="/txn/:txnHash" component={SingleTxnCard} />
            <Route path="/" component={App} />
          </Switch>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
};

export default Root;
