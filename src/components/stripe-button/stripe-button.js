import React from "react";
import StripeCheckOut from "react-stripe-checkout";

const StripeButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "[YOUR_STRIPE_KEY]";

  const onToken = token => {
      console.log(token);
      alert('Payment Successful')
  }

  return (
    <StripeCheckOut
      label="Pay Now"
      name="E Commerce Site"
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeButton;
