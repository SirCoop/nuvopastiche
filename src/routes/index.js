import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';
import home from './home';

const RouterComponent = (props) => {
  const { model = {} } = props;

  return (
    <Switch>
      <Route path={home.path} component={home.Component} />
      <Redirect from="/" to="/home" />
    </Switch>
  );
};

RouterComponent.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
  model: PropTypes.shape({}).isRequired,
};

RouterComponent.propTypes = {
  classes: PropTypes.shape({}),
  model: PropTypes.shape({}),
};

export default RouterComponent;
