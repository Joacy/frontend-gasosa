import React, { useEffect } from 'react';
import { FiMenu } from 'react-icons/fi';

import Menu from '../Menu';

import './styles.css';

export default function Header () {
    function abreMenu () {
        localStorage.setItem('menuShow', 'true');
    }

    useEffect(() => {
        localStorage.setItem('menuShow', 'false');
    }, []);

    return (
        <>
            <header>
                {/* <button onClick={abreMenu} className="abre-menu">
                    <FiMenu size={20} />
                </button> */}
                <span>Gasosa!</span>
            </header>
            {/* <Menu /> */}
        </>
    );
}