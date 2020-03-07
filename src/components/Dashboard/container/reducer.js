import { fromJS } from "immutable";
import { SET_SELECTED_EMPLOYEE } from "./actions";
const initialState = fromJS({
  selectedEmployeeId: "default",
  selectedEmployeeName: "Default"
});
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_EMPLOYEE:
      return {
        ...state,
        selectedEmployeeId: action.data.id,
        selectedEmployeeName: action.data.name
      };
    default:
      return state;
  }
};
