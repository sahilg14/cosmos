import EmployeeRecords from "../index.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({});

export default withRouter(connect(mapStateToProps, null)(EmployeeRecords));
