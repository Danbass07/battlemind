import React, { Component } from 'react';
import Card from './Card';



class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
  
            scoreboard: 1,
            scorboardplayers: [{}],
            type:'planeswalker',
            url: 'jace'
            
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
        axios.get(`/scoreboards/${value[0]}/edit`).then(response =>
            this.setState({
                scoreboard: value[0],
                type: value[1],
                scorboardplayers: response.data.scoreboardPlayers,
                
            })
        );
        
    
    }
    addPlayer(scoreboard, player) {

        axios.get(`/scoreboards/${scoreboard}/addPlayer/${player}`).then(response =>
            this.setState ({
                scoreboard: scoreboard,
                scorboardplayers:[...response.data ],
            }) 
           
          
        );
       
    }
    removePlayer(scoreboard, player) {
        axios.get(`/scoreboards/${scoreboard}/removePlayer/${player}`).then(response =>
            this.setState ({
                scoreboard: scoreboard,
                scorboardplayers:[...response.data],
            })
            
        );
    }
    selectPlayer(url) {
        this.setState({
            url: url,
        })
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
    renderPlayers(option ,players) {
        if (option == 'noexist') {
            return (    <div  className="Event-list-grid">
            { players.map(player => (
                                    
                  !this.contains(this.state.scorboardplayers, player) && (this.state.type==player.type)? 
                  <div className="Event-list-item"  onClick={() => this.addPlayer(this.state.scoreboard, player.id )} key={player.type+player.id+player.name}>
                     
                  {player.name}
                     
      
                 </div> : null 
             )) }
                 </div>
                 
             
         ) 
        } else {
            return (    <div  className="Event-list-grid">
            { players ? players.map(player => (
            
                  <div className="Event-list-item"  onClick={() => this.selectPlayer(player.url )} key={player.type+player.id+player.name}>
                     
                  {player.name}
                    <div onClick={() => this.removePlayer(this.state.scoreboard, player.id)} > X </div>
      
                 </div> 
             )) : null }
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
                 <div className='Event-grid-item'>{this.renderPlayers('noexist',this.props.players)}</div>
                 <div className='Event-grid-item'>{this.renderPlayers('',this.state.scorboardplayers)}</div>
                 <div className='Event-grid-item'><Card url={this.state.url}/></div>
                 <div className='Event-grid-item'></div>
                </div>
            </div>
        );   
    }
}
export default Event
