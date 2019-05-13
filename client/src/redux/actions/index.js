import axios from "axios";
import { FETCH_USER, FETCH_CREDITS, FETCH_SURVEY } from "./types";
import history from "../../history";
window.axios = axios;

export const fetchUser = () => async dispatch => {
  const response = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: response.data });
};

export const handleToken = token => async dispatch => {
  const response = await axios.post("/api/stripe", token);
  dispatch({
    type: FETCH_CREDITS,
    payload: response.data
  });
};
export const submitSurvey = formsValues => async dispatch => {
  const response = await axios.post("/api/survey", formsValues);
  dispatch({ type: FETCH_USER, payload: response.data });
  history.push("/surveys");
};
export const fetchSurvey = () => async dispatch => {
  const response = await axios.get("/api/survey");
  dispatch({
    type: FETCH_SURVEY,
    payload: response.data
  });
};
