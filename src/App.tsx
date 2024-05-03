import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

import Home from './pages/Home/Home';
import Heating from './pages/Heating/Heating';
import Windows from './pages/Windows/Windows';
import Humidity from './pages/Humidity/Humidity';
import Lighting from './pages/Lighting/Lighting';
import InformationHistory from './pages/InformationHistory/InformationHistory';
import Login from './pages/Login/Login';

import './App.css';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="App">
      <Router>  {/* Ensure the Router wraps all components using navigation */}
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}  />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/heating' element={<Heating />} />
          <Route path='/login' element={<Login />} />
          <Route path='/lighting' element={<Lighting />} />
          <Route path='/humidity' element={<Humidity />} />
          <Route path='/information-history' element={<InformationHistory />} />
          <Route path='/windows' element={<Windows />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
