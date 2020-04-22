import { combineReducers } from "redux-immutable";
import dashboardReducer from "../components/Dashboard/container/reducer";
export default combineReducers({
  dashboard: dashboardReducer
});
