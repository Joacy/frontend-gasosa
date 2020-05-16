import React, { useState } from 'react';

import Header from '../../components/Header';

import './styles.css';

export default function QuantoIreiGastar () {
    const [valorLitro, setValorLitro] = useState('');
    const [kmPercorrido, setKmPercorrido] = useState('');
    const [kmPorLitro, setKmPorLitro] = useState('');

    const [valor, setValor] = useState('');

    function handleCalculate (e) {
        e.preventDefault();

        setValor(((valorLitro * kmPercorrido) / kmPorLitro).toFixed(2));
    }

    return (
        <div className="box">
            <Header />
            <form onSubmit={handleCalculate}>
                <input
                    type="text"
                    value={valorLitro}
                    onChange={e => setValorLitro(e.target.value)}
                    placeholder="Valor do litro do combustível"
                    required
                />

                <input
                    type="text"
                    value={kmPercorrido}
                    onChange={e => setKmPercorrido(e.target.value)}
                    placeholder="Distância do trajeto (em Km)"
                    required
                />

                <input
                    type="text"
                    value={kmPorLitro}
                    onChange={e => setKmPorLitro(e.target.value)}
                    placeholder="Quilometragem média por litro"
                    required
                />

                <button type="submit">Calcular</button>
            </form>

            <div className="resultado">
                <span>Resultado</span>
                <p>
                    Você irá gastar R$ {valor}
                </p>
            </div>
        </div>
    );
}