import { combineReducers } from 'redux';
import spinnerReducers from './spinner/spinnerReducers';
import deviceReducers from './device/deviceReducers';
import dialogReducers from './dialog/dialogReducers';

export default combineReducers({
  ...spinnerReducers,
  ...deviceReducers,
  ...dialogReducers,
});
