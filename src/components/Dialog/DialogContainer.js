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
    const {
      activateDialog,
      content: {
        cancelButton,
        confirmButton,
        contentText,
        dialogContent,
        title,
      },
    } = this.props;
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
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {contentText}
            </DialogContentText>
            {dialogContent}
          </DialogContent>
          <DialogActions>
            {
              cancelButton
                ? (
                  <Button onClick={this.handleClose} color="primary">
                    {cancelButton.text}
                  </Button>
                ) : ''
            }

            {
              confirmButton
                ? (
                  <Button onClick={this.handleClose} color="primary">
                    {confirmButton.text}
                  </Button>
                ) : ''
            }
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DialogContainer.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
  activateDialog: PropTypes.bool.isRequired,
  content: PropTypes.shape({}).isRequired,
  toggleDialog: PropTypes.func.isRequired,
};

DialogContainer.propTypes = {
  classes: PropTypes.shape({}),
  activateDialog: PropTypes.bool,
  content: PropTypes.shape({}),
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
