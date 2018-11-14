import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Router, Route, Link} from 'react-router-dom';
import Welcome from './containers/Welcome';
import Player from './components/Player';
import Players from './components/Players';
import Leagues from './components/Leagues';
import League from './components/League';
import Newleague from './components/Newleague';
import Newplayer from './components/Newplayer';
import Newscoreboard from './components/Newscoreboard';



if (document.getElementById('root')) {
    ReactDOM.render(

    <BrowserRouter>
        <div>
            <ul>
                <li>
                    <Link to="/">Welcome</Link>
                </li>
                <li>
                    <Link to="/newplayer">New Player</Link>
                </li>
                <li>
                    <Link to="/newleague">New League</Link>
                </li>
                <li>
                    <Link to="/newscoreboard">New Scoreboard</Link>
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
                <Route exact path="/newplayer" component={Newplayer}></Route>
                <Route exact path="/newleague" component={Newleague}></Route>
                <Route exact path="/newscoreboard" component={Newscoreboard}></Route>
                <Route exact path="/players/:id/edit" component={Player}></Route>
                <Route exact path="/leagues/:id/edit" component={League}></Route>
                <Route exact path="/players" component={Players}></Route>
                <Route exact path="/leagues" component={Leagues}></Route>
                <Welcome />
            </Switch>
        </div>
    </BrowserRouter>
    
    
    
    , document.getElementById('root'));
}