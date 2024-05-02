import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';

import Home from './pages/Home/Home';
import Heating from './pages/Heating/Heating';
import Windows from './pages/Windows/Windows';
import Humidity from './pages/Humidity/Humidity';
import Lighting from './pages/Lighting/Lighting';
import InformationHistory from './pages/InformationHistory/InformationHistory';
import Login from './pages/Login/Login';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/heating' element={<Heating />} />
          <Route path='/login' element={<Login />} />
          <Route path='/lighting' element={<Lighting />} />
          <Route path='/humidity' element={<Humidity />} />
          <Route path='/information-history' element={<InformationHistory />} />
          <Route path='/windows' element={<Windows />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
