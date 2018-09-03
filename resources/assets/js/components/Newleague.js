import React, { Component } from 'react';


class Newleague extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            win_point_value: 0,
            lost_point_value: 0,
            draw_point_value: 0,
            
        };
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.win_point_valueChangeHandler = this.win_point_valueChangeHandler.bind(this);
        this.lost_point_valueChangeHandler = this.lost_point_valueChangeHandler.bind(this);
        this.draw_point_valueChangeHandler = this.draw_point_valueChangeHandler.bind(this);
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

    submitHandler(e) {

        e.preventDefault();
        console.log(this.state);
        axios.post('leagues', {
            name: this.state.name,
            win_point_value: this.state.win_point_value,
            lost_point_value: this.state.lost_point_value,
            draw_point_value: this.state.draw_point_value
            
        }).then(response => {
            console.log(response);
           this.setState({
            name: '',
            win_point_value: '',
            lost_point_value: '',
            draw_point_value: ''
           });
           this.props.history.push('/home');
        });

    }
    render() {
        return (
            <div className="container">
                <form onSubmit={this.submitHandler}>
                <div 
                               className="form-group">
                                <input 
                                className="form-control"
                                placeholder="Name"
                                onChange={this.nameChangeHandler}
                                required
                                
                                />
                                <input 
                                className="form-control"
                                placeholder="win point value"
                                required
                                onChange={this.win_point_valueChangeHandler}
                                />
                                
                                
                                <input 
                                className="form-control" 
                                placeholder="lost point value"
                                required
                                onChange={this.lost_point_valueChangeHandler}
                                />
                                <input 
                                className="form-control" 
                                placeholder="draw point value"
                                required
                                onChange={this.draw_point_valueChangeHandler}
                                />
                                
                                </div>
                                
                                
                                
                                <button 
                                type="submit" 
                                className="btn btn-primary"

                                >
                                Add new League
                                </button>
                </form>
            </div>
        );
    }
}
export default Newleague