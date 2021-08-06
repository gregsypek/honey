/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51JL4VfG3f1SLopx1PFEzEXjf1pDNQ0ogHoLFzbcXAI82IWlibuuXzSKrvpgYiI6yYwTangKU9BnHVm4dN22SjdgB00T5lUTN2m'
);
export const bookHoney = async honeyId => {
  try {
    //1 Get checkout session from API

    const session = await axios(
      `https://127.0.0.1:3001/api/v1/bookings/checkout-session/${honeyId}`
    );

    console.log(session);
    //2 Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
