/* eslint no-console: 0 */ // --> OFF
import React from 'react';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import { connect } from 'react-redux';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import NPSpinner from '.';
import spinnerActionCreators from '../../redux/actions/spinner/spinnerActionCreators';

const styles = () => ({
  root: {
  },
});

class SpinnerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  createSpinnerNode = () => (
    <React.Fragment>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={4} />
        <Grid item xs={12} sm={4}>
          <NPSpinner />
        </Grid>
        <Grid item xs={12} sm={4} />
      </Grid>
    </React.Fragment>
  );

  render() {
    const { activateSpinner } = this.props;
    return (
      activateSpinner ? this.createSpinnerNode() : ''
    );
  }
}

SpinnerContainer.defaultProps = {
  activateSpinner: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

SpinnerContainer.propTypes = {
  activateSpinner: PropTypes.bool,
  classes: PropTypes.shape({}),
};

const mapStateToProps = ({
  activateSpinner,
}) => ({
  activateSpinner,
});

const mapDispatchToProps = dispatch => ({
  toggleSpinner: (activateSpinner) => {
    dispatch(spinnerActionCreators.toggleSpinner(activateSpinner));
  },
});

const ConnectedSpinnerContainer = fp.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(SpinnerContainer);

export default ConnectedSpinnerContainer;
