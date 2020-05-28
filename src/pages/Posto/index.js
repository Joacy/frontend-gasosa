import React, { Component } from 'react';

import {
    Card,
    Dropdown,
} from 'react-bootstrap';

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
    FiCornerUpRight,
    FiMapPin,
    FiShare2,
    FiArrowLeft,
} from "react-icons/fi";

import shell from '../../assets/img/shell.png';
import menorPreco from '../../assets/img/menor-preco.png';
import petrobras from '../../assets/img/petrobras.png';
import ipiranga from '../../assets/img/ipiranga.jpg';
import outros from '../../assets/img/outros.jpg';

import Header from '../../components/Header';

import './styles.css';

import api from '../../services/api';

export default class Posto extends Component {
    state = {
        posto: {},
        combustiveisArray: [],
        distancia: 0,
        latitude: '',
        longitude: '',
    }

    async componentDidMount () {
        const { id } = this.props.match.params;
        console.log(id);

        try {
            const response = await api.get(`postos/${id}`);

            console.log(response.data);
            console.log(response.data.combustiveis);

            this.setState({ posto: response.data });
            this.setState({ combustiveisArray: response.data.combustiveis });
        } catch (error) {
            alert("Erro ao obter os dados");
        }
    }

    componentWillMount () {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                this.setState({ latitude: latitude });
                this.setState({ longitude: longitude });
            },
            (err) => {
                console.log(err);
            },
            {
                timeout: 30000,
            }
        );
    }

    handleDistance (lat1, lon1, lat2, lon2) {
        let R = 6371;
        let dLat = (lat2 - lat1) * (Math.PI / 180);
        let dLon = (lon2 - lon1) * (Math.PI / 180);

        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        let d = R * c

        return d;
    }

    render () {
        const { posto, combustiveisArray, distancia, latitude, longitude } = this.state;
        const { history } = this.props;

        return (
            <div className="box-posto">
                <Header />

                <FiArrowLeft size={20} onClick={() => history.goBack()} className="arrow-goback" />

                <Card>
                    <Card.Header>
                        <img
                            src={
                                (posto.bandeira === "shell" ? shell :
                                    (posto.bandeira === "menor") ? menorPreco :
                                        (posto.bandeira === "petrobras") ? petrobras :
                                            (posto.bandeira === "ipiranga") ? ipiranga : outros)
                            }
                            alt=""
                        />
                        <h3>{posto.nome}</h3>
                    </Card.Header>
                    <Card.Body>
                        <h4><FiMapPin size={16} /> {posto.endereco}</h4>

                        <h5>{posto.latitude !== null ? `Situado a ${this.handleDistance(latitude, longitude, posto.latitude, posto.longitude).toFixed(2)} Km do seu local` : ''}</h5>

                        <div className="acoes">
                            <a href={posto.url} target="_blank"><FiCornerUpRight size={14} /> <span>Ver no mapa</span></a>
                        </div>

                        <ul className="combustiveis">
                            {combustiveisArray.map(combustivel => (
                                <li key={combustivel.id}><span>{combustivel.tipo}</span> <span>{combustivel.valor}</span></li>
                            ))}
                        </ul>

                        <div id="compartilhar">
                            <span>Compartilhar via</span>
                            <ul className="media-share">
                                <li>
                                    <WhatsappShareButton
                                        url={
                                            `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n` +
                                            `No posto ${posto.nome} o` +
                                            combustiveisArray.map(combustivel => (
                                                " " + combustivel.tipo + " está " + combustivel.valor
                                            )) +
                                            `\n\nVocê pode se dirigir ao posto clicando no link: ${posto.url}`
                                        }
                                    >
                                        <FaWhatsapp size={16} />
                                    </WhatsappShareButton>
                                </li>

                                <li>
                                    <FacebookShareButton
                                        url="gasosaweb.herokuapp.com"
                                        quote={
                                            `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n` +
                                            `No posto ${posto.nome} o` +
                                            combustiveisArray.map(combustivel => (
                                                " " + combustivel.tipo + " está " + combustivel.valor
                                            )) +
                                            `\n\nVocê pode se dirigir ao posto clicando no link: ${posto.url}`
                                        }
                                    >
                                        <FaFacebookF size={16} />
                                    </FacebookShareButton>
                                </li>

                                <li>
                                    <TelegramShareButton
                                        url={
                                            `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n` +
                                            `No posto ${posto.nome} o` +
                                            combustiveisArray.map(combustivel => (
                                                " " + combustivel.tipo + " está " + combustivel.valor
                                            )) +
                                            `\n\nVocê pode se dirigir ao posto clicando no link: ${posto.url}`
                                        }
                                    >
                                        <FaTelegramPlane size={16} />
                                    </TelegramShareButton>
                                </li>

                                <li>
                                    <TwitterShareButton
                                        url="gasosaweb.herokuapp.com"
                                        title={
                                            `Compartilhe o Aplicativo Gasosa!\n\nhttps://gasosaweb.herokuapp.com/\n\n` +
                                            `No posto ${posto.nome} o` +
                                            combustiveisArray.map(combustivel => (
                                                " " + combustivel.tipo + " está " + combustivel.valor
                                            )) +
                                            `\n\nVocê pode se dirigir ao posto clicando no link: ${posto.url}`
                                        }
                                    >
                                        <FaTwitter size={16} />
                                    </TwitterShareButton>
                                </li>
                            </ul>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}