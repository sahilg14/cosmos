import { fromJS } from "immutable";
import { SET_SIGNED_IN_USER_INFO } from "./actions";
const initialState = fromJS({
  signedInUserInfo: {}
});
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SIGNED_IN_USER_INFO:
      return {
        ...state,
        signedInUserInfo: action.data
      };
    default:
      return state;
  }
};
