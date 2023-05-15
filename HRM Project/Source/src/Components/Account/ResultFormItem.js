import React from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";

function ResultFormItem(props) {
  let { onHandleDelete, onHandleEdit } = props;
  // Lấy các props từ bên trên truyền xuống
  // let { listAccount } = props;
  let stateRedux = useSelector((state) => state);
  let listAccount = stateRedux.listAccount;
  // Khai báo hàm handleDelete
  let handleDelete = (id) => {
    onHandleDelete(id);
  };
  // Hàm xử lý khi nhấn nút Edit
  let handleEdit = (AccountEdit) => {
    onHandleEdit(AccountEdit);
  };
  // Khai báo item hiển thị dữ liệu
  let items = "";
  // Kiểm tra nếu listAccount !="" sẽ hiển thị dữ liệu
  if (listAccount) {
    items = listAccount.map((account, index) => {
      return (
        <tr key={index}>
          <td>{account.id}</td>
          <td>{account.email}</td>
          <td>{account.username}</td>
          <td>{account.fullname}</td>
          <td>{account.department}</td>
          <td>{account.position}</td>
          <td>{account.createDate}</td>
          <td>
            <Button color="warning" onClick={() => handleEdit(account)}>
              Edit
            </Button>
          </td>
          <td>
            <Button color="warning" onClick={() => handleDelete(account.id)}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  }

  return items;
}

export default ResultFormItem;
