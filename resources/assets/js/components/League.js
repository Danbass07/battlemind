import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class League extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'name',
            win_point_value: 0,
            lost_point_value: 0,
            draw_point_value: 0,
            number_of_games: '',
            number_of_players: '',
            number_of_points: '',

        };
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.win_point_valueChangeHandler = this.win_point_valueChangeHandler.bind(this);
        this.lost_point_valueChangeHandler = this.lost_point_valueChangeHandler.bind(this);
        this.draw_point_valueChangeHandler = this.draw_point_valueChangeHandler.bind(this);
        this.number_of_gamesChangeHandler = this.number_of_gamesChangeHandler.bind(this);
        this.number_of_playersChangeHandler = this.number_of_playersChangeHandler.bind(this);
        this.number_of_pointsChangeHandler = this.number_of_pointsChangeHandler.bind(this);
    }
    nameChangeHandler(e) {
            this.setState({
            name: e.target.value
            });
        }
    
    
    win_point_valueChangeHandler(e) {
        this.setState({
            win_point_value: e.target.value
        });
    }
    lost_point_valueChangeHandler(e) {
        this.setState({
            lost_point_value: e.target.value
    });
}
    draw_point_valueChangeHandler(e) {
        this.setState({
            draw_point_value: e.target.value
    });
    }
    number_of_gamesChangeHandler(e) {
        this.setState({
            number_of_games: e.target.value
    }); 
    }
    number_of_playersChangeHandler(e) {
        this.setState({
            number_of_players: e.target.value
        });
    }
    number_of_pointsChangeHandler(e) {
        this.setState({
            number_of_points: e.target.value
        });
    }
    submitHandler(e) {

        e.preventDefault();
        axios.put(`/leagues/${this.props.match.params.id}`, {
            name: this.state.name,
            win_point_value: this.state.win_point_value,
            lost_point_value: this.state.lost_point_value,
            draw_point_value: this.state.draw_point_value,
            number_of_games: this.state.number_of_games,
            number_of_players: this.state.number_of_players,
            number_of_points: this.state.number_of_points,
           
           
        }).then(response => {
           this.props.history.push('/home');
        });

    }
    getLeague() {
        axios.get(`/leagues/${this.props.match.params.id}/edit`).then(response =>
            
         this.setState({
            name: response.data.league.name,
            win_point_value: response.data.league.win_point_value,
            lost_point_value: response.data.league.lost_point_value,
            draw_point_value: response.data.league.draw_point_value,
            number_of_games: response.data.league.number_of_games,
            number_of_players: response.data.league.number_of_players,
            number_of_points: response.data.league.number_of_points
           
             })

        );
    }
    componentWillMount() {
      this.getLeague(); 
    }
    render() {
       
        
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Edit Leauge</div>

                           <form onSubmit={this.submitHandler}>
                <div 
                               className="form-group">
                                <input 
                                className="form-control"
                                placeholder="Name"
                                value={this.state.name}
                                onChange={this.nameChangeHandler}
                                required
                                
                                />
                                <input 
                                className="form-control"
                                placeholder="win_point_value"
                                required
                                value={this.state.win_point_value}
                                onChange={this.win_point_valueChangeHandler}
                                />
                                
                                
                                <input 
                                className="form-control" 
                                placeholder="Lost_point_value"
                                required
                                value={this.state.lost_point_value}
                                onChange={this.lost_point_valueChangeHandler}
                                />
                                 <input 
                                className="form-control" 
                                placeholder="Draw_point_value"
                                required
                                value={this.state.draw_point_value}
                                onChange={this.draw_point_valueChangeHandler}
                                />
                                 <input 
                                className="form-control" 
                                placeholder="number_of_games"
                                required
                                value={this.state.number_of_games}
                                onChange={this.number_of_gamesChangeHandler}
                                />
                                 <input 
                                className="form-control" 
                                placeholder="number_of_plyers"
                                required
                                value={this.state.number_of_players}
                                onChange={this.number_of_playersChangeHandler}
                                />
                                  <input 
                                className="form-control" 
                                placeholder="number_of_points"
                                required
                                value={this.state.number_of_points}
                                onChange={this.number_of_pointsChangeHandler}
                                />
                                
                                </div>
                                
                              
                                <button 
                                type="submit" 
                                className="btn btn-primary"

                                >
                               Edit League
                                </button>
                </form>
                            <hr />
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    
    }
}
export default League
