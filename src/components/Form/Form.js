import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import Send from '@material-ui/icons/Send';
import FileUploader from '../Upload/FileUploader';

const styles = theme => ({
  root: {
    backgroundColor: '#efefef',
    flexGrow: 1,
  },
  form: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  guide: {
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '1rem',
  },
  guideUnlocked: {
    color: '#01c2ff',
  },
  textField: {
    width: '90%',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  sendButton: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  actionBtnGroup: {
    marginTop: '1rem',
    textAlign: 'center',
  },
  slider: {
    marginBottom: '.5rem',
  },
});

class Form extends React.Component {
  componentDidMount() {}

  // files is an array regardless of file limit prop on uploader
  handlePersonalImageSave = (file) => {
    const { formObj, handlePersonalImageUpload } = this.props;
    handlePersonalImageUpload(file, formObj);
  };

  // files is an array regardless of file limit prop on uploader
  handleArtImageSave = (file) => {
    const { formObj, handleArtImageUpload } = this.props;
    handleArtImageUpload(file, formObj);
  };

  generateKey = index => `${index}_${new Date().getTime()}`;

  render() {
    const {
      classes,
      disableStart,
      formObj,
      handleInput,
      handleSliderInput,
      formValid,
      personalImageData,
      savedPersonalImage,
      savedArtImage,
      styleImageData,
      startAthena,
    } = this.props;

    const personalFileUploadDisable = (!formValid || savedPersonalImage);
    const artFileUploadDisable = (!formValid || !savedPersonalImage || (savedPersonalImage && savedArtImage));

    return (
      <form className={classes.form}>
        <Grid container spacing={16} className={classes.gridContainer}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              type="text"
              name="firstName"
              className={classes.textField}
              InputProps={{
                value: formObj.firstName,
                onChange: handleInput,
              }}
              placeholder="First Name"
            />
            {/* First Name */}
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              type="text"
              name="lastName"
              className={classes.textField}
              InputProps={{
                value: formObj.lastName,
                onChange: handleInput,
              }}
              placeholder="Last Name"
            />
            {/* Last Name */}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="text"
              name="email"
              className={classes.textField}
              InputProps={{
                value: formObj.email,
                onChange: handleInput,
              }}
              placeholder="abc@gmail.com"
            />
            {/* Email */}
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.actionBtnGroup}
            >
              <Grid item xs={12}>
                <div className={personalFileUploadDisable ? classes.guide : classes.guideUnlocked}>
                  <span>Personal Photo</span>
                </div>
              </Grid>
              <FileUploader
                disable={personalFileUploadDisable}
                filesLimit={1}
                handleUploadSubmit={this.handlePersonalImageSave}
              />
              <Grid item xs={12}>
                <div>
                  {
                    personalImageData.name ? personalImageData.name : ''
                  }
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.actionBtnGroup}
            >
              <Grid item xs={12}>
                <div className={artFileUploadDisable ? classes.guide : classes.guideUnlocked}>
                  <span>Artistic Reference</span>
                </div>
              </Grid>
              <FileUploader
                disable={artFileUploadDisable}
                filesLimit={1}
                handleUploadSubmit={this.handleArtImageSave}
              />
              <Grid item xs={12}>
                <div>
                  {
                    styleImageData.name ? styleImageData.name : ''
                  }
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Typography align="center">Style Intensity</Typography>
                <Slider
                  classes={{ container: classes.slider }}
                  value={formObj.intensity}
                  aria-labelledby="label"
                  onChange={handleSliderInput}
                  min={1}
                  max={100}
                  disabled={!formValid || !savedPersonalImage || !savedArtImage || disableStart}
                />
                {/* Intensity */}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.actionBtnGroup}
          >
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.sendButton}
                disabled={!savedPersonalImage || !savedArtImage || disableStart}
                onClick={startAthena}
              >
                {'Send'}
                <Send className={classes.rightIcon} />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    );
  }
}

Form.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
  disableStart: PropTypes.bool.isRequired,
  formObj: PropTypes.shape({}).isRequired,
  formValid: PropTypes.bool.isRequired,
  handleArtImageUpload: PropTypes.func.isRequired,
  handlePersonalImageUpload: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSliderInput: PropTypes.func.isRequired,
  personalImageData: PropTypes.shape({}).isRequired,
  savedPersonalImage: PropTypes.bool.isRequired,
  savedArtImage: PropTypes.bool.isRequired,
  styleImageData: PropTypes.shape({}).isRequired,
  startAthena: PropTypes.func.isRequired,
};

Form.propTypes = {
  classes: PropTypes.shape({}),
  disableStart: PropTypes.bool,
  formObj: PropTypes.shape({}),
  formValid: PropTypes.bool,
  handleArtImageUpload: PropTypes.func,
  handlePersonalImageUpload: PropTypes.func,
  handleInput: PropTypes.func,
  handleSliderInput: PropTypes.func,
  personalImageData: PropTypes.shape({}),
  savedPersonalImage: PropTypes.bool,
  savedArtImage: PropTypes.bool,
  styleImageData: PropTypes.shape({}),
  startAthena: PropTypes.func,
};

export default withStyles(styles)(Form);
