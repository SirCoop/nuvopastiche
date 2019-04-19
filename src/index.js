import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import ConnectedApp from './App';
import theme from './theme';
import store from './redux/store';
// import UserProvider from './components/Provider';

ReactDom.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        {/* <UserProvider> */}
        <ConnectedApp />
        {/* </UserProvider> */}
      </Provider>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
