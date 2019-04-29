const dialogActionCreators = {
  toggleDialog: activateDialog => dispatch => dispatch({
    type: 'TOGGLE_DIALOG',
    activateDialog,
  }),
};

export default dialogActionCreators;
