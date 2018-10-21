import React, { Component } from 'react';
import {compareValues} from '../functions';

class Scoreboard extends Component {
    constructor(props) {
        super(props);

        
        this.displayTable = this.displayTable.bind(this);
        this.calculatePoints = this.calculatePoints.bind(this);
       
       
    }
    
 
        
    
    componentWillMount() {
        
      
      
      
    }
  
    calculatePoints(league) {
        this.props.players.map(player => (
            player.total =  player.wins * league.win_point_value 
                          + player.lost * league.lost_point_value 
                          + player.draws * league.draw_point_value
        ));
          
         
    }

  

    displayTable(league) {
        this.calculatePoints(league);
        const playersGlobalResults = 
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Name </th> 
                    <th scope="col">Owner </th>
                    <th scope="col">Points </th>    
                    <th scope="col"> Wins </th> 
                    <th scope="col"> Lost </th> 
                    <th scope="col"> Draws  </th>
                </tr>
            </thead> 
        {this.props.players.sort(compareValues('total',  'desc')).map(player => (
            
            
            <tbody key={player.id}>
                <tr>
                    <td>{player.name}</td>   

                {this.props.users.map(user => (
                    user.id === player.user_id ? <td key={user.id}>{user.name}</td> : null ))}

                    <td>{player.total}</td>
                    <td>{player.wins}</td>
                    <td>{player.lost}</td> 
                    <td>{player.draws}</td>
                </tr>    
            </tbody>
        
            
        ))}
        </table>
        return playersGlobalResults
    }
    renderScoreboard(){                         
      
      
        
        const tableHead = this.props.leagues.map(league => (
                <div key={league.id} className="media">
                     <div className="media-body">
                        <div>
                            <table >
                                {this.props.users.map(user => (
                                    <thead key={user.id}>
                                        {league.user_id === user.id ?
                                            <tr>
                                                <th scope="col"> Name : {league.name}</th> 
                                                <th scope="col"> User : {user.name} </th> 
                                            </tr>
                                        : null}
                                    </thead>))}
                            
                            </table>
                            {this.displayTable(league)}
                            <hr />
                        </div>
                    </div>
                </div>));
            return tableHead
     
    }



    render() {
        return (
            <div>
              
                {this.renderScoreboard()}
             
              
            </div>
        );
    }
}
export default Scoreboard
