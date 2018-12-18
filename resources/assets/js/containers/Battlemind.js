import Navigation from '../components/Navigation/Navigation';
import Newplayer from '../components/Players/Newplayer';
import Newleague from '../components/Leagues/Newleague';
import Newscoreboard from '../components/Scoreboards/Newscoreboard';
import Players from '../components/Players/Players';
import Leagues from '../components/Leagues/Leagues';
import Scoreboards from '../components/Scoreboards/Scoreboards';
import Player from '../components/Players/Player';
import League from '../components/Leagues/League';
import Scoreboard from '../components/Scoreboards/Scoreboard';
import React, { Component } from 'react';
import { BrowserRouter, Switch, Router, Route, Link} from 'react-router-dom';

class Battlemind extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: 'list',
            object: 'league',
            types: [
                { id: 0,
                  type: 'test' },
            ],
            
        };
    }

buttonHandler(e) {
    if (e.target.value === ' ') {
        this.setState({
            action: '',
            object: '',
        })  
    } else {
        this.setState({
            [e.target.value]: e.target.name
        });
    }
}

getTypes() {
    axios.get('/types').then(response =>
     this.setState({
        types: [...response.data.types]
         })
    );
}
componentWillMount(){
    this.getTypes();
}
    render() {
        return (
            <div>
                <Navigation button={(e) => this.buttonHandler(e)} />
            <Switch>
                
               
  
                <Route exact path="/players/:id/edit" component={Player}></Route>
                <Route exact path="/leagues/:id/edit" component={League}></Route>
                <Route exact path="/scoreboards/:id/edit" component={Scoreboard}></Route>
                {this.state.action === 'new' && this.state.object === 'player' ? <Newplayer  types={this.state.types}/> : null}
                {this.state.action === 'new' && this.state.object === 'league' ? <Newleague  /> : null}
                {this.state.action === 'new' && this.state.object === 'scoreboard' ? <Newscoreboard types={this.state.types} /> : null}
                {this.state.action === 'list' && this.state.object === 'player' ? <Players /> : null}
                {this.state.action === 'list' && this.state.object === 'league' ? <Leagues /> : null}
                {this.state.action === 'list' && this.state.object === 'scoreboard' ? <Scoreboards /> : null}
                

            </Switch> 
            
                


            </div>
        )
    }
}
export default Battlemind 