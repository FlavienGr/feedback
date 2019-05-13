import React from "react";
import { connect } from "react-redux";
import { submitSurvey } from "../../redux/actions";

const SurveyFormReview = ({ onCancel, fields, submitSurvey }) => {
  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>
        <div>
          <label>Survey Title</label>
          <div>{fields.title}</div>
        </div>
        <div>
          <label>Survey Line</label>
          <div>{fields.subject}</div>
        </div>
        <div>
          <label>Survey Body</label>
          <div>{fields.body}</div>
        </div>
        <div>
          <label>Survey recipients</label>
          <div>{fields.recipients}</div>
        </div>
      </div>
      <div>
        <button
          onClick={() => onCancel()}
          className="orange lighten-3 btn-flat left white-text"
        >
          <i className="material-icons left">arrow_back</i>
          Back
        </button>
        <button
          onClick={() => submitSurvey(fields)}
          className="green btn-flat right white-text"
        >
          Submit
          <i className="material-icons right">email</i>
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    fields: state.form.Survey.values
  };
};
const mapDispatchToProps = dispatch => ({
  submitSurvey: formValues => dispatch(submitSurvey(formValues))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyFormReview);
