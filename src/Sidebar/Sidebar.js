import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar bg-dark ml-0" style={{ marginLeft: 0 }}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/sale" className="nav-link text-white">Vendas</Link>
        </li>
        <li className="nav-item">
          <Link to="/addProducts" className="nav-link text-white">Cadastrar Produto</Link>
        </li>
        <li className="nav-item">
          <Link to="/addTypeProduct" className="nav-link text-white">Cadastrar Tipos de Produto</Link>
        </li>
        <li className="nav-item">
          <Link to="/AddTaxPercentageTypeProduct" className="nav-link text-white">Cadastrar Imposto dos tipos de produtos</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
