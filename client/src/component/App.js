import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";
import * as actions from "../redux/actions";
import history from "../history";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "../component/survey/SurveyNew";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Router history={history}>
        <div className="container">
          <Header />
          <Route exact={true} path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </Router>
    );
  }
}
export default connect(
  null,
  actions
)(App);
