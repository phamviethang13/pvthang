import { api } from "./api";

// get listAccount API
const getListAccountAPI = () => {
  return api("GET", "accounts/", null);
};

// Add New Account
const addAccountNewAPI = (AccountNew) => {
  return api("POST", "accounts/", AccountNew);
};

// Delete Account
const deleteAccountAPI = (id) => {
  let url = "accounts/" + id;
  console.log("url:", url);
  return api("DELETE", url, null);
};

// Update Account
const updateAccountAPI = (accountUpdate) => {
  let url = "accounts/" + accountUpdate.id;
  return api("PUT", url, accountUpdate.account_Update);
};

export {
  getListAccountAPI,
  addAccountNewAPI,
  deleteAccountAPI,
  updateAccountAPI,
};
