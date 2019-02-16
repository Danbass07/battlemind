import React, { Component } from 'react';



class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            win_point_value: 0, 
            lost_point_value: 0, 
            draw_point_value: 0, 
            id: 0,
            scoreboardPlayers:[],
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
                    scoreboardPlayers: response.data.scoreboardPlayers,
                    
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
    scoreboardChangeHandler(e){
    axios.get(`/scoreboards/${e.target.value}/edit`).then(response =>
        
        this.setState({
           name: response.data.scoreboard.name,            
           type: response.data.scoreboard.type,
           scoreboardPlayers: response.data.scoreboardPlayers,
  
            })
       )
        }
    render() {
       
        return (
            <div className="Workarea">
                <select name="Choose a scoreboard" className="myform-control" onChange={(e) => this.scoreboardChangeHandler(e)}>
                <option value='0break0break0break0'>Choose a Scoreboard</option>
                {this.props.scoreboards.map(scoreboard => (
                                
                    <option 
                    value={scoreboard.id}  
                    key={scoreboard.id}>
                    {scoreboard.name}

                    </option> 
                ))}
                </select>
                         <select name="Choose a league" className="myform-control" onChange={(e) => this.leagueChangeHandler(e)}>
                <option value='0break0break0break0'>Choose a league</option>
                {this.props.leagues.map(league => (
                                
                    <option 
                    value={league.win_point_value+'break'+league.lost_point_value+'break'+league.draw_point_value+'break'+league.id}  
                    key={league.id+league.name}>
                    {league.name}
                    </option> 
                ))}

   
                    </select>
                <div>
                    <table className="Results-table">
                        <thead>
                        <tr>
                            <th>NAME</th>
                            <th>points</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.scoreboardPlayers.map(player => (
                               <tr>
                               <th>{player.name}</th>
                               <th>{ parseInt(player.wins) + this.state.win_point_value} </th>
                           </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
                

            </div>
        );
    }
}
export default Result
