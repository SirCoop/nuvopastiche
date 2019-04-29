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
      });
  };

  setHelpImages = (helpImages) => {
    this.setState({
      helpImages,
    });
  };

  generateImageDivs = () => {
    const { helpImages } = this.state;
    const imageHTML = helpImages.map(item => (
      <div key={_.uniqueId(item.name)}>
        <img src={item.src} alt={item.name} />
        {/* <p className="legend">{item.description}</p> */}
      </div>
    ));
    return imageHTML;
  };

  render() {
    return (
      <React.Fragment>
        <Help images={this.generateImageDivs()} />
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
