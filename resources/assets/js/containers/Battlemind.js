import Navigation from '../components/Navigation/Navigation';
import Newplayer from '../components/Players/Newplayer';
import Newleague from '../components/Leagues/Newleague';
import Newscoreboard from '../components/Scoreboards/Newscoreboard';
import React, { Component } from 'react';

class Battlemind extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: 'new',
            object: 'league',
            types: [
                { id: 0,
                  type: 'test' },
            ],
            
        };
    }

buttonHandler(e) {
    if (e.target.value === ' ') {
        this.setState({
            action: '',
            object: '',
        })  
    } else {
        this.setState({
            [e.target.value]: e.target.name
        });
    }
}

getTypes() {
    axios.get('/types').then(response =>
     this.setState({
        types: [...response.data.types]
         })
    );
}
componentWillMount(){
    this.getTypes();
}
    render() {
        return (
            <div>
                <Navigation button={(e) => this.buttonHandler(e)} />
                {console.log(this.state)}
                {this.state.action === 'new' && this.state.object === 'player' ? <Newplayer  types={this.state.types}/> : null}
                {this.state.action === 'new' && this.state.object === 'league' ? <Newleague  /> : null}
                {this.state.action === 'new' && this.state.object === 'scoreboard' ? <Newscoreboard types={this.state.types} /> : null}



            </div>
        )
    }
}
export default Battlemind 