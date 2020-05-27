import React from 'react';
import { Link } from 'react-router-dom';

import {
    Navbar,
    Container,
    Row,
} from "react-bootstrap";

import {
    FiMenu,
    FiSearch,
} from 'react-icons/fi';

import logo from '../../assets/img/logo.png';

import './styles.css';

export default function Header () {
    return (
        <Navbar fixed="top">
            <Container>
                <Row className="mx-auto">
                    <Navbar.Brand>
                        <Link to='/'>
                            <img src={logo} alt="Gasosa!" />
                        </Link>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="navegacao">
                        <FiMenu size={24} color="#330c2f" />
                    </Navbar.Toggle>

                    <Navbar.Collapse id="navegacao">
                        <ul>
                            <li>
                                <Link to='/postos'>
                                    <FiSearch /> <span>Postos</span>
                                </Link>
                            </li>
                        </ul>
                    </Navbar.Collapse>
                </Row>
            </Container>
        </Navbar>
    );
}