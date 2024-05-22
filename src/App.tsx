import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { isAuthenticated } from './utils/auth';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home/Home';
import Heating from './pages/Heating/Heating';
import Windows from './pages/Windows/Windows';
import Humidity from './pages/Humidity/Humidity';
import Lighting from './pages/Lighting/Lighting';
import InformationHistory from './pages/InformationHistory/InformationHistory';
import Login from './pages/Login/Login';
import Led from './pages/LED/Led';

import './App.css';

interface RoutesWrapperProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  setIsLoginPage: (isLoginPage: boolean) => void;
}

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const [isLoginPage, setIsLoginPage] = useState(false);

  return (
    <Router>
      <RoutesWrapper toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} setIsLoginPage={setIsLoginPage} />
      {!isLoginPage && <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />}
      {!isLoginPage && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
    </Router>
  );
}

function RoutesWrapper({ toggleSidebar, isSidebarOpen, setIsLoginPage }: RoutesWrapperProps) {
  let location = useLocation();

  useEffect(() => {
    setIsLoginPage(location.pathname === '/login');
  }, [location, setIsLoginPage]);

  if (!isAuthenticated() && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated() && location.pathname === '/login') {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/heating' element={<Heating />} />
      <Route path='/login' element={<Login />} />
      <Route path='/lighting' element={<Lighting />} />
      <Route path='/humidity' element={<Humidity />} />
      <Route path='/information-history' element={<InformationHistory />} />
      <Route path='/windows' element={<Windows />} />
      <Route path='/led' element={<Led />} />
    </Routes>
  );
}

export default App;
