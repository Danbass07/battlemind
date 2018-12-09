import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Router, Route, Link} from 'react-router-dom';
import Welcome from './containers/Welcome';
import Player from './components/Players/Player';
import Players from './components/Players/Players';
import Leagues from './components/Leagues/Leagues';
import League from './components/Leagues/League';
import Scoreboards from './components/Scoreboards/Scoreboards';
import Scoreboard from './components/Scoreboards/Scoreboard';
import Newleague from './components/Leagues/Newleague';
import Newplayer from './components/Players/Newplayer';
import Navigation from './components/Navigation/Navigation';
import "./index.css";

import Battlemind from './containers/Battlemind';


if (document.getElementById('root')) {
    ReactDOM.render(

    <BrowserRouter>
        <div >
            <Battlemind />
            {/* <Navigation />
           <div className="content">
            <Switch>
                
                <Route exact path="/" component={Welcome}></Route>
                <Route exact path="/newplayer" component={Newplayer}></Route>
                <Route exact path="/newleague" component={Newleague}></Route>
                <Route exact path="/newscoreboard" component={Newscoreboard}></Route>
                <Route exact path="/players/:id/edit" component={Player}></Route>
                <Route exact path="/leagues/:id/edit" component={League}></Route>
                <Route exact path="/scoreboards/:id/edit" component={Scoreboard}></Route>
                <Route exact path="/players" component={Players}></Route>
                <Route exact path="/leagues" component={Leagues}></Route>
                <Route exact path="/scoreboards" component={Scoreboards}></Route>
                
                <Welcome />
            </Switch> */}
            {/* </div> */}
        </div>
    </BrowserRouter>
    
    
    
    , document.getElementById('root'));
}