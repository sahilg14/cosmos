import EmployeeRecords from "../index.js";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  selectedEmployeeName: state.getIn(["dashboard", "selectedEmployeeName"]),
  selectedEmployeeId: state.getIn(["dashboard", "selectedEmployeeId"])
});

export default connect(mapStateToProps, null)(EmployeeRecords);
