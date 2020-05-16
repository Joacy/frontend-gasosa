import React, { useState } from 'react';

import Header from '../../components/Header';

import './styles.css';

export default function AlcoolGasolina () {
    const [valorLitroAlcool, setValorLitroAlcool] = useState('');
    const [valorLitroGasolina, setvalorLitroGasolina] = useState('');

    const [combustivel, setCombustivel] = useState('');

    function handleCalculate (e) {
        e.preventDefault();

        (parseFloat(valorLitroAlcool) / parseFloat(valorLitroGasolina) < .7 ? setCombustivel('Álcool') : setCombustivel('Gasolina'));
    }

    return (
        <div className="box">
            <Header />
            <form onSubmit={handleCalculate}>
                <input
                    type="text"
                    value={valorLitroAlcool}
                    onChange={e => setValorLitroAlcool(e.target.value)}
                    placeholder="Valor do litro do álcool"
                    required
                />

                <input
                    type="text"
                    value={valorLitroGasolina}
                    onChange={e => setvalorLitroGasolina(e.target.value)}
                    placeholder="Valor do litro da gasolina"
                    required
                />

                <button type="submit">Calcular</button>
            </form>

            <div className="resultado">
                <span>Resultado</span>
                <p>
                    Melhor abastecer com: {combustivel}
                </p>
            </div>
        </div>
    );
}