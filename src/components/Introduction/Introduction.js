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
import imageService from '../../services/image.service';
import NPCarousel from '../Carousel';

const styles = () => ({
  root: {
  },
});

class Introduction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      carouselImages: [],
    };
  }

  componentDidMount() {
    this.fetchCarouselImages();
  }

  fetchCarouselImages = () => {
    const { toggleSpinner } = this.props;
    toggleSpinner(true);
    imageService.getCarouselImageUrls()
      .then((data) => {
        this.setCarouselImages(data);
        toggleSpinner(false);
      });
  };

  setCarouselImages = (carouselImages) => {
    this.setState({
      carouselImages,
    });
  }

  render() {
    const { carouselImages } = this.state;

    return (
      <React.Fragment>
        <NPCarousel images={carouselImages} />
      </React.Fragment>
    );
  }
}

Introduction.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
  toggleSpinner: PropTypes.func.isRequired,
};

Introduction.propTypes = {
  classes: PropTypes.shape({}),
  toggleSpinner: PropTypes.func,
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
