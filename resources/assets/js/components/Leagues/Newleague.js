import React, { Component } from 'react';


class Newleague extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            win_point_value: 0,
            lost_point_value: 0,
            draw_point_value: 0,
            number_of_games: 0,
            number_of_players: 0,
            number_of_points: 0,
            
        };

    }
    changeHandler(e) {
        this.setState({
            [e.target.placeholder]: e.target.value
        });
    }

    submitHandler(e) {
     
       //  e.preventDefault();
        axios.post('/leagues', {
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
           if (response.status == 200){
            alert("SUCCESS")
        }
        e.target.value = 'action';
        e.target.name = 'legue';
        
       this.props.button(e);
        });

    }
    render() {
        return (
            <div className="workarea">
                  <div className="info-bar">Don't worry about this part for now. Its scoring rules and we have them ready for you
                  In future you can set your own too.
                </div>
                <form className="myform" onSubmit={(e) => this.submitHandler(e)}>

                                <input 
                                className="myform-control"
                                placeholder="name"
                                onChange={(e) => this.changeHandler(e)}
                                required
                                
                                />
                                <input 
                                className="myform-control"
                                placeholder="win_point_value"
                                required
                                onChange={(e) => this.changeHandler(e)}
                                />
                                
                                
                                <input 
                                className="myform-control" 
                                placeholder="lost_point_value"
                                required
                                onChange={(e) => this.changeHandler(e)}
                                />
                                <input 
                                className="myform-control" 
                                placeholder="draw_point_value"
                                required
                                onChange={(e) => this.changeHandler(e)}
                                />
                                 {/* <input 
                                className="myform-control" 
                                placeholder="number_of_games"
                                required
                                onChange={(e) => this.changeHandler(e)}
                                />
                                 <input 
                                className="myform-control" 
                                placeholder="number_of_players"
                                required
                                onChange={(e) => this.changeHandler(e)}
                                />
                                 <input 
                                className="myform-control" 
                                placeholder="number_of_points"
                                required
                                onChange={(e) => this.changeHandler(e)}
                                /> */}
                                

                                
                                
                                
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