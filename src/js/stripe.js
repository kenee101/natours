import { showAlert } from './alerts.js';

const stripe = Stripe(
  'pk_test_51PS5JyGd4MXhJe2TJcyTlMiGUHmH3OvOPOm9pLuP4LcF2y8gyyZMLOvgosghcvO7ysCdOiraGcR2uQEUsCZOG9Ib001SGGNlEg',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from the API endpoint
    const session = await axios(
      `http://127.0.0.1:4000/api/v1/bookings/checkout-session/${tourId}`,
    );
    // console.log(session);
    // 2) Create checkout form + charge the credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    // console.log(error);
    showAlert('error', error);
  }
};
