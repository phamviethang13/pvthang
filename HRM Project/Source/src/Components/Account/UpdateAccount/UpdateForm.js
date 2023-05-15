// https://reactstrap.github.io/?path=/story/home-installation--page

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";

function UpdateForm(props) {
  // Gọi lại các props từ bên trên truyền xuống
  let { onHandleUpdate } = props;

  let stateRedux = useSelector((state) => state);
  let listDepartment = stateRedux.listDepartment;
  let listPosition = stateRedux.listPosition;

  // Khai báo State lưu trữ giá trị của các ô nhập liệu

  let [Fullname, SetFullname] = useState("");
  let [Department, SetDepartment] = useState("");
  let [Postion, SetPostion] = useState("");
  //  Lấy các State Redux
  // Lấy các State từ Redux
  let stateAccountUpdateInfoRedux = stateRedux.FormUpdate.accountUpdateInfo;
  // Gọi useEffect
  useEffect(() => {
    // Tìm depID
    let depId = listDepartment.find(
      (department) => department.name === stateAccountUpdateInfoRedux.department
    ).id;
    // Tìm posId
    let posId = listPosition.find(
      (position) => position.name === stateAccountUpdateInfoRedux.position
    ).id;
    SetFullname(stateAccountUpdateInfoRedux.fullname);
    SetDepartment(depId);
    SetPostion(posId);
  }, []);
  // Hàm xử lý khi click vào nút Create
  let handleUpdate = () => {
    let accountUpdate = {
      fullname: Fullname,
      departmentId: Department,
      positionId: Postion,
    };
    //
    // console.log("handleUpdate: ", accountUpdate);
    onHandleUpdate(accountUpdate);
  };

  // Hàm xử lý khi click vào nút Reset
  let handleReset = () => {
    // Set lại State các ô nhập liệu về ""
    SetFullname("");
  };
  // Hiển thị danh sách Department
  let departmentItem = listDepartment.map((department, index) => {
    return (
      <option value={department.id} key={index}>
        {department.name}
      </option>
    );
  });
  // Hiển thị danh sách Position
  let positionItem = listPosition.map((position, index) => {
    return (
      <option value={position.id} key={index}>
        {position.name}
      </option>
    );
  });
  //
  return (
    <Container>
      <Form>
        {/* Fullname */}
        <FormGroup>
          <Label for="Fullname">Fullname: </Label>
          <Input
            id="Fullname"
            placeholder="Input Fullname"
            type="text"
            name="Fullname"
            value={Fullname}
            onChange={(event) => {
              SetFullname(event.target.value);
            }}
          />
        </FormGroup>

        {/* Department */}
        <FormGroup>
          <Label for="Department">Select a Department: </Label>
          <Input
            id="Department"
            name="Department"
            type="select"
            value={Department}
            onChange={(event) => {
              SetDepartment(event.target.value);
            }}
          >
            {departmentItem}
          </Input>
        </FormGroup>

        {/* Postion */}
        <FormGroup>
          <Label for="Postion">Select a Postion: </Label>
          <Input
            id="Postion"
            name="Postion"
            type="select"
            value={Postion}
            onChange={(event) => {
              SetPostion(event.target.value);
            }}
          >
            {positionItem}
          </Input>
        </FormGroup>
      </Form>
      {/* Nút xử lý */}
      <Button color="primary" onClick={handleUpdate}>
        Update
      </Button>
      <Button color="danger" onClick={handleReset}>
        Reset
      </Button>
    </Container>
  );
}

export default UpdateForm;
