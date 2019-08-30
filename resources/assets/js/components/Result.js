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
            pointsCountedSorted: [],
        };

    }
    compareValues(key, ascending=true) {
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
            (ascending == false) ? (comparison * -1) : comparison
          );
        };
    }
    countSortPoints() {
        let pointsCountedSorted = [{}]
        this.state.scoreboardPlayers.forEach(player => {

            pointsCountedSorted.push({
                
                name: player.name, 
                points: player.pivot.win * this.state.win_point_value + player.pivot.lost * this.state.lost_point_value + player.pivot.draw * this.state.draw_point_value
            
            });
            pointsCountedSorted.sort(this.compareValues('points', false));

        })
        this.setState({

            pointsCountedSorted: pointsCountedSorted
            
        });
       
     }
    scoreboardChangeHandler(e) {

            const value = e.target.value;

            axios.get(`/scoreboards/${value}/edit`).then(response =>

                this.setState({
                    scoreboardPlayers: response.data.scoreboardPlayers,
                    
                })
                
            ).then();
          
        
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
    componentDidMount(){
        this.countSortPoints()
    }
    componentDidUpdate(prevProps, prevState){
      
        if(prevState.scoreboardPlayers !== this.state.scoreboardPlayers || prevState.id !== this.state.id ){
            this.countSortPoints();        }
    }

    render() {
        return (
            <div className="workarea">
                <div className="info-bar">
                    And here it is RESULTS. Choose a Scorebard compare results in different Leagues. Enjoy!!
                 </div>
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
                    key={league.name + league.id }>
                    {league.name}
                    </option> 
                ))}

   
                    </select>
                <div>
                    <table className="results-table">
                        <thead>
                        <tr>
                            <th>NAME</th>
                            <th>points</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.pointsCountedSorted.map(player => (
                               <tr key={player.id}>
                               <th>{player.name}</th>
                               <th>{player.points}</th>
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
