import { combineReducers } from 'redux';
import spinnerReducers from './spinner/spinnerReducers';
import deviceReducers from './device/deviceReducers';

export default combineReducers({
  ...spinnerReducers,
  ...deviceReducers,
});
