import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home.jsx';
import PropertyList from './pages/properties/PropertyList.jsx';
import PropertyDetails from './pages/properties/PropertyDetails.jsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<PropertyList />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
