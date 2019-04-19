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
  model: PropTypes.shape({}).isRequired,
};

RouterComponent.propTypes = {
  model: PropTypes.shape({}),
};

export default RouterComponent;
