import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTaxPercentageTypeProduct = () => {
  const [taxName, setTaxName] = useState('');
  const [taxPercentage, setTaxPercentage] = useState('');
  const [productTypes, setProductTypes] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    loadProductTypes();
  }, []);

  const loadProductTypes = async () => {
    try {
      const API_URL = 'http://localhost:8000';
      const response = await axios.get(API_URL + '/products_type');
      const types = response.data;
      console.log(types);
      setProductTypes(types);
    } catch (error) {
      console.error('Error loading product types:', error);
    }
  };

  const handleTaxNameChange = (event) => {
    setTaxName(event.target.value);
  };

  const handleTaxPercentageChange = (event) => {
    setTaxPercentage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedType = productTypes.find((type) => type.name === taxName);
    console.log(selectedType)
    if (!selectedType) {
      console.error('Error: Invalid product type');
      return;
    }

    const newTax = {
      type_id: selectedType.id,
      percentage: parseFloat(taxPercentage),
    };
    console.log(newTax);

    try {
      const API_URL = 'http://localhost:8000';
      const response = await axios.post(API_URL + '/tax', newTax);
      console.log('Tax created successfully:', response.data);

      setTaxName('');
      setTaxPercentage('');

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error('Error creating tax:', error);
    }
  };

  return (
    <div className="container">
      <h1>Cadastro de imposto de tipos de produtos</h1>
      {showSuccessMessage && (
        <div className="alert alert-success mb-3">Imposto cadastrado com sucesso!</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='mb-1'>Tipos de Produtos:</label>
          <select
            className="form-control mb-3"
            value={taxName}
            onChange={handleTaxNameChange}
            required
          >
            <option value="">Selecione</option>
            {productTypes.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className='mb-1'>Imposto:</label>
          <input
            type="number"
            step="0.01"
            min={0.01}
            className="form-control mb-3"
            value={taxPercentage}
            onChange={handleTaxPercentageChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </div>
  );
};

export default AddTaxPercentageTypeProduct;
