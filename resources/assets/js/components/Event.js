import React, { Component } from 'react';
// import { BrowserRouter, Switch, Router, Route, Link} from 'react-router-dom';



class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
  

            
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
        this.setState({
            scoreboard: value[0],
            type: value[1],
        });
    }
    renderOptions(scoreboards) {
        return (
        <select className="myform-control"
        onClick={(e)=>this.props.getscorboardplayers(e)}
        onChange={(e) => this.scoreboardChangeHandler(e)}>
        {scoreboards.map(scoreboard => (
                          
            <option value={scoreboard.id+'break'+scoreboard.type}  key={scoreboard.id+scoreboard.name}>{scoreboard.name}</option> ))
        }
        </select> )
    }
    renderPlayers(option) {
        if (option == 'noexist') {
            return (    <div  className="Event-list-grid">
            { this.props.players.map(player => (
                                    
                  !this.contains(this.props.scorboardplayers, player) && (this.state.type==player.type)? 
                  <div className="Event-list-item" onClick={() => this.props.addplayer(this.state.scoreboard, player.id )} key={player.type+player.id+player.name}>
                     
                  {player.name}
                     
      
                 </div> : null 
             )) }
                 </div>
                 
             
         ) 
        } else {
            return (    <div  className="Event-list-grid">
            { this.props.players.map(player => (
                                    
                  this.contains(this.props.scorboardplayers, player) && (this.state.type==player.type)? 
                  <div className="Event-list-item" onClick={() => this.props.removeplayer(this.state.scoreboard, player.id )} key={player.type+player.id+player.name}>
                     
                  {player.name}
                     
      
                 </div> : null 
             )) }
                 </div>
                 
             
         ) 
        }


        }

    render() {
        return (
            <div className="Workarea">
            <form className="Event-form">
                {this.renderOptions(this.props.scoreboards)}
            </form>
                <div className='Event-grid'>
                 <div className='Event-grid-item'>{this.renderPlayers('noexist')}</div>
                 <div className='Event-grid-item'>{this.renderPlayers('')}</div>
                 <div className='Event-grid-item'>{this.state.id}</div>
                 <div className='Event-grid-item'>{this.state.iid}</div>
                </div>
            </div>
        );   
    }
}
export default Event
