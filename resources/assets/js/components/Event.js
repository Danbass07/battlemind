import React, { Component } from 'react';
import Card from './Card';



class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {

            action: 1,
            scoreboard: 1,
            scoreboardplayers: [],
            type:'',
            url: 'jace',
            playerid: 0,
            index:1,
            
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
    actionController()  {

        this.setState({
            action: this.state.action * -1,
        })
        
    }

    buttonController(category,value)    {

        const scoreboardPlayersUpdate = [...this.state.scoreboardplayers];
        if (category === 'Win') {
            scoreboardPlayersUpdate[this.state.index].pivot.win += value;
        }
        if (category === 'Lost') {
            scoreboardPlayersUpdate[this.state.index].pivot.lost += value;
        }
        if (category === 'Draw') {
            scoreboardPlayersUpdate[this.state.index].pivot.draw += value;
        }
        this.setState({
            scoreboardplayers: scoreboardPlayersUpdate,
      })
    } 

    scoreboardChangeHandler(e) {
        this.setState({
            playerid: 0,
        })

        if (e.target.value !== "Choose a scoreboard") {
            
            const value = e.target.value.split('break');
        
            axios.get(`/scoreboards/${value[0]}/edit`).then(response =>

                this.setState({
                    scoreboard: value[0],
                    type: value[1],
                    scoreboardplayers: response.data.scoreboardPlayers,
                    
                })
            );
        }
    }

    addPlayer(scoreboard, player) {

        axios.get(`/scoreboards/${scoreboard}/addPlayer/${player}`).then(response =>

            this.setState ({
                scoreboard: scoreboard,
                scoreboardplayers:[...response.data ],
            }) 
           
          
        );
       
    }

    removePlayer(scoreboard, player) {

        axios.get(`/scoreboards/${scoreboard}/removePlayer/${player}`).then(response =>

            this.setState ({
                scoreboard: scoreboard,
                scoreboardplayers:[...response.data],
            })
            
        );
    }

    selectPlayer(url,playerId,index) {

        this.setState({
            url: url,
            playerid: playerId,
            index: index,
        })
    }

    renderOptions(scoreboards) {

        return (

            <select name="Choose a scoreboard" className="myform-control" onChange={(e) => this.scoreboardChangeHandler(e)}>
                <option>Choose a scoreboard</option>
                {scoreboards.map(scoreboard => (
                                
                    <option 
                    value={scoreboard.id+'break'+scoreboard.type}  
                    key={scoreboard.id+scoreboard.name}>
                    {scoreboard.name}
                    </option> 
                ))}

            </select> 
        )
    }

    renderPlayers(option ,players) {

        if (option == 'noexist') {

            return (    

                <div  className="Event-list-grid">
                    
                    {players.map(player => (
                                        
                        !this.contains(this.state.scoreboardplayers, player) && (this.state.type==player.type) ? 

                        <div className="Event-list-item"  
                        onClick={() => this.addPlayer(this.state.scoreboard, player.id )} 
                        key={player.type+player.id+player.name}
                        >
                        
                            {player.name}
                        
                        </div> : null 
                    ))}

                </div>
            ) 
        } else {

            return (    
            
                <div  className="Event-list-grid">
                    
                    {players ? players.map((player, index) => (

                        <div className="Event-list-item Select-player"  
                        onClick={() => this.selectPlayer(player.url, player.id, index )} 
                        key={player.type+player.id+player.name}
                        >

                            {player.name}

                            <div className="Remove-button" onClick={() => this.removePlayer(this.state.scoreboard, player.id)} > X </div>

                        </div> 

                    )) : null }

                </div>
                     
            ) 
        }
    }
    renderResults(){
        return(
            <div>
                {this.state.scoreboardplayers.length > 0 ? this.state.scoreboardplayers.map(player => (
                    <div key ={this.state.scoreboard + player.id}>
                        {player.name + '  W-'+player.pivot.win+' L-'+player.pivot.lost+' D-'+player.pivot.draw }
                    </div> 
                )) :null }
            </div>
        )
    }
    submitHandler(e) {
        e.preventDefault();
        axios.post(`/scoreboards/${this.state.scoreboard}/updateResults`, {
           
         
            scoreboardplayers:[...this.state.scoreboardplayers ],
        }).then(response => {           if (response.status == 200){

            
        }
    });

    }
    render() { 

        return (
            <div className="Workarea">
            <form className="" onSubmit={(e) => this.submitHandler(e)}> 
                {this.renderOptions(this.props.scoreboards)}
                <button className='Submit-button' type='submit'>SAVE</button>
            </form>
                <div className='Event-grid'>
                <div className='Event-grid-item'>{this.renderPlayers('noexist',this.props.players)}</div>
                <div className='Event-grid-item'>{this.renderPlayers('',this.state.scoreboardplayers)}</div>
                <div className='Event-grid-item'>
                    {this.state.playerid !== 0 ?
                            <Card 
                                actioncontroller={() => this.actionController()} 
                                action={this.state.action}
                                buttoncontroller={(category,value) => this.buttonController(category,value)} 
                                id={this.state.playerid} 
                                url={this.state.url}
                                />
                                
                            : null}
                </div> 
                 <div className='Event-grid-item'>{this.renderResults() }</div>
                </div>
            </div>
        );   
    }
}
export default Event
