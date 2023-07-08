import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TelaVendas = () => {
    const [produtos, setProdutos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [vendas, setVendas] = useState([]);
    const [totalCompra, setTotalCompra] = useState(0);
    const [totalImpostos, setTotalImpostos] = useState(0);

    useEffect(() => {
        carregarProdutos();
    }, []);

    const carregarProdutos = async () => {
        try {
            const API_URL = 'http://localhost:8000';
            const response = await axios.get(API_URL + '/products');
            const produtosCarregados = response.data;
            console.log(produtosCarregados);
            setProdutos(produtosCarregados);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    };

    const adicionarVenda = () => {
        if (produtoSelecionado) {
            const venda = {
                id: produtoSelecionado.id,
                nome: produtoSelecionado.name,
                valor: produtoSelecionado.price,
                quantidade: produtoSelecionado.quantidade,
                imposto: produtoSelecionado.imposto
            };
            const valorTotal = venda.valor * venda.quantidade;
            const impostoTotal = venda.imposto * venda.quantidade;
            setVendas([...vendas, venda]);
            setTotalCompra(totalCompra + valorTotal);
            setTotalImpostos(totalImpostos + impostoTotal);
            setProdutoSelecionado(null);
        }
    };

    const removerVenda = (venda) => {
        const valorTotal = venda.valor * venda.quantidade;
        const impostoTotal = venda.imposto * venda.quantidade;
        const vendasAtualizadas = vendas.filter((v) => v !== venda);
        setVendas(vendasAtualizadas);
        setTotalCompra(totalCompra - valorTotal);
        setTotalImpostos(totalImpostos - impostoTotal);
    };

    const handleProdutoSelecionado = (produto) => {
        setProdutoSelecionado(produto);
    };

    const formatarMoeda = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const handleQuantidadeChange = (event) => {
        const quantidade = parseInt(event.target.value, 10);
        setProdutoSelecionado({ ...produtoSelecionado, quantidade });
    };

    return (
        <div className="container">
            <h1>Vendas</h1>
            <div className="form-group mb-3">
                <label>Produtos:</label>
                <ul className="list-group">
                    {produtos.map((produto) => (
                        <li
                            key={produto.id}
                            className={`list-group-item ${produto === produtoSelecionado ? 'active' : ''}`}
                            onClick={() => handleProdutoSelecionado(produto)}
                            style={{ cursor: 'pointer' }}
                        >
                            {produto.name} - R${produto.price}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="form-group mb-3">
                <label>Quantidade:</label>
                <input
                    type="number"
                    className="form-control"
                    value={produtoSelecionado ? produtoSelecionado.quantidade : ''}
                    onChange={handleQuantidadeChange}
                    min="1"
                />
            </div>
            <div className='row'>
                <div className='col-md-3'>
                    <button
                        className="btn btn-success mb-3"
                        onClick={adicionarVenda}
                        disabled={!produtoSelecionado}
                    >+
                    </button>
                </div>
                <div className='col-md-3'>
                    <h6>Total da Compra: {formatarMoeda(totalCompra)}</h6> <h6>Total Impostos: {formatarMoeda(totalImpostos)}</h6>
                    
                </div>
            </div>


            {vendas.length === 0 && <p>Nenhum produto no carrinho.</p>}
            {vendas.map((venda, index) => (
                <div key={venda.id} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{venda.nome}</h5>
                        <p>Value: R${formatarMoeda(venda.valor)}</p>
                        <p>Quantidade {venda.quantidade}</p>
                        <p>Total: {formatarMoeda((venda.valor * venda.quantidade))}</p>
                        <p>Imposto: {(venda.imposto * venda.quantidade)}</p>
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => removerVenda(venda)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default TelaVendas;
