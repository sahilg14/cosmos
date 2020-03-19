import SignIn from "../index.js";
import { connect } from "react-redux";
import { setSignedInUserInfo } from "./actions";
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  setSignedInUserInfo: data => {
    dispatch(setSignedInUserInfo(data));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
