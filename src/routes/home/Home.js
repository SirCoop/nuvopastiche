/* eslint no-console: 0 */ // --> OFF
import React from 'react';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  Grid,
  withStyles,
} from '@material-ui/core';
import Form from '../../components/Form';
import athenaService from '../../services/athena.service';

const styles = () => ({
  root: {
  },
  card: {
    overflow: 'visible',
  },
  cardHeader: {
    backgroundColor: '#eee',
    textAlign: 'center',
  },
  gridContainer: {
    width: '100%',
    padding: '2rem 0px 0px 0px',
  },
  title: {
    fontSize: '2rem',
  },
});

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 1,
      emailValid: false,
      firstNameValid: false,
      lastNameValid: false,
      formObj: {
        firstName: '',
        lastName: '',
        email: '',
        fileName: '',
        quality: 100,
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
    const { name } = images[0];
    const formData = formObj;
    formData.fileName = name;
    athenaService.uploadPersonalImage(images, formData)
      .then(() => {
        console.log('The file is successfully uploaded');
        this.setState({
          savedPersonalImage: true,
          personalImageData: {
            name,
          },
        });
      }).catch((error) => {
        console.log('Error: ', error);
      });
  };

  onArtImageUpload = (images, formObj) => {
    const { name } = images[0];
    const formData = formObj;
    formData.fileName = name;
    athenaService.uploadArtImage(images, formData)
      .then(() => {
        console.log('The file is successfully uploaded');
        this.setState({
          savedArtImage: true,
          styleImageData: {
            name,
          },
        });
      }).catch((error) => {
        console.log('Error: ', error);
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
    const { formObj: { firstName, lastName, email }, personalImageData, styleImageData } = this.state;
    const jobInfo = {
      userDirectory: `${firstName}_${lastName}`,
      email,
      contentImage: personalImageData.name,
      styleImage: styleImageData.name,
    };
    athenaService.startAthenaJob(jobInfo)
      .then(() => {})
      .catch((error) => {
        console.log('Error: ', error);
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
        quality: value,
      },
    });
  };

  render() {
    const {
      activeStep,
      emailValid,
      firstNameValid,
      formObj,
      lastNameValid,
      personalImageData,
      savedArtImage,
      savedPersonalImage,
      styleImageData,
    } = this.state;
    const { classes } = this.props;
    const isValid = firstNameValid && lastNameValid && emailValid;
    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={4} />
          <Grid item xs={12} sm={4}>
            <Card className={classes.card}>
              <CardHeader
                classes={{
                  title: classes.title,
                }}
                className={classNames(classes.cardHeader)}
                title="Nuvo Pastiche"
              />
              <Form
                activeStep={activeStep}
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
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} />
        </Grid>
      </React.Fragment>
    );
  }
}

HomeContainer.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
};

HomeContainer.propTypes = {
  classes: PropTypes.shape({}),
};

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

const ConnectedHomeContainer = fp.compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(HomeContainer);

export default ConnectedHomeContainer;
