import React, { Component } from 'react';
// import { BrowserRouter, Switch, Router, Route, Link} from 'react-router-dom';



class Navigation extends Component {
 
    render() {
        return (
            <div>
   
                <div className="navigation top">
                    <div className="navigation-top-toprow">

                        <button className={this.props.action == 'new' ? "navButton active" : "navButton"} onClick={this.props.button} name="new" value="action">New</button>
                            
                        <button className={this.props.action == 'list' ? "navButton active" : "navButton"} onClick={this.props.button} name="list" value="action">Lists</button>
                        
                    </div>
                    <div className={this.props.action == 'new' || this.props.action == 'list' ? "navigation-top-bottomrow" : 'navigation-top-bottomrow-disable'}>
                        <button className={this.props.object == 'player' ? "navButton active" : "navButton"} onClick={(e) => this.props.button(e)} name="player" value="object">Player</button>
                    
                    
                        <button className={this.props.object == 'league' ? "navButton active" : "navButton"} onClick={this.props.button} name="league" value="object">League</button>
                    
                    
                        <button className={this.props.object == 'scoreboard' ? "navButton active" : "navButton"} onClick={this.props.button} name="scoreboard" value="object">Scoreboard</button>
                    </div>
                </div>
                <div className="navigation bottom">
                           
                    
                        <button className={this.props.action == 'event' ? "navButton active" : "navButton"} onClick={this.props.button} name="event" value="action">Event</button>
                    
                        <button className={this.props.action == 'results' ? "navButton active" : "navButton"} onClick={this.props.button} name="results" value="action">Results</button>

                        <button className={this.props.action == 'profile' ? "navButton active" : "navButton"} onClick={this.props.button} name="profile" value="action">Profile</button>
                </div> 
               


                {/* <div className="additionalStrip onTop">N E W</div>
                <ul className="navigation top">
                
                    
                        <Link to="/newplayer">Player</Link>
                    
                    
                        <Link to="/newleague">League</Link>
                    
                    
                        <Link to="/newscoreboard">Scoreboard</Link>
                    
                </ul>
                <ul className="navigation bottom">
                    
                        <Link to="/players">Players</Link>
                    
                    
                        <Link to="/leagues">Leagues</Link>
                    
                    
                        <Link to="/scoreboards">Scoreboards</Link>
                    
                </ul> 
                <div className="additionalStrip onBottom">L I S T S</div> */}
            </div>
        );
    }
}
export default Navigation
