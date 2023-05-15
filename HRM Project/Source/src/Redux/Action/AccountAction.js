import {
  addAccountNewAPI,
  deleteAccountAPI,
  getListAccountAPI,
  updateAccountAPI,
} from "../../API/AccountApi";
import * as TYPES from "../Contant/ActionType"; // Import acctionType đê sử dụng

// Viết các Action liên quan đến Call API
export const actionFetchListAccountAPI = () => {
  return (dispatch) => {
    return getListAccountAPI().then((response) => {
      //  console.log("reponseAPI:", response);
      dispatch(actionFetchListAccountRedux(response));
    });
  };
};

export const actionFetchListAccountRedux = (listAccount) => {
  return {
    type: TYPES.FETCH_ACCOUNT_LIST,
    payload: listAccount,
  };
};

// Acction thêm mới Account
export const actionAddAccountAPI = (AccountNew) => {
  return (dispatch) => {
    return addAccountNewAPI(AccountNew).then((response) => {
      // console.log("reponseAPI After add New Account:", response);
      // Sau khi thêm mới thành công thực hiện dispatch actionFetchListAccountAPI
      // để load lại danh sách Account cập nhật
      dispatch(actionFetchListAccountAPI());

      // Trong TH Backend trả về thông tin Account vừa tạo mới có thể xử lý theo hướng add Account
      // vừa tạo mới vào listAccount Redux ==> sẽ k cần call API lần nữa
    });
  };
};

// Acction xóa Account
export const actionDeleteAccountAPI = (id) => {
  return (dispatch) => {
    return deleteAccountAPI(id).then((response) => {
      // console.log("response sau khi xóa Account: ", response);
      dispatch(actionDeleteAccountRedux(id));
    });
  };
};

export const actionDeleteAccountRedux = (idDelete) => {
  return {
    type: TYPES.DELETE_ACCOUNT,
    payload: idDelete,
  };
};

// Acction Update Account
// Không sử dụng thunk ở đây do không cần thiết
export const actionUpdateAccountAPI = (accountUpdate_API) => {
  return (dispatch) => {
    return updateAccountAPI(accountUpdate_API).then((response) => {
      // console.log("response sau khi xóa Account: ", response);
    });
  };
};
