import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AlcoolGasolina from './pages/AlcoolGasolina';
import QuantoIreiGastar from './pages/QuantoIreiGastar';
import MediaPorKm from './pages/MediaPorKm';
import ContribuirPreco from './pages/ContribuirPreco';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Sugestoes from './pages/Sugestoes';
import Posto from './pages/Posto';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/postos/:id" component={Posto} />
            <Route path="/alcool-gasolina" component={AlcoolGasolina} />
            <Route path="/quanto-irei-gastar" component={QuantoIreiGastar} />
            <Route path="/media-por-km" component={MediaPorKm} />
            <Route path="/contribuir-preco" component={ContribuirPreco} />
            <Route path="/sobre" component={Sobre} />
            <Route path="/sugestoes" component={Sugestoes} />
        </Switch>
    </BrowserRouter>
);

export default Routes;