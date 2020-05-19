import React, { useState } from 'react';

import './styles.css';

import api from '../../services/api';

export default function Sugestoes () {
    const [sugestoes, setSugestoes] = useState('');

    async function handleSugestoes (e) {
        e.preventDefault();

        try {
            await api.post('/comentarios', {
                descricao: sugestoes,
            });
        } catch (error) {
            alert("Erro ao enviar as sugestões");
        }
        setSugestoes('');
    }

    return (
        <>
            <h4 className="titulo">
                Seu feedback é fundamental para a melhoria do "Gasosa!"
            </h4>

            <form onSubmit={handleSugestoes}>
                <textarea
                    value={sugestoes}
                    onChange={e => setSugestoes(e.target.value)}
                    rows="8"
                    required
                >
                </textarea>

                <button type="submit">Enviar</button>
            </form>
        </>
    )
};