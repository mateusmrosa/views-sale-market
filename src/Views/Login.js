import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [token, setToken] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            email,
            password
        };
        console.log(data);
        try {
            const API_URL = 'http://localhost:8000';
            const response = await axios.post(API_URL + '/login', data);
            if (response.data == "") {
                setShowErrorMessage(true);
                setTimeout(() => {
                    setShowErrorMessage(false);
                }, 2000);
                return;
            } else {
                const { token } = response.data;
                setToken(token);
                localStorage.setItem('token', token);
                setShowSuccessMessage(true);
            }
        } catch (error) {
            console.error('Erro de autenticação:', error);
        }
        setEmail('');
        setPassword('');

        window.location.href = "http://localhost:3000/sale";
    };

    return (
        <div className="container">
            <h1>Login</h1>
            {showSuccessMessage && (
                <div className="alert alert-success mb-3">Autenticado com sucesso!</div>
            )}
            {showErrorMessage && (
                <div className="alert alert-danger mb-3">Email ou senha inválidos</div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Senha:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Entrar</button>
            </form>
        </div>
    );
};

export default Login;
