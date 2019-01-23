import React, { Component } from 'react';



class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            win_point_value: 0, 
            lost_point_value: 0, 
            draw_point_value: 0, 
            id: 0,
            scoreboardplayers: [],
        };

    }
    scoreboardChangeHandler(e) {
        this.setState({
            playerid: 0,
        })

        if (e.target.value !== "Choose a scoreboard") {
            
            const value = e.target.value.split('break');
            function myFunction(value, key) {
                value.result = value.wins * this.state.win_point_value + value.lost * this.state.lost_point_value + value.draws * this.state.draw_point_value ; 
              
             }
            axios.get(`/scoreboards/${value[0]}/edit`).then(response =>

                this.setState({
                    scoreboard: value[0],
                    type: value[1],
                    scoreboardplayers: response.data.scoreboardPlayers,
                    
                })
                
            ).then(  
            this.state.scoreboardplayers.forEach(myFunction)
            ).then(console.log(this.state));
          
        }
    }
    leagueChangeHandler(e){
        const value = e.target.value.split('break');
        this.setState ({
            win_point_value: parseInt(value[0]), 
            lost_point_value: parseInt(value[1]), 
            draw_point_value: parseInt(value[2]), 
            id: parseInt(value[3]),
        });
      
    }
    
    render() {
       
        return (
            <div className="Workarea">
            <h2 style={{color: 'white'}}>Choose your legue (scoring)</h2>
                         <select name="Choose a league" className="myform-control" onChange={(e) => this.leagueChangeHandler(e)}> Ch
                <option value='0break0break0break0'>Choose a league</option>
                {this.props.leagues.map(league => (
                                
                    <option 
                    value={league.win_point_value+'break'+league.lost_point_value+'break'+league.draw_point_value+'break'+league.id}  
                    key={league.id+league.name}>
                    {league.name}
                    </option> 
                ))}

            </select> 
            <h2 style={{color: 'white'}}>Choose your scorboard (players list)</h2>
            <select name="Choose a scoreboard" className="myform-control" onChange={(e) => this.scoreboardChangeHandler(e)}>
                <option>Choose a scoreboard</option>
                {this.props.scoreboards.map(scoreboard => (
                                
                    <option 
                    value={scoreboard.id+'break'+scoreboard.type}  
                    key={scoreboard.id+scoreboard.name}>
                    {scoreboard.name}
                    </option> 
                ))}

            </select> s
            
                <div>
                    <table className="Results-table">
                        <thead>
                        <tr>
                            <th>NAME</th>
                            <th>points</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.scoreboardplayers !== '' ? this.state.scoreboardplayers.map(player => (

                           
                            <tr key={player.id}>
                                <td>{player.name}</td>{console.log(this.state.win_point_value+' '+player.wins )}
                                <td>{player.wins * this.state.win_point_value + player.lost * this.state.lost_point_value + player.draws * this.state.draw_point_value}</td>
                            </tr> 
                          
                        )): null}
                        </tbody>
                    </table>

                </div>
                

            </div>
        );
    }
}
export default Result
