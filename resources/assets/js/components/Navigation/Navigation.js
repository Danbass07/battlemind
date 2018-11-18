import React, { Component } from 'react';
import { BrowserRouter, Switch, Router, Route, Link} from 'react-router-dom';
import './Navigation.css';


class Navigation extends Component {

    render() {
        return (
            <div className="container">
          
                <ul className="navigation top">
                    <li>
                        <Link to="/newplayer">New Player</Link>
                    </li>
                    <li>
                        <Link to="/newleague">New League</Link>
                    </li>
                    <li>
                        <Link to="/newscoreboard">New Scoreboard</Link>
                    </li>
                </ul>
                <ul className="navigation bottom">
                    <li>
                        <Link to="/players">Players Results</Link>
                    </li>
                    <li>
                        <Link to="/leagues">Leagues Results</Link>
                    </li>
                    <li>
                        <Link to="/scoreboards">Scoreboards List</Link>
                    </li>
                </ul> 
            </div>
        );
    }
}
export default Navigation
