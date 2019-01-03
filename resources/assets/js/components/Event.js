import React, { Component } from 'react';
// import { BrowserRouter, Switch, Router, Route, Link} from 'react-router-dom';



class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
           players: this.props.players,
           scoreboard: 1,
           ScoreboardPlayers: [],

            
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
        
        this.setState({
            scoreboard: e.target.value,
        });
    }
    renderOptions(scoreboards) {
        return (
        <select className="myform-control"
        onChange={(e) => this.scoreboardChangeHandler(e)}>
        {scoreboards.map(scoreboard => (
                          
            <option value={scoreboard.id}  key={scoreboard.id+scoreboard.name}>{scoreboard.name}</option> ))
        }
        </select> )
    }
    renderPlayers(id) {
        axios.get(`/scoreboards/${id}/edit`).then(response =>
            this.setState({
               ScoreboardPlayers: response.data.scoreboardPlayers,
      
                }));
        
        return (
                this.props.players.map(player => (
                    <div key={player.id+player.name} className="media">
                    <div className="media-body">
                       <div>
                           {player.id}
                           {player.name}
                           {player.type}
                         
                           { !this.contains(this.state.ScoreboardPlayers, player) ? 
                           
                           <button onClick={() => this.addPlayer(player)}
                               className="btn btn-sm btn-warning float-right">Add Player</button> : null }

                           </div>
                        </div>
                    </div>
                           ))
                 ) }
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
