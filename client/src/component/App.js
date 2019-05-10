import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";
import * as actions from "../redux/actions";
import history from "../history";
import Landing from "./Landing";
const Dashboard = () => <h2>dashboard</h2>;
const SurverNew = () => <h2>surveynew</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <Router history={history}>
          <div>
            <Header />
            <Route exact={true} path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurverNew} />
          </div>
        </Router>
      </div>
    );
  }
}
export default connect(
  null,
  actions
)(App);
