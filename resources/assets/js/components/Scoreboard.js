import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Scoreboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leagues: [],
           players: [],
           leaguePlayers: [],
        };
        this.renderResults = this.renderResults.bind(this);
        this.cauntPoints = this.cauntPoints.bind(this);
        
    }
    cauntPoints(){
        const players = this.state.players;
        this.state.leagues.forEach(function(league){
            
          //  console.log(league);
            players.forEach(function(player){
             //   console.log(player);
                
            });
        });
    }

    renderResults(league) {

        

        return this.state.players.map(player => (
            <div key={player.id} className="media">
                 <div className="media-body">
                    <div>
                        {player.name} {player.user_id}
                        <div>{
                            
                            (player.wins * league.win_point_value) 
                            +
                            (player.lost * league.lost_point_value) 
                            +
                            (player.draws * league.draw_point_value) 
                        
                        }</div>
                    </div>
              </div>
             </div>
        ))
    }
    renderScoreboard(){                         
      
   
        return this.state.leagues.map(league => (
            <div key={league.id} className="media">
                 <div className="media-body">
                    <div>
                        {league.name} {league.user_id}
                        {this.renderResults(league)}
                        <hr />
                    </div>
              </div>
             </div>))
    }

    getAll() {
        axios.get('/scoreboard').then(response =>
         this.setState({
            players: [...response.data.players],
            leagues: [...response.data.leagues],
            leaguePlayers: [...response.data.leaguePlayers],
             })      
        );
        
    }
    componentWillMount() {
      this.getAll(); 
      
      
    }
    render() {
        return (
            <div className="container">
                <h1>Welcome Component</h1>
                <h2>Information you want to see every time you visit your profile</h2>
               
                <hr />
                {this.renderScoreboard()}
                {this.cauntPoints()}
              
            </div>
        );
    }
}
export default Scoreboard
