import React, { Component } from 'react';
// import { BrowserRouter, Switch, Router, Route, Link} from 'react-router-dom';



class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
           scoreboard: '',
           players: [],
            
        };

    }
    render() {
        return (
            <div className="Workarea">
                <div className='Event-grid'>
                 <div className='Event-grid-item'>Scoreboard</div>
                 <div className='Event-grid-item'>Players</div>
                 <div className='Event-grid-item'>Results</div>
                 <div className='Event-grid-item'>Spare</div>
                </div>
            </div>
        );
    }
}
export default Event
