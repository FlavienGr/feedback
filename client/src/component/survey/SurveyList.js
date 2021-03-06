import React, { Component } from "react";
import { fetchSurvey } from "../../redux/actions";
import { connect } from "react-redux";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurvey();
  }
  renderSurvey = () => {
    return this.props.surveys.map(survey => {
      return (
        <div className="card blue-grey darken-1" key={survey._id}>
          <div className="card-content white-text">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a href="#!">Yes: {survey.yes}</a>
            <a href="#!">No: {survey.no}</a>
          </div>
        </div>
      );
    });
  };
  render() {
    return <div>{this.renderSurvey()}</div>;
  }
}
const mapStateToProps = state => ({
  surveys: state.surveys
});
const mapDispathToProps = dispatch => {
  return {
    fetchSurvey: () => dispatch(fetchSurvey())
  };
};
export default connect(
  mapStateToProps,
  mapDispathToProps
)(SurveyList);
