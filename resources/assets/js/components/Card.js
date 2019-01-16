import React, { Component } from 'react';




class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            action: true,
            
        };

    }
    actionController(){
        this.setState({
            action: !this.state.action,
        })
        
    }
    resultChangeController(player_id, category, key) {
        let number = 1;  
        if(this.state.action === false){
               number = -1
           };
            // if (category === 'Win') {
            //  leaguePlayersUpdate[key].pivot.win += number;
            // }
            // if (category === 'Lost') {
            //    leaguePlayersUpdate[key].pivot.lost += number;
            //     }
            // if (category === 'Draw') {
            //       leaguePlayersUpdate[key].pivot.draw += number;
                    
      //  }
        
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
                    <button onClick={() => this.props.buttoncontroller(this.props.id, 'Win', 1)}>Win</button>
                    <button onClick={() => this.props.buttoncontroller(this.props.id, 'Lost', 1)}>Lost</button>
                    <button onClick={() => this.props.buttoncontroller(this.props.id, 'Draw', 1)}>Draw</button>
                    <button onClick={() => this.actionController()}>{this.state.action ? <p>Now you add results</p> : <p>Now you remove results </p> } </button>
            </div>
        )
    }
}
export default Card