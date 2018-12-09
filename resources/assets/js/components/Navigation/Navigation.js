import React, { Component } from 'react';
// import { BrowserRouter, Switch, Router, Route, Link} from 'react-router-dom';
import './Navigation.css';


class Navigation extends Component {

    render() {
        return (
            <div>
                <div className="additionalStrip onTop">N E W</div>
                <ul className="navigation top">
                
                    <li>
                        <button onClick={(e) => this.props.button(e)} name="player" value="object">Player</button>
                    </li>
                    <li>
                        <button onClick={this.props.button} name="league" value="object">League</button>
                    </li>
                    <li>
                        <button onClick={this.props.button} name="scoreboard" value="object">Scoreboard</button>
                    </li>
                </ul>
                <ul className="navigation bottom">
                    <li>
                        <button onClick={this.props.button} name="new" value="action">New</button>
                    </li>
                    <li>
                        <button onClick={this.props.button} name="lists" value="action">Lists</button>
                    </li>
                    <li>
                        <button onClick={this.props.button} name="reset" value=" ">empty</button>
                    </li>
                </ul> 
                <div className="additionalStrip onBottom">L I S T S</div>


                {/* <div className="additionalStrip onTop">N E W</div>
                <ul className="navigation top">
                
                    <li>
                        <Link to="/newplayer">Player</Link>
                    </li>
                    <li>
                        <Link to="/newleague">League</Link>
                    </li>
                    <li>
                        <Link to="/newscoreboard">Scoreboard</Link>
                    </li>
                </ul>
                <ul className="navigation bottom">
                    <li>
                        <Link to="/players">Players</Link>
                    </li>
                    <li>
                        <Link to="/leagues">Leagues</Link>
                    </li>
                    <li>
                        <Link to="/scoreboards">Scoreboards</Link>
                    </li>
                </ul> 
                <div className="additionalStrip onBottom">L I S T S</div> */}
            </div>
        );
    }
}
export default Navigation
