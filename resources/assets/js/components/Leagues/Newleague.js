import React, { Component } from 'react';


class Newleague extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            win_point_value: 0,
            lost_point_value: 0,
            draw_point_value: 0,
            number_of_games: '',
            number_of_players: '',
            number_of_points: ''
            
        };
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.win_point_valueChangeHandler = this.win_point_valueChangeHandler.bind(this);
        this.lost_point_valueChangeHandler = this.lost_point_valueChangeHandler.bind(this);
        this.draw_point_valueChangeHandler = this.draw_point_valueChangeHandler.bind(this);
        this.number_of_gamesChangeHandler = this.number_of_gamesChangeHandler.bind(this);
        this.number_of_playersChangeHandler = this.number_of_playersChangeHandler.bind(this);
        this.number_of_pointsChangeHandler = this.number_of_pointsChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        // this.renderTasks = this.renderTasks.bind(this);
        // this.deleteHandler = this.deleteHandler.bind(this);
    }

    nameChangeHandler(e) {
        this.setState({
            name: e.target.value
        });
    }
    win_point_valueChangeHandler(e) {
        this.setState({
            win_point_value: +e.target.value
        });
    }
    lost_point_valueChangeHandler(e) {
        this.setState({
            lost_point_value: +e.target.value
        });
    }
    draw_point_valueChangeHandler(e) {
        this.setState({
            draw_point_value: +e.target.value
        });
    }
    number_of_gamesChangeHandler(e) {
        this.setState({
            number_of_games: +e.target.value
        });
    }
    number_of_playersChangeHandler(e) {
        this.setState({
            number_of_players: +e.target.value
        });
    }
    number_of_pointsChangeHandler(e) {
        this.setState({
            number_of_points: +e.target.value
        });
    }

    submitHandler(e) {

        e.preventDefault();
        
        axios.post('leagues', {
            name: this.state.name,
            win_point_value: this.state.win_point_value,
            lost_point_value: this.state.lost_point_value,
            draw_point_value: this.state.draw_point_value,
            number_of_games: this.state.number_of_games,
            number_of_players: this.state.number_of_players,
            number_of_points: this.state.number_of_points,
            
        }).then(response => {
            
           this.setState({
            name: '',
            win_point_value: '',
            lost_point_value: '',
            draw_point_value: '',
            number_of_games: '',
            number_of_players: '',
            number_of_points: '',
           });
           this.props.history.push('/home');
        });

    }
    render() {
        return (
            <div className="maincontent">
                <form className="myform" onSubmit={this.submitHandler}>

                                <input 
                                className="myform-control"
                                placeholder="Name"
                                onChange={this.nameChangeHandler}
                                required
                                
                                />
                                <input 
                                className="myform-control"
                                placeholder="win point value"
                                required
                                onChange={this.win_point_valueChangeHandler}
                                />
                                
                                
                                <input 
                                className="myform-control" 
                                placeholder="lost point value"
                                required
                                onChange={this.lost_point_valueChangeHandler}
                                />
                                <input 
                                className="myform-control" 
                                placeholder="draw point value"
                                required
                                onChange={this.draw_point_valueChangeHandler}
                                />
                                 <input 
                                className="myform-control" 
                                placeholder="number_of_games"
                                required
                                onChange={this.number_of_gamesChangeHandler}
                                />
                                 <input 
                                className="myform-control" 
                                placeholder="number_of_players"
                                required
                                onChange={this.number_of_playersChangeHandler}
                                />
                                 <input 
                                className="myform-control" 
                                placeholder=" number_of_points"
                                required
                                onChange={this.number_of_pointsChangeHandler}
                                />
                                

                                
                                
                                
                                <button 
                                type="submit" 
                                className="submit-button"

                                >
                                Add new League
                                </button>
                </form>
            </div>
        );
    }
}
export default Newleague