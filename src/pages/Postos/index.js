import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
    Card,
} from 'react-bootstrap';

import {
    FiMapPin,
} from "react-icons/fi";

import shell from '../../assets/img/shell.png';
import menorPreco from '../../assets/img/menor-preco.png';
import petrobras from '../../assets/img/petrobras.png';
import ipiranga from '../../assets/img/ipiranga.jpg';
import outros from '../../assets/img/outros.jpg';

import Header from '../../components/Header';

import './styles.css';

import api from '../../services/api';

export default function Postos () {
    const [postos, setPostos] = useState([]);
    const [query, setQuery] = useState('');

    async function getPostos () {
        try {
            const response = await api.get('postos');

            setPostos(response.data);

            console.log(response.data);
        } catch (error) {
            alert('Erro ao obter os dados');
        }
    }

    useEffect(() => {
        getPostos();
    }, []);

    return (
        <>
            <Header />

            <div className="box-postos">
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />

                {postos.map(posto =>
                    (query !== '' ? posto.nome.indexOf(query) !== -1 : posto.nome)
                    &&
                    (
                        <Card key={posto.id}>
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

                                <Link to={`/postos/${posto.id}`}>
                                    Ver posto
                        </Link>
                            </Card.Body>
                        </Card>
                    ))}
            </div>
        </>
    );
}