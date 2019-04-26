import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import home from './home';
import gallery from './gallery';
import contact from './contact';
import about from './about';

const RouterComponent = () => {
  return (
    <Switch>
      <Route path={home.path} component={home.Component} />
      <Route path={gallery.path} component={gallery.Component} />
      <Route path={contact.path} component={contact.Component} />
      <Route path={about.path} component={about.Component} />
      <Redirect from="/" to="/home" />
    </Switch>
  );
};

RouterComponent.defaultProps = {
};

RouterComponent.propTypes = {
};

export default RouterComponent;
