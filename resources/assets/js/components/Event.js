import React, { Component } from 'react';
// import { BrowserRouter, Switch, Router, Route, Link} from 'react-router-dom';



class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
           scoreboards: this.props.scoreboards,
           players: this.props.players,
           scoreboard: '',
            
        };

    }
    scoreboardChangeHandler(e) {
        console.log(e.target.name);
        this.setState({
            scoreboard: e.target.value,
        });
    }
    render() {
        return (
            <div className="Workarea">
                <div className='Event-grid'>
                 <div className='Event-grid-item'>
                    <form className="myform">
                        <select className="myform-control"
                        onChange={(e) => this.scoreboardChangeHandler(e)}>
                
                        {this.props.scoreboards.map(scoreboard => (
                        <option name={scoreboard.id} key={scoreboard.id}>{scoreboard.name}</option> ))}
                        </select>
                        
                    </form>
                 
                 </div>
                 <div className='Event-grid-item'>{this.state.scoreboard}</div>
                 <div className='Event-grid-item'>Results</div>
                 <div className='Event-grid-item'>Spare</div>
                </div>
            </div>
        );
    }
}
export default Event
