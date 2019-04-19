import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Loader from 'react-loader-spinner';

const styles = () => ({
});

function Spinner(props) {
  const { loading } = props;
  return (
    <React.Fragment>
      {
        loading
          ? (
            <div className="spinner-container">
              <div className="spinner">
                <Loader
                  type="Plane"
                  color="#00BFFF"
                  height="50"
                  width="50"
                />
              </div>
            </div>
          ) : '' }
    </React.Fragment>
  );
}

Spinner.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Spinner);
