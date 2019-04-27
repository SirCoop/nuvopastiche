/* eslint no-console: 0 */ // --> OFF
import React from 'react';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  withStyles,
} from '@material-ui/core';
import spinnerActionCreators from '../../redux/actions/spinner/spinnerActionCreators';
import NPCarousel from '../Carousel';

const styles = () => ({
  root: {
  },
});

class Introduction extends React.Component {
  images = [
    {
      src: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_spiderman.png',
      name: 'Spiderman',
      description: 'Spiderman',
    },
    {
      src: 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_ironman.png',
      name: 'Tony Stark',
      description: 'Iron Man',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <NPCarousel images={this.images} />
      </React.Fragment>
    );
  }
}

Introduction.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
};

Introduction.propTypes = {
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

const ConnectedIntroduction = fp.compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(Introduction);

export default ConnectedIntroduction;
