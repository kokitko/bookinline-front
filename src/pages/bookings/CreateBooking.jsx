import react, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Header from '*/components/Header.jsx';
import Footer from '*/components/Footer.jsx';

function CreateBooking() {
  const { id } = useParams();

  return (
    <>
      <Header />
      
      <Footer />
    </>
  );
}

export default CreateBooking;