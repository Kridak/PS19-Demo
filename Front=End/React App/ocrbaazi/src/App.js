import React from 'react';
import OCR from './OCR';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FieldExtraction from './FieldExtraction';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<OCR/>}></Route>
          <Route path="/FieldExtraction" element={<FieldExtraction/>}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;