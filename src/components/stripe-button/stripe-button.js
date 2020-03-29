import React from "react";
import StripeCheckOut from "react-stripe-checkout";
import axios from 'axios';

const StripeButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_DVxvifujGG0sDo7VzREIUzsP";

  const onToken = token => {
      axios({
        url: 'payment',
        method: 'post',
        data:{
          amount: priceForStripe,
          token
        }
      }).then(response => {
        alert('Payment was successful')
        
      }).catch(error =>{
        console.log('Payment Error: ', JSON.parse(error));
        alert('There was and error with your payment. Please use the test credit card.')
      })
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
