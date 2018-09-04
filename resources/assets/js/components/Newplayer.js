import React, { Component } from 'react';


class Newplayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: '',
            url: '',
            wins: 0,
            lost: 0,
            draws: 0,
        };
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.typeChangeHandler = this.typeChangeHandler.bind(this);
        this.urlChangeHandler = this.urlChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        // this.renderTasks = this.renderTasks.bind(this);
        // this.deleteHandler = this.deleteHandler.bind(this);
    }

    nameChangeHandler(e) {
        this.setState({
            name: e.target.value
        });
    }
    typeChangeHandler(e) {
        this.setState({
            type: e.target.value
        });
    }
    urlChangeHandler(e) {
        this.setState({
            url: e.target.value
        });
    }

    submitHandler(e) {

        e.preventDefault();
        console.log(this.props.history);
        axios.post('players', {
            name: this.state.name,
            type: this.state.type,
            url: this.state.url,
            wins: this.state.wins,
            lost: this.state.lost,
            draws: this.state.draws
        }).then(response => {
            console.log(response);
           this.setState({
            name: '',
            type: '',
            url: '',
            wins: 0,
            lost: 0,
            draws: 0,
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
                                placeholder="Type"
                                required
                                onChange={this.typeChangeHandler}
                                />
                                
                                
                                <input 
                                className="form-control" 
                                placeholder="Url"
                                required
                                onChange={this.urlChangeHandler}
                                />
                                
                                
                                </div>
                                
                                
                                
                                <button 
                                type="submit" 
                                className="btn btn-primary"

                                >
                                Add new player
                                </button>
                </form>
            </div>
        );
    }
}
export default Newplayer
