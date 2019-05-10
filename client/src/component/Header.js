import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";
import "./HeaderStyle.css";
class Header extends Component {
  renderButtons = () => {
    if (this.props.authenticated === null) {
      return;
    } else if (this.props.authenticated) {
      return [
        <li key="payment">
          <Payments />
        </li>,
        <li key="credits">Credit: {this.props.credits}</li>,
        <li key="logout">
          <a href="/api/logout">Logout</a>
        </li>
      ];
    }
    return (
      <li>
        <a href="/auth/google">Login</a>
      </li>
    );
  };
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            Feedback
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    credits: state.auth.credits
  };
};

export default connect(mapStateToProps)(Header);
