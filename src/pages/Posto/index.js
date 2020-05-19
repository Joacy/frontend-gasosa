import React, { Component } from 'react';

import { Card } from 'react-bootstrap';

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

    render () {
        const { posto, combustiveisArray, distancia } = this.state;
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

                        <ul className="combustiveis">
                            {combustiveisArray.map(combustivel => (
                                <li key={combustivel.id}><span>{combustivel.tipo}</span> <span>{combustivel.valor}</span></li>
                            ))}
                        </ul>

                        <h5>Situado a {distancia} Km do seu local</h5>

                        <div className="acoes">
                            <a href={posto.url} target="_blank"><FiCornerUpRight /> <span>Ver no mapa</span></a>
                            <button><FiShare2 /> <span>Compartilhar</span></button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}