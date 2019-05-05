import React from 'react';
import PropTypes from 'prop-types';
import { DropzoneDialog } from 'material-ui-dropzone';
import {
  Button,
  withStyles,
} from '@material-ui/core';

const styles = () => ({
  root: {
  },
  '@keyframes shadow-pulse': {
    '0%': {
      boxShadow: '0 0 0 0px rgba(0, 0, 0, 0.2)',
    },
    '100%': {
      boxShadow: '0 0 0 4px rgba(0, 0, 0, 0)',
    },
  },
  addButton: {
    animation: 'shadow-pulse 1s infinite',
  },
});

class FileUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

    handleClose = () => {
      this.setState({
        open: false,
      });
    }

    handleSave = (files) => {
      const { handleUploadSubmit } = this.props;
      handleUploadSubmit(files);

      // Saving files to state for further use and closing Modal.
      this.setState({
        open: false,
      });
    };

    handleOpen = () => {
      this.setState({
        open: true,
      });
    };

    render() {
      const { classes, disable, filesLimit } = this.props;
      const { open } = this.state;
      return (
        <div>
          <Button onClick={this.handleOpen} disabled={disable} className={disable ? '' : classes.addButton}>
            {'Add Image'}
          </Button>
          <DropzoneDialog
            open={open}
            onSave={this.handleSave}
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            showPreviews
            maxFileSize={25000000}
            onClose={this.handleClose}
            filesLimit={filesLimit}
          />
        </div>
      );
    }
}

FileUploader.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
  disable: PropTypes.bool.isRequired,
  filesLimit: PropTypes.number.isRequired,
  handleUploadSubmit: PropTypes.func.isRequired,
};

FileUploader.propTypes = {
  classes: PropTypes.shape({}),
  disable: PropTypes.bool,
  filesLimit: PropTypes.number,
  handleUploadSubmit: PropTypes.func,
};

export default withStyles(styles)(FileUploader);
