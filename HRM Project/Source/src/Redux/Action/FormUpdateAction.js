import * as TYPES from "../Contant/ActionType";
// Chuyển đổi trạng thái đóng mở của Account
export const actionTogleFormRedux = () => {
  return {
    type: TYPES.TOGLE_FORM_UPATE,
  };
};

// Lưu thông tin của Account Update lên redux
export const actionFetchAccountUpdateInfoRedux = (accountUpdate) => {
  return {
    type: TYPES.FETCH_ACCOUNT_UPDATE_INFO,
    payload: accountUpdate,
  };
};
