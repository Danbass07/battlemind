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
import Result from '../components/Result';
import Profile from '../components/Profile';

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
            players: [{}],
            leagues: [{}],
            user:{},
            groups:[{}],
            userGroups:[{}],

            
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
getAll() {
    axios.get('/types').then(response =>
        this.setState({
           types: [...response.data.types]
            })
       );

    axios.get(`/users`).then(response =>
        this.setState({
           user: {...response.data}
            })
       );

       axios.get(`/scoreboards`).then(response =>
        this.setState({
           scoreboards: response.data.content,
   
            })
       );

       axios.get('/players').then(response =>
        this.setState({
           players: [...response.data.content]
            })
       );

       
       axios.get('/leagues').then(response =>
        this.setState({
            leagues: [...response.data.content]
            })
       );
    //    axios.get(`/groups`).then(response =>
    //     this.setState({
    //        groups: [...response.data.groups],
    //        userGroups:[...response.data.userGroups],
    //         }, () => {

             
        
            
            
            

    //         })
     //  );
 


}


addUser(group) {
    console.log('addUser')
    console.log(group)
    console.log(this.state.user.id)
    console.log(this.state.userGroups)

    if(!this.contains(this.state.userGroups, group)) {

        axios.get(`/groups/${group.id}/addUser`).then(response =>
            this.setState ({
                userGroups:[...response.data ],
            })
          
        );
        
    } else {

        axios.get(`/groups/${group.id}/removeUser`).then(response =>
            this.setState ({
                userGroups:[...response.data ],
            })
          
        );

    }
   
   
}



componentWillMount() {
  this.getAll();
}
 


    render() {
        console.log(this.state.leagues)
        return (
            <div className="Battlemind">  
                <Navigation button={(e) => this.buttonHandler(e)} object={this.state.object} action={this.state.action} />
            <Switch>
                
  
                <Route exact path="/players/:id/edit" component={Player}></Route>
                <Route exact path="/leagues/:id/edit" component={League}></Route>
                <Route exact path="/scoreboards/:id/edit" component={Scoreboard}></Route>

                
                {this.state.action === 'profile' ? 
                <Profile 
                    user={this.state.user}
                    groups={this.state.groups}
                    userGroups={this.state.userGroups}
                    addUser={(group_id) => this.addUser(group_id)}
                    contains={(userGroups, groups) =>this.contains(userGroups, groups)}
                /> : null}


                {this.state.action === 'event' ? 
                <Event 
                 
                
                    scoreboards={this.state.scoreboards} 
                 
                    players={this.state.players} 
                    leagues={this.state.leagues}
                    type={this.state.type}
                /> : null}

                {this.state.action === 'results'  ? 
                <Result 
                 
                
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