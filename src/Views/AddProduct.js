import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProducts = () => {
  const [productName, setProductName] = useState('');
  const [productValue, setProductValue] = useState('');
  const [productTypes, setProductTypes] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState('');
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

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductValueChange = (event) => {
    setProductValue(event.target.value);
  };

  const handleProductTypeChange = (event) => {
    setSelectedProductType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newProduct = {
      name: productName,
      price: productValue,
      type_id: selectedProductType
    };

    console.log(newProduct);

    try {
      const API_URL = 'http://localhost:8000';
      const response = await axios.post(API_URL + '/products', newProduct);
      console.log('Product created successfully:', response.data);

      setProductName('');
      setProductValue('');
      setSelectedProductType('');
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="container">
      <h1>Cadastro de Produtos</h1>
      {showSuccessMessage && (
        <div className="alert alert-success mb-3">Produto cadastrado com sucesso!</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='mb-1'>Produto:</label>
          <input
            type="text"
            className="form-control mb-3"
            value={productName}
            onChange={handleProductNameChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className='mb-1'>Valor:</label>
          <input
            type="text"
            className="form-control"
            value={productValue}
            onChange={handleProductValueChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className='mb-1'>Tipo do Produto:</label>
          <select
            className="form-control"
            value={selectedProductType}
            onChange={handleProductTypeChange}
            required
          >
            <option value="">Selecione</option>
            {productTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
