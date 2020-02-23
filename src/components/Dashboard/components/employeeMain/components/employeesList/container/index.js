import EmployeeList from "../index.js";
import { connect } from "react-redux";
import { setSelectedEmployee } from "../../../../../container/actions";
const mapDispatchToProps = dispatch => ({
  setSelectedEmployee: (id, name) => {
    dispatch(setSelectedEmployee({ id, name }));
  }
});
export default connect(null, mapDispatchToProps)(EmployeeList);
