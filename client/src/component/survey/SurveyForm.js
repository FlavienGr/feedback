import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
class SurveyForm extends Component {
  renderFields = () => {
    return (
      <div>
        <Field
          name="title"
          type="text"
          component={SurveyField}
          label="Survey Title"
        />
        <Field
          name="subject"
          type="text"
          component={SurveyField}
          label="Survey Line"
        />
        <Field
          name="body"
          type="text"
          component={SurveyField}
          label="Email Body"
        />
        <Field
          name="recipients"
          type="text"
          component={SurveyField}
          label="Recipient List"
        />
      </div>
    );
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <div>
            <Link to="/surveys" className="red btn-flat white-text">
              Cancel
            </Link>
            <button className="teal btn-flat right white-text">
              Next
              <i className="material-icons right">done</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = "title is required";
  }
  if (!values.subject) {
    errors.subject = "subject is required";
  }
  if (!values.body) {
    errors.body = "body is required";
  }

  errors.recipients = validateEmails(values.recipients);

  return errors;
};
export default compose(
  connect(),
  reduxForm({
    form: "Survey",
    validate,
    destroyOnUnmount: false
  })
)(SurveyForm);
