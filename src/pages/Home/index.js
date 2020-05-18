import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
    Card,
    Tab,
    Nav,
    Modal,
} from 'react-bootstrap';

import {
    FiMapPin,
} from "react-icons/fi";

import shell from '../../assets/img/shell.png';
import menorPreco from '../../assets/img/menor-preco.png';
import petrobras from '../../assets/img/petrobras.png';

import Header from '../../components/Header';
import AlcoolGasolina from '../../pages/AlcoolGasolina';
import MediaPorKm from '../../pages/MediaPorKm';
import QuantoIreiGastar from '../../pages/QuantoIreiGastar';
import Sobre from '../../pages/Sobre';
import Sugestoes from '../../pages/Sugestoes';


import './styles.css';

import api from '../../services/api';

function ModalAlcoolGasolina (props) {
    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AlcoolGasolina />
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}

function ModalMediaPorKm (props) {
    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MediaPorKm />
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}

function ModalQuantoIreiGastar (props) {
    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <QuantoIreiGastar />
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}

function ModalSobre (props) {
    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Sobre />
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}

function ModalSugestoes (props) {
    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Sugestoes />
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}

export default function Home () {
    const [postos, setPostos] = useState([]);
    const [distancia, setDistancia] = useState('');

    const [modalAlcoolGasolinaShow, setModalAlcoolGasolinaShow] = useState(false);
    const [modalMediaPorKmShow, setModalMediaPorKmShow] = useState(false);
    const [modalQuantoIreiGastarShow, setModalQuantoIreiGastarShow] = useState(false);
    const [modalSobreShow, setModalSobreShow] = useState(false);
    const [modalSugestoesShow, setModalSugestoesShow] = useState(false);

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
                            <li onClick={() => setModalAlcoolGasolinaShow(true)}>Álcool x Gasolina</li>
                            <ModalAlcoolGasolina animation={false} show={modalAlcoolGasolinaShow} onHide={() => setModalAlcoolGasolinaShow(false)} />

                            <li onClick={() => setModalMediaPorKmShow(true)}>Média por Km percorrido</li>
                            <ModalMediaPorKm animation={false} show={modalMediaPorKmShow} onHide={() => setModalMediaPorKmShow(false)} />

                            <li onClick={() => setModalQuantoIreiGastarShow(true)}>Quanto irei gastar?</li>
                            <ModalQuantoIreiGastar animation={false} show={modalQuantoIreiGastarShow} onHide={() => setModalQuantoIreiGastarShow(false)} />

                            <li onClick={() => setModalSobreShow(true)}>Sobre o aplicativo</li>
                            <ModalSobre animation={false} show={modalSobreShow} onHide={() => setModalSobreShow(false)} />

                            <li onClick={() => setModalSugestoesShow(true)}>Sugestões, Bugs e Comentários</li>
                            <ModalSugestoes animation={false} show={modalSugestoesShow} onHide={() => setModalSugestoesShow(false)} />
                        </ul>
                    </Tab.Pane>
                </Tab.Content>

                <Nav variant="pills">
                    <Nav.Item>
                        <Nav.Link
                            eventKey="gasolina"
                            onClick={() => {
                                setModalAlcoolGasolinaShow(false)
                                setModalMediaPorKmShow(false)
                                setModalQuantoIreiGastarShow(false)
                                setModalSobreShow(false)
                                setModalSugestoesShow(false)
                            }}
                        >
                            <span>Gasolina</span>
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link
                            eventKey="alcool"
                            onClick={() => {
                                setModalAlcoolGasolinaShow(false)
                                setModalMediaPorKmShow(false)
                                setModalQuantoIreiGastarShow(false)
                                setModalSobreShow(false)
                                setModalSugestoesShow(false)
                            }}
                        >
                            <span>Álcool</span>
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link
                            eventKey="diesel" onClick={() => {
                                setModalAlcoolGasolinaShow(false)
                                setModalMediaPorKmShow(false)
                                setModalQuantoIreiGastarShow(false)
                                setModalSobreShow(false)
                                setModalSugestoesShow(false)
                            }}
                        >
                            <span>Diesel</span>
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link
                            eventKey='gas'
                            onClick={() => {
                                setModalAlcoolGasolinaShow(false)
                                setModalMediaPorKmShow(false)
                                setModalQuantoIreiGastarShow(false)
                                setModalSobreShow(false)
                                setModalSugestoesShow(false)
                            }}
                        >
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