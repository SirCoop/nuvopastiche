import { combineReducers } from 'redux';
import spinnerReducers from './spinner/spinnerReducers';

export default combineReducers({
  ...spinnerReducers,
});
