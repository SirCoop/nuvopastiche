import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import home from './home';

const RouterComponent = () => {
  return (
    <Switch>
      <Route path={home.path} component={home.Component} />
      <Redirect from="/" to="/home" />
    </Switch>
  );
};

RouterComponent.defaultProps = {
};

RouterComponent.propTypes = {
};

export default RouterComponent;
