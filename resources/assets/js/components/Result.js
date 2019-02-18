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
    countSortPoints() {
        let pointsCountedSorted = [{}]
        this.state.scoreboardPlayers.forEach(player => {

            pointsCountedSorted.push({name: player.name, points: player.pivot.win * this.state.win_point_value})

        })
        console.log(pointsCountedSorted);
       
     }
    scoreboardChangeHandler(e) {

            const value = e.target.value;

            axios.get(`/scoreboards/${value}/edit`).then(response =>

                this.setState({
                    scoreboardPlayers: response.data.scoreboardPlayers,
                    
                })
                
            );
          
        
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
        this.countSortPoints()
        return (
            <div className="Workarea">
                <select name="Choose a scoreboard" className="myform-control" onChange={(e) => this.scoreboardChangeHandler(e)}>
                <option value='0'>Choose a Scoreboard</option>
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
                               <tr key={player.id}>
                               <th>{player.name}</th>
                               <th></th>
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
