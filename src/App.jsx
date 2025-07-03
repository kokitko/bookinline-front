import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute.jsx';
import { AuthProvider } from './auth/AuthContext.jsx';

import Home from './pages/home/Home.jsx';
import PropertyList from './pages/properties/PropertyList.jsx';
import PropertyDetails from './pages/properties/PropertyDetails.jsx';
import Register from './pages/auth/Register.jsx';
import Login from './pages/auth/Login.jsx';
import Profile from './pages/profiles/Profile.jsx';
import MyBookings from './pages/bookings/MyBookings.jsx';
import Booking from './pages/bookings/Booking.jsx';
import LeaveReview from './pages/reviews/LeaveReview.jsx';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<PropertyList />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/bookings" element={
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          } />
          <Route path="/booking/:id" element={
            <PrivateRoute>
              <Booking />
            </PrivateRoute>
          } />
          <Route path="/property/:id/review" element={
            <PrivateRoute>
              <LeaveReview />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
