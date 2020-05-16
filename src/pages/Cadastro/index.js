import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import gasosa from '../../assets/img/gasosa.jpg';

import api from '../../services/api';

export default function Cadastro () {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    async function handleCadastro (e) {
        e.preventDefault();

        if (passwordConfirmation !== password) {
            alert("Senhas não conferem");
            return;
        }

        try {
            await api.post('/cadastro', {
                name,
                email,
                password,
            });
        } catch (error) {
            alert('Erro no cadastro');
        }
    }

    return (
        <div className="box">
            <div className="logoCadastro">
                <img src={gasosa} alt="" />
            </div>

            <form onSubmit={handleCadastro}>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Nome"
                    required
                />

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

                <input
                    type="password"
                    value={passwordConfirmation}
                    onChange={e => setPasswordConfirmation(e.target.value)}
                    placeholder="Confirme sua Senha"
                    required
                />

                <button type="submit">Cadastrar</button>

                <Link to="/">
                    Já tenho cadastro
                </Link>
            </form>
        </div>
    );
}