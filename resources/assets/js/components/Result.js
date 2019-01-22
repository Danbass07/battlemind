import React, { Component } from 'react';



class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            win_point_value: '', 
            lost_point_value: '', 
            draw_point_value: '', 
            id: 0,
        };

    }

    leagueChangeHandler(e){
        const value = e.target.value.split('break');
        this.setState ({
            win_point_value: parseInt(value[0]), 
            lost_point_value: parseInt(value[1]), 
            draw_point_value: parseInt(value[2]), 
            id: parseInt(value[3]),
        });
        console.log(this.state.id)
    }
    
    render() {
       
        return (
            <div className="Workarea">
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
                        {this.state.id !== 0 ? this.props.players.map(player => (
                            <tr key={player.id}>
                                <td>{player.name}</td>
                                <td>{console.log(this.props)}</td>
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
