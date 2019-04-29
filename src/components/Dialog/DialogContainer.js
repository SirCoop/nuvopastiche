import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fp from 'lodash/fp';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  withStyles,
} from '@material-ui/core';
import dialogActionCreators from '../../redux/actions/dialog/dialogActionCreators';

const styles = () => ({
  root: {
  },
});

class DialogContainer extends React.Component {
  handleClickOpen = () => {
    const { toggleDialog } = this.props;
    toggleDialog(true);
  };

  handleClose = () => {
    const { toggleDialog } = this.props;
    toggleDialog(false);
  };

  render() {
    const { activateDialog } = this.props;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          {'Open form dialog'}
        </Button>
        <Dialog
          open={activateDialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {'To subscribe to this website, please enter your email address here. We will send updates occasionally.'}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {'Cancel'}
            </Button>
            <Button onClick={this.handleClose} color="primary">
              {'Subscribe'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DialogContainer.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
  activateDialog: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
};

DialogContainer.propTypes = {
  classes: PropTypes.shape({}),
  activateDialog: PropTypes.bool,
  toggleDialog: PropTypes.func,
};

const mapStateToProps = ({
  activateDialog,
}) => ({
  activateDialog,
});

const mapDispatchToProps = dispatch => ({
  toggleDialog: (activateDialog) => {
    dispatch(dialogActionCreators.toggleDialog(activateDialog));
  },
});

const ConnectedDialogContainer = fp.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(DialogContainer);

export default ConnectedDialogContainer;
