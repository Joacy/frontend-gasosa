import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FiX } from 'react-icons/fi';

import './styles.css';

export default function Menu () {
    const history = useHistory();

    function handleAlcoolGasolina () {
        localStorage.setItem('menuShow', 'false');
        history.push('/alcool-gasolina');
    }

    function handleQuantoGastar () {
        localStorage.setItem('menuShow', 'false');
        history.push('/quanto-irei-gastar');
    }

    function handleMediaPorKm () {
        localStorage.setItem('menuShow', 'false');
        history.push('/media-por-km');
    }

    function handleSobre () {
        localStorage.setItem('menuShow', 'false');
        history.push('/sobre');
    }

    function handleSugestoes () {
        localStorage.setItem('menuShow', 'false');
        history.push('/sugestoes');
    }

    const [menuShow, setMenuShow] = useState();

    useEffect(() => {
        setMenuShow(localStorage.getItem('menuShow'));
    }, []);

    return (
        <div className={localStorage.getItem('menuShow') === 'true' ? "menu show" : "menu"}>
            <ul className="opcoes">
                <div className="topo">
                    <span>Menu</span>
                    <button
                        onClick={() => {
                            localStorage.setItem('menuShow', 'false');
                            setMenuShow('false');
                        }}
                    >
                        <FiX
                            size={20}
                        />
                    </button>
                </div>
                <li onClick={handleAlcoolGasolina}>Álcool x Gasolina</li>
                <li onClick={handleMediaPorKm}>Média por Km percorrido</li>
                <li onClick={handleQuantoGastar}>Quanto irei gastar?</li>
                <li onClick={handleSobre}>Sobre o aplicativo</li>
                <li onClick={handleSugestoes}>Sugestões, Bugs e Comentários</li>
            </ul>
        </div>
    );
}