import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
    //stripe needs the price in cents
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51GuF60JbeFc6RpC6lSu0cYz9RvT3Jwi3THRV5z5JcW2iNlDaaVOg2n6gDB5oTONKtTDVjrUKDJ6CjRoaXc6jTtNH00Pia24dyf'

    //for backend processing
    const onToken = token => {
        console.log(token);
        alert('Payment Successfull')
    }

    return (
        <StripeCheckout
            label="Pay Now" 
            name="KentLogic Clothing"
            description={`Your total is P${price}`} 
            image="https://avatars1.githubusercontent.com/u/19375574?s=460&u=e28f6a8b5778fdd81d5a5083acd61b5b9802c8ab&v=4"
            panelLabel="Payment" 
            amount={priceForStripe} // cents
            currency="PHP"
            stripeKey={publishableKey}
            locale="auto"
            email="info@kentlogic.com"
            shippingAddress
            billingAddress
            zipCode={false}
            allowRememberMe 
            token={onToken}
            />
    )
}



export default StripeCheckoutButton;