const spinnerActionCreators = {
  toggleSpinner: activateSpinner => dispatch => dispatch({
    type: 'TOGGLE_LOADING_SPINNER',
    activateSpinner,
  }),
};

export default spinnerActionCreators;
