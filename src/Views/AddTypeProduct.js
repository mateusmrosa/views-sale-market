import React, { useState } from 'react';
import axios from 'axios';

const AddTypeProduct = () => {
  const [typeName, setTypeName] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleTypeNameChange = (event) => {
    setTypeName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newProductType = {
      name: typeName,
    };

    console.log(newProductType);

    try {
      const API_URL = 'http://localhost:8000'
      const response = await axios.post(API_URL + '/products_type', newProductType);
      console.log('Product type created successfully:', response.data);

      setTypeName('');
      setShowSuccessMessage(true); // Exibe a mensagem de sucesso

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error('Error creating product type:', error);
    }
  };

  return (
    <div className="container">
      <h1>Cadastro tipos de produto</h1>
      {showSuccessMessage && (
        <div className="alert alert-success mb-3">Tipo de produto cadastrado com sucesso!</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='mb-1'>Tipo Produto:</label>
          <input
            type="text"
            className="form-control mb-3"
            value={typeName}
            onChange={handleTypeNameChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </div>
  );
};

export default AddTypeProduct;
