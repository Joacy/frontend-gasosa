import React from 'react';

import Header from '../../components/Header';

import './styles.css';

export default function ContribuirPreco () {
    return (
        <div className="box">
            <Header />
            <p className="nome-posto">Posto Bahia</p>
            <form action={() => { }} className="form-contribuir">
                <span>Gasolina comum</span>
                <input type="text" name="gasolinaComum" id="gasolinaComum" pattern="[0-9]{1}\.[0-9]{3}" placeholder="" required />

                <span>Gasolina aditivada</span>
                <input type="text" name="gasolinaAditivada" id="gasolinaAditivada" pattern="[0-9]{1}\.[0-9]{3}" placeholder="" required />

                <span>Diesel comum (S500)</span>
                <input type="text" name="dieselComum" id="dieselComum" pattern="[0-9]{1}\.[0-9]{3}" placeholder="" required />

                <span>Diesel aditivado (S10)</span>
                <input type="text" name="dieselAditivado" id="dieselAditivado" pattern="[0-9]{1}\.[0-9]{3}" placeholder="" required />

                <span>Álcool</span>
                <input type="text" name="alcool" id="alcool" pattern="[0-9]{1}\.[0-9]{3}" placeholder="" required />

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}