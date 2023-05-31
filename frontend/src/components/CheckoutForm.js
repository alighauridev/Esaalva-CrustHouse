import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import '../scss/checkout.scss';

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const handleSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
            setLoading(false);
        } else {
            const paymentIntentData = {
                payment_method: paymentMethod.id,
                amount: 1000, // Amount in cents
                currency: 'usd',
            };

            try {
                const response = await axios.post('/create-payment-intent', paymentIntentData);
                const clientSecret = response.data;

                const confirmPaymentResult = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id,
                });

                if (confirmPaymentResult.error) {
                    console.log('[error]', confirmPaymentResult.error);
                    setLoading(false);
                } else {
                    console.log('[Payment successful]');
                    setLoading(false);
                }
            } catch (error) {
                console.log('[error]', error);
                setLoading(false);
            }
        }
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     setLoading(true);

    //     if (!stripe || !elements) {
    //         return;
    //     }

    //     const cardElement = elements.getElement(CardElement);

    //     const billingDetails = {
    //         name,
    //         email,
    //         address: {
    //             line1: address,
    //         },
    //     };

    //     const { error, paymentMethod } = await stripe.createPaymentMethod({
    //         type: 'card',
    //         card: cardElement,
    //         billing_details: billingDetails,
    //     });

    //     // ...
    // };


    return (
        <form className="CheckoutForm" onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <label htmlFor="name">Full Name</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <label htmlFor="email">Email Address</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label htmlFor="address">Shipping Address</label>
            <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
            />

            <label htmlFor="card">Credit or Debit Card</label>
            <CardElement id="card" className="stripe-card-element" />

            <button type="submit" disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Pay'}
            </button>
        </form>
    );
};

export default CheckoutForm;


