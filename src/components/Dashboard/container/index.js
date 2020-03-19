import Dashboard from "../index.js";
import { connect } from "react-redux";
const mapStateToProps = state => ({
  selectedEmployeeName: state.getIn(["dashboard", "selectedEmployeeName"]),
  selectedEmployeeId: state.getIn(["dashboard", "selectedEmployeeId"]),
  signedInUserName: state.getIn(["signIn", "signedInUserInfo", "email"])
});
export default connect(mapStateToProps, null)(Dashboard);
