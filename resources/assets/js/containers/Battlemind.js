import Navigation from '../components/Navigation/Navigation';
import Newplayer from '../components/Players/Newplayer';
import Newleague from '../components/Leagues/Newleague';
import Newscoreboard from '../components/Scoreboards/Newscoreboard';
import Player from '../components/Players/Player';
import League from '../components/Leagues/League';
import Scoreboard from '../components/Scoreboards/Scoreboard';
import React, { Component } from 'react';
import { BrowserRouter, Switch, Router, Route, Link} from 'react-router-dom';
import List from '../components/List';
import Event from '../components/Event';

class Battlemind extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: 'event',
            object: 'none',
            types: [
                { id: 0,
                  type: 'test' },
            ],
            scoreboards: [{}],
            scorboardplayers: [{}],
            players: [{}],
            
        };
    
    }

buttonHandler(e) {
    if (e.target.name === 'event') {
        this.setState({
            object: '',
        }) 
    }
        this.setState({
            [e.target.value]: e.target.name
        });
    
}

getTypes() {
    axios.get('/types').then(response =>
     this.setState({
        types: [...response.data.types]
         })
    );
}
getScoreboards() {
    axios.get(`/scoreboards`).then(response =>
     this.setState({
        scoreboards: response.data.content,

         })
    );
   
}

getPlayers() {
    axios.get('/players').then(response =>
     this.setState({
        players: [...response.data.content]
         })
    );
    
}
getLeagues() {
    axios.get(`/leagues`).then(response =>
     this.setState({
        leagues: [...response.data.content]
         })
    );
}
getScoreboardPlayers(e) {
    const value = e.target.value.split('break');
    axios.get(`/scoreboards/${value[0]}/edit`).then(response =>
        this.setState({
            scorboardplayers: response.data.scoreboardPlayers
        })
    );
    console.log(this.state.scorboardplayers)
}
addPlayer(scoreobard, player) {

    axios.get(`/scoreboards/${scoreobard}/addPlayer/${player}`).then(response =>
        this.setState ({
            scoreboardplayers:[...response.data ],
        })
      
    );
   
}
removePlayer(scoreobard, player) {
    axios.get(`/scoreboards/${scoreobard}/removePlayer/${player.id}`).then(response =>
        this.setState ({
            scoreboardplayers:[...response.data ],
        })
        
    );
}
componentWillMount() {
  this.getScoreboards(); 
  this.getPlayers();
  this.getTypes();
  this.getLeagues();
}
 


    render() {
        return (
            <div className="Battlemind">  
                <Navigation button={(e) => this.buttonHandler(e)} object={this.state.object} action={this.state.action} />
            <Switch>
                
  
                <Route exact path="/players/:id/edit" component={Player}></Route>
                <Route exact path="/leagues/:id/edit" component={League}></Route>
                <Route exact path="/scoreboards/:id/edit" component={Scoreboard}></Route>

                {this.state.action === 'event'  ? 
                <Event 
                    addplayer={(scoreobard, player)=> this.addPlayer(scoreobard, player)} 
                    removeplayer={(scoreobard, player)=> this.removePlayer(scoreobard, player)} 
                    getscorboardplayers={(e) => this.getScoreboardPlayers(e)} 
                    scorboardplayers={this.state.scorboardplayers} 
                    scoreboards={this.state.scoreboards} 
                    players={this.state.players} 
                    leagues={this.state.leagues}
                /> : null}
                {this.state.action === 'list'  ? <List object={this.state.object} /> : null}
                {this.state.action === 'new' && this.state.object === 'player' ? <Newplayer  types={this.state.types}/> : null}
                {this.state.action === 'new' && this.state.object === 'league' ? <Newleague  /> : null}
                {this.state.action === 'new' && this.state.object === 'scoreboard' ? <Newscoreboard types={this.state.types} /> : null}

                {/* {this.state.action === 'new' && this.state.object === 'player' ? <Newplayer  types={this.state.types}/> : null}
                {this.state.action === 'new' && this.state.object === 'league' ? <Newleague  /> : null}
                {this.state.action === 'new' && this.state.object === 'scoreboard' ? <Newscoreboard types={this.state.types} /> : null}
                {this.state.action === 'list' && this.state.object === 'player' ? <Players /> : null}
                {this.state.action === 'list' && this.state.object === 'league' ? <Leagues /> : null}
                {this.state.action === 'list' && this.state.object === 'scoreboard' ? <Scoreboards /> : null} */}
                

            </Switch> 
            
                


            </div>
        )
    }
}
export default Battlemind 