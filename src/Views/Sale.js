import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageContent from './PageContent ';
import { isAuthenticated } from '../ProtectedRoute/ProtectedRoute';

const Sale = () => {
    const [products, setProducts] = useState([]);
    const [productSelected, setProductSelected] = useState(null);
    const [sales, setSales] = useState([]);
    const [totalBuy, setTotalBuy] = useState(0);
    const [totalTaxes, setTotalTaxes] = useState(0);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        loadProducts();
        isAuthenticated();
    }, []);

    const loadProducts = async () => {
        try {
            const API_URL = 'http://localhost:8000';
            const response = await axios.get(API_URL + '/products');
            const productsLoaded = response.data;
            console.log(productsLoaded);
            setProducts(productsLoaded);
        } catch (error) {
            console.error('Erro ao carregar products:', error);
        }
    };

    const addSale = () => {
        if (productSelected) {
            const sale = {
                product_id: productSelected.product_id,
                name: productSelected.product_name,
                value: productSelected.product_price,
                quantity: productSelected.quantity,
                tax: productSelected.prod_type_percentage,
                totalAmount: productSelected.product_price * productSelected.quantity,
            };
            const taxTotal = sale.tax * sale.quantity;
            setSales([...sales, sale]);
            setTotalBuy(totalBuy + sale.totalAmount);
            setTotalTaxes(totalTaxes + taxTotal);
            setProductSelected(null);
        }
    };

    const removeSale = (sale) => {
        const taxTotal = sale.tax * sale.quantity;
        const salesUpdated = sales.filter((v) => v !== sale);
        setSales(salesUpdated);
        setTotalBuy(totalBuy - sale.totalAmount);
        setTotalTaxes(totalTaxes - taxTotal);
    };

    const handleProdutoSelecionado = (product) => {
        setProductSelected(product);
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const handleQuantidadeChange = (event) => {
        const quantity = parseInt(event.target.value, 10);
        setProductSelected({ ...productSelected, quantity });
    };

    const finalizeSale = async () => {
        try {
            console.log(sales);
            console.log(totalBuy);
            const API_URL = 'http://localhost:8000';
            const response = await axios.post(API_URL + '/sales', sales);
            console.log('Venda finalizada:', response.data);
            setSales([]);
            setTotalBuy(0);
            setTotalTaxes(0);

            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        } catch (error) {
            console.error('Error when completing the sale:', error);
        }
    };
    return (
        <PageContent>
            <div className="container">
                <h1>Vendas</h1>
                {showSuccessMessage && (
                    <div className="alert alert-success mb-3">Produto cadastrado com sucesso!</div>
                )}
                <div className="form-group mb-3">
                    <label>Produtos:</label>
                    <ul className="list-group">
                        {products.map((product) => (
                            <li
                                key={product.product_id}
                                className={`list-group-item ${product === productSelected ? 'active' : ''}`}
                                onClick={() => handleProdutoSelecionado(product)}
                                style={{ cursor: 'pointer' }}
                            >
                                {product.product_name} - R${formatCurrency(product.product_price)} - <small><b>({product.prod_type_name})
                                    Imp: %{product.prod_type_percentage} </b></small>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="form-group mb-3">
                    <label>Quantidade:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={productSelected ? productSelected.quantity : ''}
                        onChange={handleQuantidadeChange}
                        min="1"
                        disabled={!productSelected}
                    />
                </div>
                <div className='row'>
                    <div className='col-3'>
                        <button
                            className="btn btn-success mb-3"
                            onClick={addSale}
                            disabled={!productSelected}
                        >+
                        </button>
                    </div>
                    <div className='col-md-3'>
                        <h6>Total Compra: {formatCurrency(totalBuy)}</h6> <h6>Total Impostos: {formatCurrency(totalTaxes)}</h6>
                    </div>
                    <div className='col-6'>
                        <button className="btn btn-success mb-3" onClick={finalizeSale}>Finalizar Venda</button>
                    </div>
                </div>


                {
                    sales.length === 0 &&
                    <div className='col-12'>
                        <div className='alert alert-info mb-3'>
                            Nenhum produto no carrinho.
                        </div>
                    </div>
                }
                {sales.map((sale, index) => (
                    <div key={sale.id} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{sale.name}</h5>
                            <p>Valor: R${sale.value}</p>
                            <p>Quantidade {sale.quantity}</p>
                            <p>Total: {formatCurrency((sale.value * sale.quantity))}</p>
                            <p>Imposto: {formatCurrency((sale.tax * sale.quantity))}</p>
                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => removeSale(sale)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}

            </div>
        </PageContent>
    );
};

export default Sale;
