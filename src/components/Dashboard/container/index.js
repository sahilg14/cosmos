import Dashboard from "../index.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
const mapStateToProps = state => ({
  selectedEmployeeName: state.getIn(["dashboard", "selectedEmployeeName"]),
  selectedEmployeeId: state.getIn(["dashboard", "selectedEmployeeId"]),
  signedInUserName: state.getIn(["signIn", "signedInUserInfo", "email"])
});
export default withRouter(connect(mapStateToProps, null)(Dashboard));
