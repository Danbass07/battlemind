import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Router, Route, Link} from 'react-router-dom';
import Welcome from './components/Welcome';
import Players from './components/Players';
import Leagues from './components/Leagues';




if (document.getElementById('root')) {
    ReactDOM.render(

    <BrowserRouter>
        <div>
            <ul>
                <li>
                    <Link to="/">Welcome</Link>
                </li>
                <li>
                    <Link to="/new">New Player</Link>
                </li>
                <li>
                    <Link to="/players">Players Results</Link>
                </li>
                <li>
                    <Link to="/leagues">Leagues Results</Link>
                </li>
            </ul>
            <Switch>
                <Welcome />
                <Route exact path="/" component={Welcome}></Route>
                <Route exact path="/new" component={Welcome}></Route>
                <Route exact path="/players" component={Players}></Route>
                <Route exact path="/leagues" component={Leagues}></Route>
            </Switch>
        </div>
    </BrowserRouter>
    
    
    
    , document.getElementById('root'));
}