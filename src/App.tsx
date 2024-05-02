// App.js
import React from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="pt-20"> {/* Padding top by the height of the header */}
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
