/* eslint no-console: 0 */ // --> OFF
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import fp from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  withStyles,
} from '@material-ui/core';
import spinnerActionCreators from '../../redux/actions/spinner/spinnerActionCreators';
import imageService from '../../services/image.service';
import Help from './Help';
import notify from '../Snackbar/notify';

const styles = () => ({
  root: {
  },
});

class HelpContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      helpImages: [],
    };
  }

  componentDidMount() {
    this.fetchHelpImages();
  }

  fetchHelpImages = () => {
    const { toggleSpinner } = this.props;
    toggleSpinner(true);
    imageService.getHelpImageUrls()
      .then((data) => {
        this.setHelpImages(data);
        toggleSpinner(false);
      })
      .catch(() => {
        notify({
          message: 'Could not retrieve help images.',
          variant: 'error',
          duration: 3000,
        });
        toggleSpinner(false);
      });
  };

  setHelpImages = (helpImages) => {
    this.setState({
      helpImages,
    });
  };

  render() {
    const { helpImages } = this.state;
    return (
      <React.Fragment>
        {helpImages.length ? <Help images={helpImages} /> : ''}
      </React.Fragment>
    );
  }
}

HelpContainer.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
  toggleSpinner: PropTypes.func.isRequired,
};

HelpContainer.propTypes = {
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

const ConnectedHelpContainer = fp.compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(HelpContainer);

export default ConnectedHelpContainer;
