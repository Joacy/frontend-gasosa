import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Postos from './pages/Postos';
import Posto from './pages/Posto';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/postos" component={Postos} />
            <Route exact path="/postos/:id" component={Posto} />
        </Switch>
    </BrowserRouter>
);

export default Routes;