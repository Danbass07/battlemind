import React, { Component } from 'react';
// import { BrowserRouter, Switch, Router, Route, Link} from 'react-router-dom';



class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
           players: this.props.players,
           scoreboard: 1,
           ScoreboardPlayers: [],
           type: 'planeswalker',

            
        };

    }
    contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
          
            if (a[i].id === obj.id) {
              
                return true;
            }
        }
      
        return false;
    }  
    scoreboardChangeHandler(e) {
        const value = e.target.value.split('break');
        console.log(value);
        this.setState({
            scoreboard: value[0],
            type: value[1],
        });
    }
    renderOptions(scoreboards) {
        return (
        <select className="myform-control"
        onChange={(e) => this.scoreboardChangeHandler(e)}>
        {scoreboards.map(scoreboard => (
                          
            <option value={scoreboard.id+'break'+scoreboard.type}  key={scoreboard.id+scoreboard.name}>{scoreboard.name}</option> ))
        }
        </select> )
    }
    renderPlayers() {

        
        return (
                    this.props.players.map(player => (
                        <div> {!this.contains(this.state.ScoreboardPlayers, player) && (this.state.type==player.type)? 
                            <div key={player.id+player.name} className="media">
                           {console.log("Type " + player.type)}
                           {console.log("StateType " + this.state.type)}
                                <div className="media-body">
                                        <div>
                                            --{player.id}
                                            --{player.name}
                                            --{player.type}
                                            
                                            
                                            
                                            <button onClick={() => this.addPlayer(player)}
                                                className="btn btn-sm btn-warning float-right">Add Player</button> 

                                        </div>
                                </div>
                            </div> : null }
                        </div>
                    ))
                ) 
        }
\
    render() {
        return (
            <div className="Workarea">
                <div className='Event-grid'>
                 <div className='Event-grid-item'>
                    <form className="myform">
                        
                
                        {this.renderOptions(this.props.scoreboards)}
                        
                        
                    </form>
                 
                 </div>
                 <div className='Event-grid-item'>{this.renderPlayers(this.state.scoreboard)}</div>
                 <div className='Event-grid-item'>{this.state.id}</div>
                 <div className='Event-grid-item'>{this.state.iid}</div>
                </div>
            </div>
        );
    }
}
export default Event
