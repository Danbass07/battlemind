import React, { Component } from 'react';
// import { BrowserRouter, Switch, Router, Route, Link} from 'react-router-dom';



class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
           players: this.props.players,
           scoreboard: '',
            
        };

    }
    scoreboardChangeHandler(e) {
        
        this.setState({
            scoreboard: e.target.value,
        });
    }
    renderOptions(scoreboards) {
        {console.log(scoreboards)  } 
        return (
        <select className="myform-control"
        onChange={(e) => this.scoreboardChangeHandler(e)}>
        {scoreboards.map(scoreboard => (
                          
            <option key={scoreboard.id+scoreboard.name}>{scoreboard.name}</option> ))
        }
        </select> )
    }
    render() {
        return (
            <div className="Workarea">
                <div className='Event-grid'>
                 <div className='Event-grid-item'>
                    <form className="myform">
                        
                
                        {this.renderOptions(this.props.scoreboards)}
                        
                        
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
