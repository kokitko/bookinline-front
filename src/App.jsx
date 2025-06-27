import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home.jsx';
import PropertyList from './pages/properties/PropertyList.jsx';
import PropertyDetails from './pages/properties/PropertyDetails.jsx';
import CreateBooking from './pages/bookings/CreateBooking.jsx';
import Register from './pages/auth/Register.jsx';
import Login from './pages/auth/Login.jsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<PropertyList />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/property/:id/booking" element={<CreateBooking />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
