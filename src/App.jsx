import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute.jsx';
import { AuthProvider } from './auth/AuthContext.jsx';

import LostPage from './pages/LostPage.jsx';
import Home from './pages/home/Home.jsx';
import About from './pages/home/About.jsx';
import PropertyList from './pages/properties/PropertyList.jsx';
import PropertyDetails from './pages/properties/PropertyDetails.jsx';
import Register from './pages/auth/Register.jsx';
import Login from './pages/auth/Login.jsx';
import Profile from './pages/profiles/Profile.jsx';
import MyBookings from './pages/bookings/MyBookings.jsx';
import Booking from './pages/bookings/Booking.jsx';
import LeaveReview from './pages/reviews/LeaveReview.jsx';
import MyReviews from './pages/reviews/MyReviews.jsx';
import CreateProperty from './pages/properties/CreateProperty.jsx';
import MyProperties from './pages/properties/MyProperties.jsx';
import EditProperty from './pages/properties/EditProperty.jsx';
import HostBookings from './pages/bookings/HostBookings.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import UsersManagement from './pages/admin/UsersManagement.jsx';
import UserDetailsAdmin from './pages/admin/UserDetailsAdmin.jsx';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="*" element={<LostPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
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
            <PrivateRoute allowedRoles={['GUEST']}>
              <MyBookings />
            </PrivateRoute>
          } />
          <Route path="/booking/:id" element={
            <PrivateRoute allowedRoles={['GUEST', 'HOST']}>
              <Booking />
            </PrivateRoute>
          } />
          <Route path="/property/:id/review" element={
            <PrivateRoute allowedRoles={['GUEST']}>
              <LeaveReview />
            </PrivateRoute>
          } />
          <Route path="/my-reviews" element={
            <PrivateRoute allowedRoles={['GUEST']}>
              <MyReviews />
            </PrivateRoute>
          } />
          <Route path="/property/create" element={
            <PrivateRoute allowedRoles={['HOST']}>
              <CreateProperty />
            </PrivateRoute>
          } />
          <Route path="/properties/list" element={
            <PrivateRoute allowedRoles={['HOST']}>
              <MyProperties />
            </PrivateRoute>
          } />
          <Route path="/properties/edit/:id" element={
            <PrivateRoute allowedRoles={['HOST']}>
              <EditProperty />
            </PrivateRoute>
          } />
          <Route path="/bookings/host" element={
            <PrivateRoute allowedRoles={['HOST']}>
              <HostBookings />
            </PrivateRoute>
          } />
          <Route path="/admin" element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </PrivateRoute>
          } />
          <Route path="/admin/users" element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <UsersManagement />
            </PrivateRoute>
          } />
          <Route path="/admin/users/:userId" element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <UserDetailsAdmin />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
