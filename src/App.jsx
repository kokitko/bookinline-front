import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home.jsx';
import PropertyList from './pages/properties/PropertyList.jsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<PropertyList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
