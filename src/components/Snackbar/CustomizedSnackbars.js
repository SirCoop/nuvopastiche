import React from 'react';
import PropTypes from 'prop-types';
import {
  Snackbar,
  withStyles,
} from '@material-ui/core';
import SnackbarContentWrapper from './SnackbarContent';

let openSnackbarFn;

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class CustomizedSnackbars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      message: '',
      variant: '',
      duration: 4000,
    };
  }

  componentDidMount() {
    openSnackbarFn = this.openSnackbar;
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  openSnackbar = ({ message, variant, duration }) => {
    this.setState({
      open: true, message, variant, duration,
    });
  };

  render() {
    const {
      duration, open, message, variant,
    } = this.state;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          autoHideDuration={duration}
          onClose={this.handleClose}
        >
          <SnackbarContentWrapper
            onClose={this.handleClose}
            variant={variant}
            message={message}
          />
        </Snackbar>
      </div>
    );
  }
}

CustomizedSnackbars.defaultProps = {
  classes: PropTypes.shape({}),
};

CustomizedSnackbars.propTypes = {
  classes: PropTypes.shape({}),
};

export function openSnackbar({ message, variant, duration }) {
  openSnackbarFn({ message, variant, duration });
}

export default withStyles(styles)(CustomizedSnackbars);
