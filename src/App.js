import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sale from './Views/Sale';
import AddProduct from './Views/AddProduct';
import AddTypeProduct from './Views/AddTypeProduct';
import AddTaxPercentageTypeProduct from './Views/AddTaxPercentageTypeProduct';
import Login from './Views/Login';

const App = () => {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/sale" element={<Sale />} />
        <Route path="/addProducts" element={<AddProduct />} />
        <Route path="/addTypeProduct" element={<AddTypeProduct />} />
        <Route path="/addTaxPercentageTypeProduct" element={<AddTaxPercentageTypeProduct />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
