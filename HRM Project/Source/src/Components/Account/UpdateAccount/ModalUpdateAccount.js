import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
} from "reactstrap";
import { actionTogleFormRedux } from "../../../Redux/Action/FormUpdateAction";

import UpdateForm from "./UpdateForm";

function ModalUpdateAccount(props) {
  // Gọi lại các props truyền từ bên ngoài vào
  let { onHandleUpdate } = props;
  // Lấy giá trị State đang lưu trên Redux để sử dụng
  // Khai báo hook để dispach Action
  let dispatchRedux = useDispatch();
  // Lấy các State từ Redux
  let stateRedux = useSelector((state) => state.FormUpdate);
  // console.log("accountUpdateInfo", stateRedux);
  let isOpen = stateRedux.isShowFormUpdate;
  // Hàm xử lý khi nhấn nút Close
  let handleCloseModal = () => {
    //Dispath action để thay đổi State: isShowFormUpdate
    dispatchRedux(actionTogleFormRedux());
  };
  //
  return (
    <Container>
      <br />
      <Modal isOpen={isOpen}>
        <ModalHeader>
          <h3>Update Account</h3>
        </ModalHeader>
        <ModalBody>
          <UpdateForm onHandleUpdate={onHandleUpdate} />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default ModalUpdateAccount;
