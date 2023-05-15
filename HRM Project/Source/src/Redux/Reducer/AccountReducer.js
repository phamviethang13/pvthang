import * as TYPES from "../Contant/ActionType"; // Import acctionType đê sử dụng

var initialState = [];

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FETCH_ACCOUNT_LIST:
      //   console.log("payload: ", action.payload);
      state = action.payload;
      return [...state];

    case TYPES.DELETE_ACCOUNT:
      //   console.log("payload: ", action.payload);
      let idDelete = action.payload;
      let listAccountState = state;
      let indexDelete = listAccountState.findIndex(
        (account) => account.id === idDelete
      );
      listAccountState.splice(indexDelete, 1);

      return listAccountState;

    default:
      return [...state];
  }
};

export default AccountReducer;
