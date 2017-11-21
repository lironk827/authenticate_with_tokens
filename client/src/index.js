import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import reducers from './reducers';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import BusinessDaysCalculate from './components/api/BusinessDaysCalculate';
import ShipRate from './components/api/ShipRate';
import Welcome from './components/Welcome';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({type: AUTH_USER, payload:true});
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="api/BusinessDaysCalc" component={BusinessDaysCalculate} />
        <Route path="api/getRate" component={ShipRate} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
