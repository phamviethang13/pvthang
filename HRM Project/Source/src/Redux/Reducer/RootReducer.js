import { combineReducers } from "redux";
import AccountReducer from "./AccountReducer";
import DepartmentReducer from "./DepartmentReducer";
import FormReducer from "./FormReducer";
import FormUpdate from "./FormUpdateReducer";
import PositionReducer from "./PositionReducer";

const RootReducers = combineReducers({
  showForm: FormReducer,
  listAccount: AccountReducer,
  listDepartment: DepartmentReducer,
  listPosition: PositionReducer,
  FormUpdate: FormUpdate,
});

export default RootReducers;
