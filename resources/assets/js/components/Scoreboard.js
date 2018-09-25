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

        const playersGlobalResults = 
        <div>
        <thead>
            <tr>
                <th scope="col">Name </th>   
                <th scope="col"> Wins </th> 
                <th scope="col"> Lost </th> 
                <th scope="col"> Draws  </th>
            </tr>
        </thead> 
        {this.state.players.map(player => (
            
            <tbody key={player.id}>
                <tr>
                    <td>{player.name}</td>   
                    <td>{player.wins}</td> 
                    <td>{player.lost}</td> 
                    <td>{player.draws}</td>
                </tr>    
            </tbody>
        
            
        ))}
        </div>
        return playersGlobalResults
    }
    renderScoreboard(){                         
      
      
        
        const tableHead = this.state.leagues.map(league => (
                <div key={league.id} className="media">
                     <div className="media-body">
                        <div>
                            <table className="table">
                                {this.state.users.map(user => (
                                    <thead key={user.id}>
                                        {league.user_id === user.id ?
                                            <tr>
                                                <th scope="col"> League Name : {league.name}</th> 
                                                <th scope="col"> User : {user.name} </th> 
                                            </tr>
                                        : null}
                                    </thead>))}
                            {this.cauntPoints(league)}
                            </table>
                            <hr />
                        </div>
                    </div>
                </div>));
            return tableHead
     
    }

    getAll() {
        this.axios = axios.create({
            baseURL: 'http://localhost/batt',
        });
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
