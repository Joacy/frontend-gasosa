import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import gasosa from '../../assets/img/gasosa.jpg';

import api from '../../services/api';

export default function Login () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin (e) {
        e.preventDefault();

        try {
            await api.post('/login', {
                email,
                password,
            });
        } catch (error) {
            alert('Erro no login');
        }
    }

    return (
        <div className="box">
            <div className="logo">
                <img src={gasosa} alt="" />
            </div>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />

                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Senha"
                    required
                />

                <button type="submit">Entrar</button>

                <Link to="/registro">
                    Cadastre-se
                </Link>
            </form>
        </div>
    );
}