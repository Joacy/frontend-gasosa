import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Posto from './pages/Posto';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/postos/:id" component={Posto} />
        </Switch>
    </BrowserRouter>
);

export default Routes;