// https://reactstrap.github.io/?path=/story/home-installation--page

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { generateId } from "../../../Utils/Helpers/generateId";
import { getNowDate } from "../../../Utils/Helpers/getNowDate";

function InputForm(props) {
  // Gọi lại các props từ bên trên truyền xuống
  let { onHandleCreateNewAccount } = props;

  let stateRedux = useSelector((state) => state);
  let listDepartment = stateRedux.listDepartment;
  let listPosition = stateRedux.listPosition;

  // Khai báo State lưu trữ giá trị của các ô nhập liệu
  let [Email, SetEmail] = useState("");
  let [Username, SetUsername] = useState("");
  let [Fullname, SetFullname] = useState("");
  let [Department, SetDepartment] = useState("");
  let [Postion, SetPostion] = useState("");
  // Hàm xử lý khi click vào nút Create
  let handleCreate = () => {
    let accountNew = {
      id: generateId(),
      email: Email,
      username: Username,
      fullname: Fullname,
      department: Department,
      position: Postion,
      createDate: getNowDate(),
    };
    // console.log("accountNew: ", accountNew);
    // Truyền Account cần tạo mới về AccountContainer xử lý
    onHandleCreateNewAccount(accountNew);
  };

  // Hàm xử lý khi click vào nút Reset
  let handleReset = () => {
    // Set lại State các ô nhập liệu về ""
    SetEmail("");
    SetUsername("");
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
  return (
    <Container>
      <Form>
        {/* Email */}
        <FormGroup>
          <Label for="Email">Email: </Label>
          <Input
            id="Email"
            placeholder="Input Email"
            type="email"
            name="Email"
            value={Email}
            onChange={(event) => {
              SetEmail(event.target.value);
            }}
          />
        </FormGroup>

        {/* Username */}
        <FormGroup>
          <Label for="Username">Username: </Label>
          <Input
            id="Username"
            placeholder="Input Username"
            type="text"
            name="Username"
            value={Username}
            onChange={(event) => {
              SetUsername(event.target.value);
            }}
          />
        </FormGroup>

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
      <Button color="primary" onClick={handleCreate}>
        Create
      </Button>
      <Button color="danger" onClick={handleReset}>
        Reset
      </Button>
    </Container>
  );
}

export default InputForm;
