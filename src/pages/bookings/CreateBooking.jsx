import { useParams } from 'react-router-dom';

import Header from '*/components/Header.jsx';
import CreateBookingForm from '*/components/booking/CreateBookingForm.jsx';
import Footer from '*/components/Footer.jsx';

function CreateBooking() {
  const { id } = useParams();

  return (
    <>
      <Header />
        <CreateBookingForm />
      <Footer />
    </>
  );
}

export default CreateBooking;