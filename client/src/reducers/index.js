import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth_reducer';
import calc from './days_reducer';
import rate from './rate_reducer';

const rootReducer = combineReducers({
  form, auth, calc, rate
});

export default rootReducer;
