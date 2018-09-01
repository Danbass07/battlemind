import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Router, Route, Link} from 'react-router-dom';
import Welcome from './components/Welcome';
import Player from './components/Player';
import Players from './components/Players';
import Leagues from './components/Leagues';
import Newplayer from './components/Newplayer';



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
                
                <Route exact path="/" component={Welcome}></Route>
                <Route exact path="/new" component={Newplayer}></Route>
                <Route exact path="/:id/edit" component={Player}></Route>
                <Route exact path="/players" component={Players}></Route>
                <Route exact path="/leagues" component={Leagues}></Route>
                <Welcome />
            </Switch>
        </div>
    </BrowserRouter>
    
    
    
    , document.getElementById('root'));
}