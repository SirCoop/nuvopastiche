const dialogReducers = {
  activateDialog: (state = false, action) => {
    switch (action.type) {
      case 'TOGGLE_DIALOG':
        return action.activateDialog;
      default:
        return state;
    }
  },
};

export default dialogReducers;
