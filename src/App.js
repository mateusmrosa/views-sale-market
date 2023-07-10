import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Sale from './Views/Sale';
import AddProduct from './Views/AddProduct';
import AddTypeProduct from './Views/AddTypeProduct';
import AddTaxPercentageTypeProduct from './Views/AddTaxPercentageTypeProduct';

const App = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <Routes>
            <Route path="/" element={<Sale />} />
            <Route path="/addProducts" element={<AddProduct />} />
            <Route path="/addTypeProduct" element={<AddTypeProduct />} />
            <Route path="/addTaxPercentageTypeProduct" element={<AddTaxPercentageTypeProduct />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
