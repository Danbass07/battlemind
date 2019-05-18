import React, { Component } from 'react';
import { contains} from '../../functions';
import {Link} from 'react-router-dom'


class Scoreboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: '',
            types: [],
            allPlayers: [],
            ScoreboardPlayers: [],
            action: 'minus',
        
        };
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.typeChangeHandler = this.typeChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.contains = this.contains.bind(this);
        this.renderResultsDynamic = this.renderResultsDynamic.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
        this.getPlayers = this.getPlayers.bind(this);
        this.getTypes = this.getTypes.bind(this);
        
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
   
    contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
          
            if (a[i].id === obj.id) {
              
                return true;
            }
        }
      
        return false;
    }    
    

    nameChangeHandler(e) {
        this.setState({
            name: e.target.value
        });
    }
    typeChangeHandler(e) {
        this.setState({
            type: e.target.value
        });
    }
   

   
    submitHandler(e) {

        e.preventDefault();
      
        axios.put(`/scoreboards/${this.props.match.params.id}`, {
            name: this.state.name,
            type: this.state.type,
            
        }).then(response => {
           this.props.history.push('/home');
        });

    }
    

    getScoreboards() {
        axios.get(`/scoreboards/${this.props.match.params.id}/edit`).then(response =>
         this.setState({
            name: response.data.scoreboard.name,            
            type: response.data.scoreboard.type,
            ScoreboardPlayers: response.data.scoreboardPlayers,
   
             })
        );
       
    }

    getPlayers() {
        axios.get('/players').then(response =>
         this.setState({
            allPlayers: [...response.data.allplayers]
             })
        );
        
    }
    getTypes() {
        axios.get('/types').then(response =>
         this.setState({
            types: [...response.data.types]
             })
        );
    }
    componentWillMount() {
      this.getScoreboards(); 
      this.getPlayers();
      this.getTypes();
}
    addPlayer(player) {
        
        axios.get(`/scoreboards/${this.props.match.params.id}/addPlayer/${player.id}`).then(response =>
            this.setState ({
                ScoreboardPlayers:[...response.data ],
            })
          
        );
       
    }
    removePlayer(player) {
        axios.get(`/scoreboards/${this.props.match.params.id}/removePlayer/${player.id}`).then(response =>
            this.setState ({
                ScoreboardPlayers:[...response.data ],
            })
            
        );
    }
    renderPlayers(){
       
        return this.state.allPlayers.map(player => (
            <div key={player.id} className="media">
                 <div className="media-body">
                    <div>
                        {player.id}
                        {player.name}
                      
                        { !this.contains(this.state.ScoreboardPlayers, player) ? <button onClick={() => this.addPlayer(player)}
                            className="btn btn-sm btn-warning float-right">Add Player</button> : 
                            
                           
                            <button onClick={() => this.removePlayer(player)}
                            className="btn btn-sm btn-warning float-right">  X  </button> }
                        
                        {this.renderResultsDynamic(player)}
                        </div>


              </div>
             </div>
        ))
    }

    resultChangeController(player_id, category, key) {
        const scoreboardPlayersUpdate = [...this.state.ScoreboardPlayers];
       
        let number = 1;  
        if(this.state.action === 'minus'){
               number = -1
           };
            if (category === 'Win') {
                scoreboardPlayersUpdate[key].pivot.win += number;
            }
            if (category === 'Lost') {
                scoreboardPlayersUpdate[key].pivot.lost += number;
                }
            if (category === 'Draw') {
                scoreboardPlayersUpdate[key].pivot.draw += number;
                    
        }
            
    
           this.setState({
            ScoreboardPlayers: scoreboardPlayersUpdate,
                
                
               })
        axios.get(`/scoreboards/${this.props.match.params.id}/addResult/${player_id}/${category}/${this.state.action}`);
     }

    renderResultsDynamic(player){
        
        return this.state.ScoreboardPlayers.sort(this.compareValues('result',  'desc')).map((ScoreboardPlayer, index) => (
               <div key={ScoreboardPlayer.id}>
                   {this.state.ScoreboardPlayers[index].pivot && this.state.ScoreboardPlayers[index].pivot.player_id === player.id ?
                       <div>
                         
                         
                           <button onClick={() => this.resultChangeController(player.id ,'Win', index)} className="btn btn-sm btn-info float-right">
                               { this.state.ScoreboardPlayers[index].pivot.win}
                           </button>
                           <button onClick={() => this.resultChangeController(player.id ,'Lost', index)} className="btn btn-sm btn-danger float-right">
                               { this.state.ScoreboardPlayers[index].pivot.lost}
                           </button>
                           <button onClick={() => this.resultChangeController(player.id ,'Draw', index)} className="btn btn-sm btn-warning float-right">
                               { this.state.ScoreboardPlayers[index].pivot.draw}
                           </button>
                        
                       </div> : null}
               </div>
                   
           ))
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

   

    render() {
        
        return (
            <div className="Modal">
            <Link to={`/`} className="Cancel-button">X</Link>
             <div className="myform">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Edit Scoreboard</div>

                           <form onSubmit={this.submitHandler}>
                <div 
                               className="form-group">
                                <input 
                                className="form-control"
                                placeholder="Name"
                                value={this.state.name}
                                onChange={this.nameChangeHandler}
                                required
                                
                                />

                        <select className="myform-control" 
                                placeholder="Type"
                                required
                                value={this.state.type}
                                onChange={(e) => this.typeChangeHandler(e)}>
                
                        {this.state.types.map(type => (
                            
                        <option key={type.id}>{type.type}</option> ))}
                        </select>
                                
                             
                                
                                </div>
                                
                              
                                
                                <button 
                                type="submit" 
                                className="btn btn-primary"

                                >
                               Edit Scoreboard
                                </button>
                </form>
                            {/* <hr />
                            <button onClick={() => this.actionController()} className="btn btn-sm btn-dark float-right">
                            { this.state.action}
                            </button>
                            {this.renderPlayers()} */}
                        </div>
                    </div>
               
            </div>
            </div>

        );
    }
}
export default Scoreboard


