import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import home from './home';
import gallery from './gallery';

const RouterComponent = () => {
  return (
    <Switch>
      <Route path={home.path} component={home.Component} />
      <Route path={gallery.path} component={gallery.Component} />
      <Redirect from="/" to="/home" />
    </Switch>
  );
};

RouterComponent.defaultProps = {
};

RouterComponent.propTypes = {
};

export default RouterComponent;
