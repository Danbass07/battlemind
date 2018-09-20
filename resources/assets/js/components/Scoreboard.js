import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Scoreboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leagues: [],
           players: [],
           users: [],
           
        };
        this.renderResults = this.renderResults.bind(this);
         this.cauntPoints = this.cauntPoints.bind(this);
        
    }
   

    renderResults(league) {

        

        // return this.state.players.map(player => (
        //     <div key={player.id} className="media">
        //          <div className="media-body">
        //             <div>
        //                 {player.name} {player.user_id}
        //                 <div>{
                            
        //                     (player.wins * league.win_point_value) 
        //                     +
        //                     (player.lost * league.lost_point_value) 
        //                     +
        //                     (player.draws * league.draw_point_value) 
                        
        //                 }</div>
        //             </div>
        //       </div>
        //      </div>
        // ))
    }
    cauntPoints(league) {

        const playersGlobalResults = this.state.players.map(player => (
            <div key={player.id}>
            Name : {player.name} | Wins : {player.wins} | Lost : {player.lost} | Draws :{player.draws}
            </div>
        ));
        console.log(this.state.players);
        return playersGlobalResults
    }
    renderScoreboard(){                         
      
        // console.log(this.state.leagues);
        // console.log(this.state.players);
        // console.log(this.state.users);
        
        const tableHead = this.state.leagues.map(league => (
                <div key={league.id} className="media">
                     <div className="media-body">
                        <div>
                            
                            {this.state.users.map(user => (<div key={user.id}>League Name : {league.name} User : {league.user_id === user.id ? user.name: null}</div>))}
                           {this.cauntPoints(league)}
                            <hr />
                        </div>
                    </div>
                </div>));
            return tableHead
        // return this.state.leagues.map(league => (
        //     <div key={league.id} className="media">
        //          <div className="media-body">
        //             <div>
        //                 {league.name} {league.user_id}
        //                 {this.renderResults(league)}
        //                 <hr />
        //             </div>
        //       </div>
        //      </div>))
    }

    getAll() {
        axios.get('/scoreboard').then(response =>
         this.setState({
            players: [...response.data.players],
            leagues: [...response.data.leagues],
            users: [...response.data.users],
          
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
             
              
            </div>
        );
    }
}
export default Scoreboard
