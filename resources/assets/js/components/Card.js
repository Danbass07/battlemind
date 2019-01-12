import React, { Component } from 'react';




class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
  
            
        };

    }
    resultChangeController(player_id, category, key) {
        const leaguePlayersUpdate = [...this.state.leaguePlayers];
        leaguePlayersUpdate.map((leaguePlayer) => (
            leaguePlayer.pivot.result = leaguePlayer.pivot.win * this.state.win_point_value + leaguePlayer.pivot.lost * this.state.lost_point_value + leaguePlayer.pivot.draw * this.state.draw_point_value
           ));
        let number = 1;  
        if(this.state.action === 'minus'){
               number = -1
           };
            if (category === 'Win') {
             leaguePlayersUpdate[key].pivot.win += number;
            }
            if (category === 'Lost') {
               leaguePlayersUpdate[key].pivot.lost += number;
                }
            if (category === 'Draw') {
                  leaguePlayersUpdate[key].pivot.draw += number;
                    
        }
        
    }
    render() {
        const style = {
            height: '100%',
            width: '100%',
            backgroundColor: 'black',
            backgroundImage: 'url("/images/'+this.props.url+'.jpeg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }
        return(
            <div style={style}>

            </div>
        )
    }
}
export default Card