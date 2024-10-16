import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tabulation from './showcase/tabulation/Tabulation';
import Home from "./pages/Home";
import DragAndDrop from "./showcase/drag-and-drop/DragAndDrop";

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/"  element={<Home/>}/>
            <Route path="/tabulation" element={<Tabulation />} />
            <Route path="/drag-and-drop" element={<DragAndDrop />} />
        </Routes>
      </Router>
  );
}

export default App;
