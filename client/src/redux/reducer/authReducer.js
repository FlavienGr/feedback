import { FETCH_USER, FETCH_CREDITS } from "../actions/types";

const initialState = {
  authenticated: null,
  errorMessage: "",
  credits: 0
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return Object.assign({}, state, {
        authenticated: action.payload._id || false,
        credits: action.payload.credits
      });
    case FETCH_CREDITS:
      return Object.assign({}, state, { credits: action.payload.credits });
    default:
      return state;
  }
}
