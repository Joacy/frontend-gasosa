import React, { Component } from 'react';

import { Card } from 'react-bootstrap';

import {
    FiCornerUpRight,
    FiMapPin,
    FiShare2,
} from "react-icons/fi";

import shell from '../../assets/img/shell.png';
import menorPreco from '../../assets/img/menor-preco.png';
import petrobras from '../../assets/img/petrobras.png';

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

        return (
            <div className="box-posto">
                <Header />

                <Card>
                    <Card.Header>
                        <img src={(posto.bandeira === "shell" ? shell : (posto.bandeira === "menor-preco") ? menorPreco : petrobras)} alt="" />
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
                            <button><FiCornerUpRight /> <span>Ver no mapa</span></button>
                            <button><FiShare2 /> <span>Compartilhar</span></button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}