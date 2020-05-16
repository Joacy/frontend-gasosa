import React, { useState } from 'react';

import Header from '../../components/Header';

import './styles.css';

export default function MediaPorKm () {
    const [kmPercorridos, setKmPercorridos] = useState('');
    const [qtdLitros, setQtdLitros] = useState('');

    const [kmPorLitro, setKmPorLitro] = useState('');

    function handleCalculate (e) {
        e.preventDefault();

        setKmPorLitro((kmPercorridos / qtdLitros).toFixed(2));

    }

    return (
        <div className="box">
            <Header />
            <form onSubmit={handleCalculate}>
                <input
                    type="text"
                    value={kmPercorridos}
                    onChange={e => setKmPercorridos(e.target.value)}
                    placeholder="Percorreu quantos Km?"
                    required
                />

                <input
                    type="text"
                    value={qtdLitros}
                    onChange={e => setQtdLitros(e.target.value)}
                    placeholder="Abasteceu quantos litros?"
                    required
                />

                <button type="submit">Calcular</button>
            </form>

            <div className="resultado">
                <span>Resultado</span>
                <p>
                    Foram percorridos {kmPorLitro} Km/litro
                </p>
            </div>
        </div>
    );
}