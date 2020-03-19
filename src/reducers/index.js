import { combineReducers } from "redux-immutable";
import dashboardReducer from "../components/Dashboard/container/reducer";
import signInReducer from "../components/SignIn/container/reducer";
export default combineReducers({
  dashboard: dashboardReducer,
  signIn: signInReducer
});
