import React, { useEffect } from "react";
import { Container } from "reactstrap";
import CreateButton from "../Components/Account/CreateButton";
import ModalCreateNewAccount from "../Components/Account/CreateNewAccount/ModalCreateNewAccount";
import ResultForm from "../Components/Account/ResultForm";
// import { addAccountNewAPI } from "../API/AccountApi";

import { useDispatch, useSelector } from "react-redux";
import { showFormAction } from "./../Redux/Action/FormAction";
import { closeFormAction } from "./../Redux/Action/FormAction";
import {
  actionAddAccountAPI,
  actionDeleteAccountAPI,
  actionFetchListAccountAPI,
  actionUpdateAccountAPI,
} from "../Redux/Action/AccountAction";
import { actionFetchListPositionAPI } from "../Redux/Action/PositionAction";
import { actionFetchListDepartmentAPI } from "../Redux/Action/DepartmentAction";
import ModalUpdateAccount from "../Components/Account/UpdateAccount/ModalUpdateAccount";
import {
  actionFetchAccountUpdateInfoRedux,
  actionTogleFormRedux,
} from "../Redux/Action/FormUpdateAction";

function AccountContainer(props) {
  // Khai báo hook để dispach Action
  let dispatchRedux = useDispatch();
  // Khai báo hook để lấy State từ Redux
  let stateRedux = useSelector((state) => state);
  // Hàm Callback xử lý khi nhấn nút CreateNewAccount
  let onHandleCreateButtuon = () => {
    dispatchRedux(showFormAction());
  };
  // Hàm Callback xử lý khi nhấn nút Close ở ModalCreateNewAccount
  let onHandleCloseModal = () => {
    dispatchRedux(closeFormAction());
  };
  // Hàm Callback xử lý khi nhấn nút Create ở InputForm
  let onHandleCreateNewAccount = (accountNew) => {
    // console.log("accountNew: ", accountNew);
    // Chuyển accountNew về Account cần thêm mới API
    let accountNew_API = {
      email: accountNew.email,
      username: accountNew.username,
      fullname: accountNew.fullname,
      departmentId: accountNew.department,
      positionId: accountNew.position,
    };
    // addAccountNewAPI(accountNew_API).then((response) => {
    //   //
    //   // fetchListAccount();
    // });
    dispatchRedux(actionAddAccountAPI(accountNew_API));
    // Đóng InputForm
    dispatchRedux(closeFormAction());
  };

  // Khai báo useEffect, useEffect này khi component được mount và mỗi khi State: listAccount thay đổi
  useEffect(() => {
    dispatchRedux(actionFetchListAccountAPI());
    dispatchRedux(actionFetchListDepartmentAPI());
    dispatchRedux(actionFetchListPositionAPI());
  }, []);
  // Hàm callback xử lý xóa Account
  let onHandleDelete = (id) => {
    dispatchRedux(actionDeleteAccountAPI(id));
  };
  // Xử lý khi nhấn nút Update
  let onHandleUpdate = async (accountUpdateForm) => {
    // Lấy của Account Cần update từ Redux
    let id_Update = stateRedux.FormUpdate.accountUpdateInfo.id;
    let accountUpdate_API = {
      id: id_Update,
      account_Update: accountUpdateForm,
    };
    // Gọi API để Update Account
    await dispatchRedux(actionUpdateAccountAPI(accountUpdate_API));

    // Đóng InputForm
    await dispatchRedux(actionTogleFormRedux());

    // Gọi API để cập nhật lại ResultForm
    await dispatchRedux(actionFetchListAccountAPI());
  };
  // Hàm Callback xử lý khi nhấn nút Edit
  let onHandleEdit = (accountEdit) => {
    // Lưu thông tin Account cần Update vào Redux
    dispatchRedux(actionFetchAccountUpdateInfoRedux(accountEdit));
    // Mở UpdateForm
    dispatchRedux(actionTogleFormRedux());
  };
  //
  return (
    <Container>
      {/* Nút thêm mới */}
      <CreateButton onHandleCreateButtuon={onHandleCreateButtuon} />
      {/* Form thêm mới Account*/}
      <ModalCreateNewAccount
        // showForm={showForm}
        onHandleCloseModal={onHandleCloseModal}
        onHandleCreateNewAccount={onHandleCreateNewAccount}
      />
      {/* Form Update Account*/}
      <ModalUpdateAccount onHandleUpdate={onHandleUpdate} />
      {/* Form kết quả */}
      <ResultForm onHandleDelete={onHandleDelete} onHandleEdit={onHandleEdit} />
    </Container>
  );
}

export default AccountContainer;
