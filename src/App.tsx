import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Tabulation from './showcase/tabulation/Tabulation';
import Home from "./pages/Home";

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/"  element={<Home/>}/>
          <Route path="/tabulation" element={<Tabulation />} />
        </Routes>
      </Router>
  );
}

export default App;
