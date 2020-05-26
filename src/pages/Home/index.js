import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";

import {
    FaWhatsapp,
    FaFacebookF,
    FaTelegramPlane,
    FaTwitter,
} from "react-icons/fa";

import {
    Card,
    Tab,
    Nav,
    Modal,
    Dropdown,
} from 'react-bootstrap';

import {
    FiMapPin,
    FiArrowLeft,
    FiShare2,
    FiCornerUpRight,
} from "react-icons/fi";

import shell from '../../assets/img/shell.png';
import menorPreco from '../../assets/img/menor-preco.png';
import petrobras from '../../assets/img/petrobras.png';
import ipiranga from '../../assets/img/ipiranga.jpg';
import outros from '../../assets/img/outros.jpg';

import Header from '../../components/Header';
import AlcoolGasolina from '../../components/AlcoolGasolina';
import MediaPorKm from '../../components/MediaPorKm';
import QuantoIreiGastar from '../../components/QuantoIreiGastar';
import Sobre from '../../components/Sobre';
import Sugestoes from '../../components/Sugestoes';


import './styles.css';

import api from '../../services/api';

function ModalAlcoolGasolina (props) {
    return (
        <Modal {...props}>
            <Modal.Header></Modal.Header>

            <Modal.Body>
                <AlcoolGasolina />
                <FiArrowLeft size={20} onClick={props.onHide} />
            </Modal.Body>

            <Modal.Footer></Modal.Footer>
        </Modal>
    );
}

function ModalMediaPorKm (props) {
    return (
        <Modal {...props}>
            <Modal.Header></Modal.Header>

            <Modal.Body>
                <MediaPorKm />
                <FiArrowLeft size={20} onClick={props.onHide} />
            </Modal.Body>

            <Modal.Footer></Modal.Footer>
        </Modal>
    );
}

function ModalQuantoIreiGastar (props) {
    return (
        <Modal {...props}>
            <Modal.Header></Modal.Header>

            <Modal.Body>
                <QuantoIreiGastar />
                <FiArrowLeft size={20} onClick={props.onHide} />
            </Modal.Body>

            <Modal.Footer></Modal.Footer>
        </Modal>
    );
}

function ModalSobre (props) {
    return (
        <Modal {...props}>
            <Modal.Header></Modal.Header>

            <Modal.Body>
                <Sobre />
                <FiArrowLeft size={20} onClick={props.onHide} />
            </Modal.Body>

            <Modal.Footer></Modal.Footer>
        </Modal>
    );
}

function ModalSugestoes (props) {
    return (
        <Modal {...props}>
            <Modal.Header></Modal.Header>

            <Modal.Body>
                <Sugestoes />
                <FiArrowLeft size={20} onClick={props.onHide} />
            </Modal.Body>

            <Modal.Footer></Modal.Footer>
        </Modal>
    );
}

export default function Home () {
    const [combustiveis, setCombustiveis] = useState([]);
    const [gasolinas, setGasolinas] = useState([]);
    const [etanols, setEtanols] = useState([]);
    const [gnvs, setGnvs] = useState([]);
    const [diesels, setDiesels] = useState([]);

    const [distancia, setDistancia] = useState('');

    const [modalAlcoolGasolinaShow, setModalAlcoolGasolinaShow] = useState(false);
    const [modalMediaPorKmShow, setModalMediaPorKmShow] = useState(false);
    const [modalQuantoIreiGastarShow, setModalQuantoIreiGastarShow] = useState(false);
    const [modalSobreShow, setModalSobreShow] = useState(false);
    const [modalSugestoesShow, setModalSugestoesShow] = useState(false);

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setLatitude(latitude);
                setLongitude(longitude);
            },
            (err) => {
                console.log(err);
            },
            {
                timeout: 30000,
            }
        )
    }, []);

    async function getCombustiveis () {
        try {
            const response = await api.get('combustiveis');

            setCombustiveis(response.data);

            console.log(response.data);
        } catch (error) {
            alert('Erro ao obter os dados');
        }
    }

    function maior (a, b) {
        return a.valor < b.valor;
    }

    useEffect(() => {
        getCombustiveis();
    }, []);

    function handleDistance (lat1, lon1, lat2, lon2) {
        let R = 6371;
        let dLat = (lat2 - lat1) * (Math.PI / 180);
        let dLon = (lon2 - lon1) * (Math.PI / 180);

        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        let d = R * c

        return d;
    }

    return (
        <div className="box-home">
            <Header />

            <Tab.Container defaultActiveKey="gasolina">
                <Tab.Content>
                    <Tab.Pane eventKey="gasolina">
                        <Tab.Container defaultActiveKey="comum">
                            <Nav className="tipo-gasolina" variant="pills">
                                <Nav.Item>
                                    <Nav.Link eventKey="comum">
                                        <span>Comum</span>
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link eventKey="aditivada">
                                        <span>Aditivada</span>
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>

                            <Tab.Content>
                                <Tab.Pane eventKey="comum">
                                    {combustiveis.map(combustivel =>
                                        (combustivel.tipo.indexOf("GASOLINA COMUM") !== -1)
                                        &&
                                        (
                                            <Card key={combustivel.id}>
                                                <Card.Header>
                                                    <img
                                                        src={
                                                            (combustivel.postos.bandeira === "shell" ? shell :
                                                                (combustivel.postos.bandeira === "menor") ? menorPreco :
                                                                    (combustivel.postos.bandeira === "petrobras") ? petrobras :
                                                                        (combustivel.postos.bandeira === "ipiranga") ? ipiranga : outros)
                                                        }
                                                        alt=""
                                                    />
                                                    <h3>{combustivel.postos.nome}</h3>

                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="success">
                                                            <FiShare2 size={20} />
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item>
                                                                <WhatsappShareButton
                                                                    url={
                                                                        `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n${combustivel.tipo} no ${combustivel.postos.nome} está ${combustivel.valor}, atualizado em ${combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}\n\nVocê pode se dirigir ao posto clicando no link: ${combustivel.postos.url}`
                                                                    }
                                                                >
                                                                    <FaWhatsapp size={20} />
                                                                </WhatsappShareButton>
                                                            </Dropdown.Item>

                                                            <Dropdown.Item>
                                                                <FacebookShareButton
                                                                    url="gasosaweb.herokuapp.com"
                                                                    quote={
                                                                        `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n${combustivel.tipo} no ${combustivel.postos.nome} está ${combustivel.valor}, atualizado em ${combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}\n\nVocê pode se dirigir ao posto clicando no link: ${combustivel.postos.url}`
                                                                    }
                                                                >
                                                                    <FaFacebookF size={20} />
                                                                </FacebookShareButton>
                                                            </Dropdown.Item>

                                                            <Dropdown.Item>
                                                                <TelegramShareButton
                                                                    url={
                                                                        `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n${combustivel.tipo} no ${combustivel.postos.nome} está ${combustivel.valor}, atualizado em ${combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}\n\nVocê pode se dirigir ao posto clicando no link: ${combustivel.postos.url}`
                                                                    }
                                                                >
                                                                    <FaTelegramPlane size={20} />
                                                                </TelegramShareButton>
                                                            </Dropdown.Item>

                                                            <Dropdown.Item>
                                                                <TwitterShareButton
                                                                    url="gasosaweb.herokuapp.com"
                                                                    title={
                                                                        `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n${combustivel.tipo} no ${combustivel.postos.nome} está ${combustivel.valor}, atualizado em ${combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}\n\nVocê pode se dirigir ao posto clicando no link: ${combustivel.postos.url}`
                                                                    }
                                                                >
                                                                    <FaTwitter size={20} />
                                                                </TwitterShareButton>
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Card.Header>

                                                <Card.Body>
                                                    <h4><FiMapPin size={16} /> {combustivel.postos.endereco}</h4>

                                                    <ul className="informacoes">
                                                        <li>
                                                            <div className="combustiveis">
                                                                <h3>{combustivel.valor}</h3>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <h4>{combustivel.postos.latitude !== null ? `a ${handleDistance(latitude, longitude, combustivel.postos.latitude, combustivel.postos.longitude).toFixed(2)} Km` : ''}</h4>
                                                        </li>

                                                        <li>
                                                            <a href={combustivel.postos.url} target="_blank"><FiCornerUpRight size={15} /> <span>Ver no mapa</span></a>
                                                        </li>
                                                    </ul>

                                                    <h6>Atualizado em: {combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}</h6>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                </Tab.Pane>

                                <Tab.Pane eventKey="aditivada">
                                    {combustiveis.map(combustivel =>
                                        (combustivel.tipo.indexOf("GASOLINA ADITIVADA") !== -1)
                                        &&
                                        (
                                            <Card key={combustivel.id}>
                                                <Card.Header>
                                                    <img
                                                        src={
                                                            (combustivel.postos.bandeira === "shell" ? shell :
                                                                (combustivel.postos.bandeira === "menor") ? menorPreco :
                                                                    (combustivel.postos.bandeira === "petrobras") ? petrobras :
                                                                        (combustivel.postos.bandeira === "ipiranga") ? ipiranga : outros)
                                                        }
                                                        alt=""
                                                    />
                                                    <h3>{combustivel.postos.nome}</h3>

                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="success">
                                                            <FiShare2 size={20} />
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item>
                                                                <WhatsappShareButton
                                                                    url={
                                                                        `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n${combustivel.tipo} no ${combustivel.postos.nome} está ${combustivel.valor}, atualizado em ${combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}\n\nVocê pode se dirigir ao posto clicando no link: ${combustivel.postos.url}`
                                                                    }
                                                                >
                                                                    <FaWhatsapp size={20} />
                                                                </WhatsappShareButton>
                                                            </Dropdown.Item>

                                                            <Dropdown.Item>
                                                                <FacebookShareButton
                                                                    url="gasosaweb.herokuapp.com"
                                                                    quote={
                                                                        `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n${combustivel.tipo} no ${combustivel.postos.nome} está ${combustivel.valor}, atualizado em ${combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}\n\nVocê pode se dirigir ao posto clicando no link: ${combustivel.postos.url}`
                                                                    }
                                                                >
                                                                    <FaFacebookF size={20} />
                                                                </FacebookShareButton>
                                                            </Dropdown.Item>

                                                            <Dropdown.Item>
                                                                <TelegramShareButton
                                                                    url={
                                                                        `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n${combustivel.tipo} no ${combustivel.postos.nome} está ${combustivel.valor}, atualizado em ${combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}\n\nVocê pode se dirigir ao posto clicando no link: ${combustivel.postos.url}`
                                                                    }
                                                                >
                                                                    <FaTelegramPlane size={20} />
                                                                </TelegramShareButton>
                                                            </Dropdown.Item>

                                                            <Dropdown.Item>
                                                                <TwitterShareButton
                                                                    url="gasosaweb.herokuapp.com"
                                                                    title={
                                                                        `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n${combustivel.tipo} no ${combustivel.postos.nome} está ${combustivel.valor}, atualizado em ${combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}\n\nVocê pode se dirigir ao posto clicando no link: ${combustivel.postos.url}`
                                                                    }
                                                                >
                                                                    <FaTwitter size={20} />
                                                                </TwitterShareButton>
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Card.Header>

                                                <Card.Body>
                                                    <h4><FiMapPin size={16} /> {combustivel.postos.endereco}</h4>

                                                    <ul className="informacoes">
                                                        <li>
                                                            <div className="combustiveis">
                                                                <h3>{combustivel.valor}</h3>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <h4>{combustivel.postos.latitude !== null ? `a ${handleDistance(latitude, longitude, combustivel.postos.latitude, combustivel.postos.longitude).toFixed(2)} Km` : ''}</h4>
                                                        </li>

                                                        <li>
                                                            <a href={combustivel.postos.url} target="_blank"><FiCornerUpRight size={15} /> <span>Ver no mapa</span></a>
                                                        </li>
                                                    </ul>

                                                    <h6>Atualizado em: {combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}</h6>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Tab.Pane>

                    <Tab.Pane eventKey="alcool">
                        {combustiveis.map(combustivel =>
                            (combustivel.tipo.indexOf("ETANOL") !== -1)
                            &&
                            (
                                <Card key={combustivel.id}>
                                    <Card.Header>
                                        <img
                                            src={
                                                (combustivel.postos.bandeira === "shell" ? shell :
                                                    (combustivel.postos.bandeira === "menor") ? menorPreco :
                                                        (combustivel.postos.bandeira === "petrobras") ? petrobras :
                                                            (combustivel.postos.bandeira === "ipiranga") ? ipiranga : outros)
                                            }
                                            alt=""
                                        />
                                        <h3>{combustivel.postos.nome}</h3>

                                        <Dropdown>
                                            <Dropdown.Toggle variant="success">
                                                <FiShare2 size={20} />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    <WhatsappShareButton
                                                        url={
                                                            `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n${combustivel.tipo} no ${combustivel.postos.nome} está ${combustivel.valor}, atualizado em ${combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}\n\nVocê pode se dirigir ao posto clicando no link: ${combustivel.postos.url}`
                                                        }
                                                    >
                                                        <FaWhatsapp size={20} />
                                                    </WhatsappShareButton>
                                                </Dropdown.Item>

                                                <Dropdown.Item>
                                                    <FacebookShareButton
                                                        url="gasosaweb.herokuapp.com"
                                                        quote={
                                                            `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n${combustivel.tipo} no ${combustivel.postos.nome} está ${combustivel.valor}, atualizado em ${combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}\n\nVocê pode se dirigir ao posto clicando no link: ${combustivel.postos.url}`
                                                        }
                                                    >
                                                        <FaFacebookF size={20} />
                                                    </FacebookShareButton>
                                                </Dropdown.Item>

                                                <Dropdown.Item>
                                                    <TelegramShareButton
                                                        url={
                                                            `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n${combustivel.tipo} no ${combustivel.postos.nome} está ${combustivel.valor}, atualizado em ${combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}\n\nVocê pode se dirigir ao posto clicando no link: ${combustivel.postos.url}`
                                                        }
                                                    >
                                                        <FaTelegramPlane size={20} />
                                                    </TelegramShareButton>
                                                </Dropdown.Item>

                                                <Dropdown.Item>
                                                    <TwitterShareButton
                                                        url="gasosaweb.herokuapp.com"
                                                        title={
                                                            `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n${combustivel.tipo} no ${combustivel.postos.nome} está ${combustivel.valor}, atualizado em ${combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}\n\nVocê pode se dirigir ao posto clicando no link: ${combustivel.postos.url}`
                                                        }
                                                    >
                                                        <FaTwitter size={20} />
                                                    </TwitterShareButton>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Card.Header>

                                    <Card.Body>
                                        <h4><FiMapPin size={16} /> {combustivel.postos.endereco}</h4>

                                        <ul className="informacoes">
                                            <li>
                                                <div className="combustiveis">
                                                    <h3>{combustivel.valor}</h3>
                                                </div>
                                            </li>

                                            <li>
                                                <h4>{combustivel.postos.latitude !== null ? `a ${handleDistance(latitude, longitude, combustivel.postos.latitude, combustivel.postos.longitude).toFixed(2)} Km` : ''}</h4>
                                            </li>

                                            <li>
                                                <a href={combustivel.postos.url} target="_blank"><FiCornerUpRight size={15} /> <span>Ver no mapa</span></a>
                                            </li>
                                        </ul>

                                        <h6>Atualizado em: {combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}</h6>
                                    </Card.Body>
                                </Card>
                            ))}
                    </Tab.Pane>

                    <Tab.Pane eventKey="diesel">
                        {combustiveis.map(combustivel =>
                            (combustivel.tipo.indexOf("DIESEL") !== -1)
                            &&
                            (
                                <Card key={combustivel.id}>
                                    <Card.Header>
                                        <img
                                            src={
                                                (combustivel.postos.bandeira === "shell" ? shell :
                                                    (combustivel.postos.bandeira === "menor") ? menorPreco :
                                                        (combustivel.postos.bandeira === "petrobras") ? petrobras :
                                                            (combustivel.postos.bandeira === "ipiranga") ? ipiranga : outros)
                                            }
                                            alt=""
                                        />
                                        <h3>{combustivel.postos.nome}</h3>

                                        <Dropdown>
                                            <Dropdown.Toggle variant="success">
                                                <FiShare2 size={20} />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    <WhatsappShareButton
                                                        url={
                                                            `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n${combustivel.tipo} no ${combustivel.postos.nome} está ${combustivel.valor}, atualizado em ${combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}\n\nVocê pode se dirigir ao posto clicando no link: ${combustivel.postos.url}`
                                                        }
                                                    >
                                                        <FaWhatsapp size={20} />
                                                    </WhatsappShareButton>
                                                </Dropdown.Item>

                                                <Dropdown.Item>
                                                    <FacebookShareButton
                                                        url="gasosaweb.herokuapp.com"
                                                        quote={
                                                            `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n${combustivel.tipo} no ${combustivel.postos.nome} está ${combustivel.valor}, atualizado em ${combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}\n\nVocê pode se dirigir ao posto clicando no link: ${combustivel.postos.url}`
                                                        }
                                                    >
                                                        <FaFacebookF size={20} />
                                                    </FacebookShareButton>
                                                </Dropdown.Item>

                                                <Dropdown.Item>
                                                    <TelegramShareButton
                                                        url={
                                                            `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n${combustivel.tipo} no ${combustivel.postos.nome} está ${combustivel.valor}, atualizado em ${combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}\n\nVocê pode se dirigir ao posto clicando no link: ${combustivel.postos.url}`
                                                        }
                                                    >
                                                        <FaTelegramPlane size={20} />
                                                    </TelegramShareButton>
                                                </Dropdown.Item>

                                                <Dropdown.Item>
                                                    <TwitterShareButton
                                                        url="gasosaweb.herokuapp.com"
                                                        title={
                                                            `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n${combustivel.tipo} no ${combustivel.postos.nome} está ${combustivel.valor}, atualizado em ${combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}\n\nVocê pode se dirigir ao posto clicando no link: ${combustivel.postos.url}`
                                                        }
                                                    >
                                                        <FaTwitter size={20} />
                                                    </TwitterShareButton>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Card.Header>

                                    <Card.Body>
                                        <h4><FiMapPin size={16} /> {combustivel.postos.endereco}</h4>

                                        <ul className="informacoes">
                                            <li>
                                                <div className="combustiveis">
                                                    <h3>{combustivel.valor}</h3>
                                                </div>
                                            </li>

                                            <li>
                                                <h4>{combustivel.postos.latitude !== null ? `a ${handleDistance(latitude, longitude, combustivel.postos.latitude, combustivel.postos.longitude).toFixed(2)} Km` : ''}</h4>
                                            </li>

                                            <li>
                                                <a href={combustivel.postos.url} target="_blank"><FiCornerUpRight size={15} /> <span>Ver no mapa</span></a>
                                            </li>
                                        </ul>

                                        <h6>Atualizado em: {combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}</h6>
                                    </Card.Body>
                                </Card>
                            ))}
                    </Tab.Pane>

                    <Tab.Pane eventKey="gas">
                        {combustiveis.map(combustivel =>
                            (combustivel.tipo.indexOf("GNV") !== -1)
                            &&
                            (
                                <Card key={combustivel.id}>
                                    <Card.Header>
                                        <img
                                            src={
                                                (combustivel.postos.bandeira === "shell" ? shell :
                                                    (combustivel.postos.bandeira === "menor") ? menorPreco :
                                                        (combustivel.postos.bandeira === "petrobras") ? petrobras :
                                                            (combustivel.postos.bandeira === "ipiranga") ? ipiranga : outros)
                                            }
                                            alt=""
                                        />
                                        <h3>{combustivel.postos.nome}</h3>

                                        <Dropdown>
                                            <Dropdown.Toggle variant="success">
                                                <FiShare2 size={20} />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    <WhatsappShareButton
                                                        url={
                                                            `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n${combustivel.tipo} no ${combustivel.postos.nome} está ${combustivel.valor}, atualizado em ${combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}\n\nVocê pode se dirigir ao posto clicando no link: ${combustivel.postos.url}`
                                                        }
                                                    >
                                                        <FaWhatsapp size={20} />
                                                    </WhatsappShareButton>
                                                </Dropdown.Item>

                                                <Dropdown.Item>
                                                    <FacebookShareButton
                                                        url="gasosaweb.herokuapp.com"
                                                        quote={
                                                            `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n${combustivel.tipo} no ${combustivel.postos.nome} está ${combustivel.valor}, atualizado em ${combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}\n\nVocê pode se dirigir ao posto clicando no link: ${combustivel.postos.url}`
                                                        }
                                                    >
                                                        <FaFacebookF size={20} />
                                                    </FacebookShareButton>
                                                </Dropdown.Item>

                                                <Dropdown.Item>
                                                    <TelegramShareButton
                                                        url={
                                                            `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n${combustivel.tipo} no ${combustivel.postos.nome} está ${combustivel.valor}, atualizado em ${combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}\n\nVocê pode se dirigir ao posto clicando no link: ${combustivel.postos.url}`
                                                        }
                                                    >
                                                        <FaTelegramPlane size={20} />
                                                    </TelegramShareButton>
                                                </Dropdown.Item>

                                                <Dropdown.Item>
                                                    <TwitterShareButton
                                                        url="gasosaweb.herokuapp.com"
                                                        title={
                                                            `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n${combustivel.tipo} no ${combustivel.postos.nome} está ${combustivel.valor}, atualizado em ${combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}\n\nVocê pode se dirigir ao posto clicando no link: ${combustivel.postos.url}`
                                                        }
                                                    >
                                                        <FaTwitter size={20} />
                                                    </TwitterShareButton>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Card.Header>

                                    <Card.Body>
                                        <h4><FiMapPin size={16} /> {combustivel.postos.endereco}</h4>

                                        <ul className="informacoes">
                                            <li>
                                                <div className="combustiveis">
                                                    <h3>{combustivel.valor}</h3>
                                                </div>
                                            </li>

                                            <li>
                                                <h4>{combustivel.postos.latitude !== null ? `a ${handleDistance(latitude, longitude, combustivel.postos.latitude, combustivel.postos.longitude).toFixed(2)} Km` : ''}</h4>
                                            </li>

                                            <li>
                                                <a href={combustivel.postos.url} target="_blank"><FiCornerUpRight size={15} /> <span>Ver no mapa</span></a>
                                            </li>
                                        </ul>

                                        <h6>Atualizado em: {combustivel.updated_at.substr(0, 10).split('-').reverse().join('/')}</h6>
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
        </div >
    );
}