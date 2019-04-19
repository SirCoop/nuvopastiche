import { combineReducers } from 'redux';
import toggleSidebar from './toggleSidebar';
import spinnerReducers from './spinner/spinnerReducers';

export default combineReducers({
  isSidebarOpen: toggleSidebar,
  ...spinnerReducers,
});
