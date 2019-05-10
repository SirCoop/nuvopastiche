/* eslint no-console: 0 */ // --> OFF
import React from 'react';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  withStyles,
} from '@material-ui/core';
import notify from '../Snackbar/notify';
import Form from './Form';
import athenaService from '../../services/athena.service';
import spinnerActionCreators from '../../redux/actions/spinner/spinnerActionCreators';

const styles = () => ({
  root: {
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  title: {
    fontSize: '2rem',
  },
});

class FormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disableStart: false,
      emailValid: false,
      firstNameValid: false,
      lastNameValid: false,
      formObj: {
        firstName: '',
        lastName: '',
        email: '',
        fileName: '',
        intensity: 80,
      },
      personalImageData: {
        name: '',
        size: '',
        type: '',
      },
      styleImageData: {
        name: '',
        size: '',
        type: '',
      },
      savedPersonalImage: false,
      savedArtImage: false,
    };
  }

  componentDidMount() {}

  onPersonalImageUpload = (images, formObj) => {
    const { toggleSpinner } = this.props;
    toggleSpinner(true);
    const { name } = images[0];
    const formData = formObj;
    formData.fileName = name;
    athenaService.uploadPersonalImage(images, formData)
      .then(({ data }) => {
        const { message } = data;
        if (message) {
          toggleSpinner(false);
          notify({
            message,
            variant: 'warning',
            duration: 4000,
          });
        } else {
          toggleSpinner(false);
          notify({
            message: 'The file is successfully uploaded',
            variant: 'success',
          });
          this.setState({
            savedPersonalImage: true,
            personalImageData: {
              name,
            },
          });
        }
      }).catch((error) => {
        toggleSpinner(false);
        notify({
          message: `${error}`,
          variant: 'error',
        });
      });
  };

  onArtImageUpload = (images, formObj) => {
    const { toggleSpinner } = this.props;
    toggleSpinner(true);
    const { name } = images[0];
    const formData = formObj;
    formData.fileName = name;
    athenaService.uploadArtImage(images, formData)
      .then(({ data }) => {
        const { message } = data;
        if (message) {
          toggleSpinner(false);
          notify({
            message,
            variant: 'warning',
            duration: 4000,
          });
        } else {
          toggleSpinner(false);
          notify({
            message: 'The file is successfully uploaded',
            variant: 'success',
          });
          this.setState({
            savedArtImage: true,
            styleImageData: {
              name,
            },
          });
        }
      }).catch((error) => {
        toggleSpinner(false);
        notify({
          message: `${error}`,
          variant: 'error',
        });
      });
  };

  get formValid() {
    const {
      firstNameValid,
      lastNameValid,
      emailValid,
    } = this.state;

    return firstNameValid && lastNameValid && emailValid;
  }

  startAthena = () => {
    const { toggleSpinner } = this.props;
    toggleSpinner(true);
    const {
      formObj: {
        firstName, lastName, email, intensity,
      }, personalImageData, styleImageData,
    } = this.state;
    const jobInfo = {
      userDirectory: `${firstName}_${lastName}`,
      email,
      intensity,
      contentImage: personalImageData.name,
      styleImage: styleImageData.name,
    };
    athenaService.startAthenaJob(jobInfo)
      .then(() => {
        toggleSpinner(false);
        // notify({
        //   message: 'Your pastiche will be emailed upon completion.',
        //   variant: 'success',
        //   duration: 4000,
        // });
        this.setState({ disableStart: true }, () => this.goToRoute('/thanks'));
      })
      .catch((error) => {
        toggleSpinner(false);
        notify({
          message: `${error}`,
          variant: 'error',
        });
      });
  };

  handleInput = ({ target }) => {
    const {
      name,
      value,
    } = target;

    const { formObj } = this.state;
    const formValid = `${name}Valid`;

    this.setState({
      formObj: {
        ...formObj,
        [name]: value,
      },
      [formValid]: true,
    });
  };

  handleSliderInput = (event, value) => {
    const { formObj } = this.state;

    this.setState({
      formObj: {
        ...formObj,
        intensity: value,
      },
    });
  };

  goToRoute = (route) => {
    const { history } = this.props;
    history.push(route);
  };

  render() {
    const {
      disableStart,
      emailValid,
      firstNameValid,
      formObj,
      lastNameValid,
      personalImageData,
      savedArtImage,
      savedPersonalImage,
      styleImageData,
    } = this.state;
    const isValid = firstNameValid && lastNameValid && emailValid;
    return (
      <React.Fragment>
        <Form
          disableStart={disableStart}
          formObj={formObj}
          formValid={isValid}
          handleArtImageUpload={this.onArtImageUpload}
          handlePersonalImageUpload={this.onPersonalImageUpload}
          handleInput={this.handleInput}
          handleSliderInput={this.handleSliderInput}
          personalImageData={personalImageData}
          savedPersonalImage={savedPersonalImage}
          savedArtImage={savedArtImage}
          styleImageData={styleImageData}
          startAthena={this.startAthena}
        />
      </React.Fragment>
    );
  }
}

FormContainer.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  toggleSpinner: PropTypes.func.isRequired,
};

FormContainer.propTypes = {
  classes: PropTypes.shape({}),
  history: PropTypes.shape({}),
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

const ConnectedFormContainer = fp.compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(FormContainer);

export default ConnectedFormContainer;
