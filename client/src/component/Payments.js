import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { handleToken } from "../redux/actions";
class Payments extends Component {
  onToken = token => {
    console.log(token);
    this.props.handleToken(token);
  };
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500} // cents
        currency="USD"
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
        token={this.onToken} // submit callback
      >
        <button className="waves-effect waves-light btn black-text text-darken-1 lime lighten-5">
          ADD CREDITS
        </button>
      </StripeCheckout>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleToken: token => dispatch(handleToken(token))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Payments);
