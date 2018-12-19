import React, { Component } from 'react';
import "./League.css";
import {Link} from 'react-router-dom';

class League extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: 'name',
            win_point_value: 0,
            lost_point_value: 0,
            draw_point_value: 0,
            number_of_games: '',
            number_of_players: '',
            number_of_points: '',
            allPlayers: [],
            leaguePlayers: [],
            action: 'minus',

        };
  
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.contains = this.contains.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
        this.renderResultsDynamic = this.renderResultsDynamic.bind(this);
        this.renderResults = this.renderResults.bind(this);
     
       
        
    }
    actionController() {
        if (this.state.action === 'minus') {
            this.setState({
                action: 'add',
            })
        } else { 
            this.setState({
                action: 'minus',
            }) 
        }
       
    }


    changeHandler(e) {

        const property = e.target.placeholder
        this.setState({
            [property]: e.target.value
        });
    
    }


    submitHandler(e) {

        e.preventDefault();
        axios.put(`/leagues/${this.props.match.params.id}`, {
            name: this.state.name,
            win_point_value: this.state.win_point_value,
            lost_point_value: this.state.lost_point_value,
            draw_point_value: this.state.draw_point_value,
            number_of_games: this.state.number_of_games,
            number_of_players: this.state.number_of_players,
            number_of_points: this.state.number_of_points,
           
           
        }).then(response => {
           this.props.history.push('/home');
        });

    }
    compareValues(key, order='asc') {
        return function(a, b) {
          if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
              return 0; 
          }
      
          const varA = (typeof a[key] === 'string') ? 
            a[key].toUpperCase() : a[key];
          const varB = (typeof b[key] === 'string') ? 
            b[key].toUpperCase() : b[key];
      
          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            (order == 'desc') ? (comparison * -1) : comparison
          );
        };
      }
    getLeague() {
        axios.get(`/leagues/${this.props.match.params.id}/edit`).then(response =>
            
         this.setState({

            id:                  response.data.league.id,   
            name:                response.data.league.name,
            win_point_value:     response.data.league.win_point_value,
            lost_point_value:    response.data.league.lost_point_value,
            draw_point_value:    response.data.league.draw_point_value,
            number_of_games:     response.data.league.number_of_games,
            number_of_players:   response.data.league.number_of_players,
            number_of_points:    response.data.league.number_of_points,
            leaguePlayers:      response.data.players,
             })
        

        );
    }
    addPlayer(player) {
        
        axios.get(`/leagues/${this.props.match.params.id}/addPlayer/${player.id}`).then(response =>
            this.setState ({
                leaguePlayers:[...response.data ],
            }).then(this.getPlayers())
        );
    }
    removePlayer(player) {
        axios.get(`/leagues/${this.props.match.params.id}/removePlayer/${player.id}`).then(response =>
            this.setState ({
                leaguePlayers:[...response.data ],
            }).then(this.getPlayers())
            
        );
    }
   
    contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
          
            if (a[i].id === obj.id) {
              
                return true;
            }
        }
      
        return false;
    } 

 resultChangeController(player_id, category, key) {
    const leaguePlayersUpdate = [...this.state.leaguePlayers];
    leaguePlayersUpdate.map((leaguePlayer) => (
        leaguePlayer.pivot.result = leaguePlayer.pivot.win * this.state.win_point_value + leaguePlayer.pivot.lost * this.state.lost_point_value + leaguePlayer.pivot.draw * this.state.draw_point_value
       ));
    let number = 1;  
    if(this.state.action === 'minus'){
           number = -1
       };
        if (category === 'Win') {
         leaguePlayersUpdate[key].pivot.win += number;
        }
        if (category === 'Lost') {
           leaguePlayersUpdate[key].pivot.lost += number;
            }
        if (category === 'Draw') {
              leaguePlayersUpdate[key].pivot.draw += number;
                
    }
        

       this.setState({
            leaguePlayers: leaguePlayersUpdate,
            
            
           })
    axios.get(`/players/${this.props.match.params.id}/addResult/${player_id}/${category}/${this.state.action}`);
 }
   
   renderResults() {
       const leaguePlayersResults = [...this.state.leaguePlayers];
        leaguePlayersResults.map((leaguePlayer) => (
        leaguePlayer.pivot.result = leaguePlayer.pivot.win * this.state.win_point_value + leaguePlayer.pivot.lost * this.state.lost_point_value + leaguePlayer.pivot.draw * this.state.draw_point_value
       ));
       
       this.setState({
        leaguePlayers: leaguePlayersResults,
       });
                       
   }
    
    renderResultsDynamic(player){
        
     return this.state.leaguePlayers.sort(this.compareValues('result',  'desc')).map((leaguePlayer, index) => (
            <div key={leaguePlayer.id}>
                {this.state.leaguePlayers[index].pivot && this.state.leaguePlayers[index].pivot.player_id === player.id ?
                    <div>
                        {console.log('1st'+this.state.leaguePlayers)}
                       <div className="btn btn-sm btn-success float-right">{this.state.leaguePlayers[index].pivot.result} </div>
                        <button onClick={() => this.resultChangeController(player.id ,'Win', index)} className="btn btn-sm btn-info float-right">
                            { this.state.leaguePlayers[index].pivot.win}
                        </button>
                        <button onClick={() => this.resultChangeController(player.id ,'Lost', index)} className="btn btn-sm btn-danger float-right">
                            { this.state.leaguePlayers[index].pivot.lost}
                        </button>
                        <button onClick={() => this.resultChangeController(player.id ,'Draw', index)} className="btn btn-sm btn-warning float-right">
                            { this.state.leaguePlayers[index].pivot.draw}
                        </button>
                     
                    </div> : null}
            </div>
                
        ))
    }

    renderPlayers(){
       
        return this.state.allPlayers.map(player => (
            <div key={player.id} className="media">
                 <div className="media-body">
                    <div>
                        {player.id}
                        {player.name}
                      
                        { !this.contains(this.state.leaguePlayers, player) ? <button onClick={() => this.addPlayer(player)}
                            className="btn btn-sm btn-warning float-right">Add Player</button> : 
                            
                           
                            <button onClick={() => this.removePlayer(player)}
                            className="btn btn-sm btn-warning float-right">  X  </button> }
                        
                        {this.renderResultsDynamic(player)}
                        </div>


              </div>
             </div>
        ))
    }
    getPlayers() {
        axios.get('/players').then(response =>
         this.setState({
            allPlayers: [...response.data.allplayers]
             })
        );
        
    }
    componentWillMount() {
      this.getLeague();
      this.getPlayers();
     
      
      
     
    }

    render() {
       
       
        return (
            <div>
                <div className="Modal">
                <Link to={`/`} className="Cancel-button">X</Link>
                    <div className="Form">
                        <div className="card">
                            <div className="card-header">Edit Leauge</div>

                           <form onSubmit={this.submitHandler}>
                <div 
                               className="form-group">
                                <input 
                                className="form-control"
                                placeholder="name"
                                value={this.state.name}
                                onChange={this.changeHandler}
                                required
                                
                                />
                                <input 
                                className="form-control"
                                placeholder="win_point_value"
                                required
                                type="number"
                                value={this.state.win_point_value}
                                onChange={this.changeHandler}
                                />
                                
                                
                                <input 
                                className="form-control" 
                                placeholder="lost_point_value"
                                required
                                type="number"
                                value={this.state.lost_point_value}
                                onChange={this.changeHandler}
                                />
                                 <input 
                                className="form-control" 
                                placeholder="draw_point_value"
                                required
                                type="number"
                                value={this.state.draw_point_value}
                                onChange={this.changeHandler}
                                />
                                 <input 
                                className="form-control" 
                                placeholder="number_of_games"
                                required
                                type="number"
                                value={this.state.number_of_games}
                                onChange={this.changeHandler}
                                />
                                 <input 
                                className="form-control" 
                                placeholder="number_of_players"
                                required
                                type="number"
                                value={this.state.number_of_players}
                                onChange={this.changeHandler}
                                />
                                  <input 
                                className="form-control" 
                                placeholder="number_of_points"
                                required
                                type="number"
                                value={this.state.number_of_points}
                                onChange={this.changeHandler}
                                />
                                
                                </div>
                                
                              
                                <button 
                                type="submit" 
                                className="btn btn-primary"

                                >
                               Edit League
                                </button>
                </form>
                            <hr />
                            {/* <button onClick={() => this.actionController()} className="btn btn-sm btn-dark float-right">
                            { this.state.action}
                            </button> */}
                            {/* {this.renderPlayers()} */}
                        </div>
                    </div>
                </div>
            </div>
        );
    
    }
}
export default League
