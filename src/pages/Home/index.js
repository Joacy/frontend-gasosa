import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
    Card,
    Tab,
    Nav,
} from 'react-bootstrap';

import {
    FiMapPin,
} from "react-icons/fi";

import shell from '../../assets/img/shell.png';
import menorPreco from '../../assets/img/menor-preco.png';
import petrobras from '../../assets/img/petrobras.png';

import Header from '../../components/Header';

import './styles.css';

import api from '../../services/api';

export default function Home () {
    const [postos, setPostos] = useState([]);
    const [distancia, setDistancia] = useState('');

    async function getPostos () {
        try {
            const response = await api.get('postos');
            console.log(response.data);

            setPostos(response.data);
        } catch (error) {
            alert('Erro ao obter os dados');
        }
    }

    useEffect(() => {
        getPostos();
    }, []);

    function handleDistance () {
        setDistancia(0);
    }

    return (
        <div className="box-home">
            <Header />

            <Tab.Container defaultActiveKey="gasolina">
                <Tab.Content>
                    <Tab.Pane eventKey="gasolina">
                        {postos.map(posto =>
                            (posto.combustiveis.find(combustivel => (
                                (combustivel.tipo.indexOf("GASOLINA") !== -1)
                            )))
                            &&
                            (
                                <Card key={posto.id}>
                                    <Card.Header>
                                        <img src={(posto.bandeira === "shell" ? shell : (posto.bandeira === "menor-preco") ? menorPreco : petrobras)} alt="" />
                                        <h3>{posto.nome}</h3>
                                    </Card.Header>
                                    <Card.Body>
                                        <h4><FiMapPin size={16} /> {posto.endereco}</h4>

                                        <ul className="combustiveis">
                                            {posto.combustiveis.map(combustivel =>
                                                (combustivel.tipo.indexOf("GASOLINA") !== -1) && (
                                                    <li key={combustivel.id}><span>{combustivel.tipo}</span> <span>{combustivel.valor}</span></li>
                                                ))}
                                        </ul>

                                        <div className="links">
                                            <Link to={`/postos/${posto.id}`}>Acessar</Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                    </Tab.Pane>

                    <Tab.Pane eventKey="alcool">
                        {postos.map(posto =>
                            (posto.combustiveis.find(combustivel => (
                                (combustivel.tipo.indexOf("ETANOL") !== -1)
                            )))
                            &&
                            (
                                <Card key={posto.id}>
                                    <Card.Header>
                                        <img src={(posto.bandeira === "shell" ? shell : (posto.bandeira === "menor-preco") ? menorPreco : petrobras)} alt="" />
                                        <h3>{posto.nome}</h3>
                                    </Card.Header>
                                    <Card.Body>
                                        <h4><FiMapPin size={16} /> {posto.endereco}</h4>

                                        <ul className="combustiveis">
                                            {posto.combustiveis.map(combustivel =>
                                                (combustivel.tipo.indexOf("ETANOL") !== -1) && (
                                                    <li key={combustivel.id}><span>{combustivel.tipo}</span> <span>{combustivel.valor}</span></li>
                                                ))}
                                        </ul>

                                        <div className="links">
                                            <Link to={`/postos/${posto.id}`}>Acessar</Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                    </Tab.Pane>

                    <Tab.Pane eventKey="diesel">
                        {postos.map(posto =>
                            (posto.combustiveis.find(combustivel => (
                                (combustivel.tipo.indexOf("DIESEL") !== -1)
                            )))
                            &&
                            (
                                <Card key={posto.id}>
                                    <Card.Header>
                                        <img src={(posto.bandeira === "shell" ? shell : (posto.bandeira === "menor-preco") ? menorPreco : petrobras)} alt="" />
                                        <h3>{posto.nome}</h3>
                                    </Card.Header>
                                    <Card.Body>
                                        <h4><FiMapPin size={16} /> {posto.endereco}</h4>

                                        <ul className="combustiveis">
                                            {posto.combustiveis.map(combustivel =>
                                                (combustivel.tipo.indexOf("DIESEL") !== -1) && (
                                                    <li key={combustivel.id}><span>{combustivel.tipo}</span> <span>{combustivel.valor}</span></li>
                                                ))}
                                        </ul>

                                        <div className="links">
                                            <Link to={`/postos/${posto.id}`}>Acessar</Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                    </Tab.Pane>

                    <Tab.Pane eventKey="gas">
                        {postos.map(posto =>
                            (posto.combustiveis.find(combustivel => (
                                (combustivel.tipo.indexOf("GNV") !== -1)
                            )))
                            &&
                            (
                                <Card key={posto.id}>
                                    <Card.Header>
                                        <img src={(posto.bandeira === "shell" ? shell : (posto.bandeira === "menor-preco") ? menorPreco : petrobras)} alt="" />
                                        <h3>{posto.nome}</h3>
                                    </Card.Header>
                                    <Card.Body>
                                        <h4><FiMapPin size={16} /> {posto.endereco}</h4>

                                        <ul className="combustiveis">
                                            {posto.combustiveis.map(combustivel =>
                                                (combustivel.tipo.indexOf("GNV") !== -1) && (
                                                    <li key={combustivel.id}><span>{combustivel.tipo}</span> <span>{combustivel.valor}</span></li>
                                                ))}
                                        </ul>

                                        <div className="links">
                                            <Link to={`/postos/${posto.id}`}>Acessar</Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                    </Tab.Pane>

                    <Tab.Pane eventKey="menu">
                        <ul className="menu-opcoes">
                            <li onClick={() => { }}>Álcool x Gasolina</li>
                            <li onClick={() => { }}>Média por Km percorrido</li>
                            <li onClick={() => { }}>Quanto irei gastar?</li>
                            <li onClick={() => { }}>Sobre o aplicativo</li>
                            <li onClick={() => { }}>Sugestões, Bugs e Comentários</li>
                        </ul>
                    </Tab.Pane>
                </Tab.Content>

                <Nav variant="pills">
                    <Nav.Item>
                        <Nav.Link eventKey="gasolina">
                            <span>Gasolina</span>
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link eventKey="alcool">
                            <span>Álcool</span>
                        </Nav.Link>
                    </Nav.Item>
                    
                    <Nav.Item>
                        <Nav.Link eventKey="diesel">
                            <span>Diesel</span>
                        </Nav.Link>
                    </Nav.Item>
                    
                    <Nav.Item>
                        <Nav.Link eventKey='gas'>
                            <span>Gnv</span>
                        </Nav.Link>
                    </Nav.Item>
                    
                    <Nav.Item>
                        <Nav.Link eventKey="menu">
                            <span>Menu</span>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Tab.Container>
        </div>
    );
}