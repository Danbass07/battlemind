import React, { Component } from "react";

class Newplayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            type: 0,
            url: "url",
            wins: 0,
            lost: 0,
            draws: 0,
            response: { status: "You are creating...:" }
        };
    }


    changeHandler(e) {
        this.setState({
            [e.target.placeholder]: e.target.value
        });
    }
    optionChangeHandler(e) {
        this.setState({
            type: e.target.value
        });
    }

    submitHandler(e) {
        e.preventDefault();
        if (this.state.type !== 0) {

            this.setState({ response: { status: "You are creating...:" } });

            axios
                .post("/players", {
                    name: this.state.name,
                    type: this.state.type,
                    url: this.state.url,
                    wins: this.state.wins,
                    lost: this.state.lost,
                    draws: this.state.draws
                })
                .then(response => {
                    this.setState({
                        name: "",
                        url: "url",
                        wins: 0,
                        lost: 0,
                        draws: 0,
                        response: response
                    });
                });
        }
        
     
    }

    render() {
        return (
            <div className="workarea">
                <div className={this.props.hints === true ? "info-bar" : "info-bar-off"}>
                    Welcome, you can add any amount of players. They represent
                    your activity in a club. We added all types of games played
                    now, we can add any other if required. Once added, same
                    player can be used in a different scoreboards.
                </div>
                <form className="myform" onSubmit={e => this.submitHandler(e)}>
                    <div>
                        <input
                            className="myform-control"
                            placeholder="name"
                            onChange={e => this.changeHandler(e)}
                            value={this.state.name}
                            required
                        />

                        <select
                            className="myform-control"
                            onChange={e => this.optionChangeHandler(e)}
                        >   
                        <option value='0'>Choose a type</option>
                            {this.props.types.map(type => (
                                <option key={type.id}>{type.type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="myform-control-sidebar">
                        <div className="response-display">
                            {this.state.response.status === 200 ? (
                                <h2 style={{ color: "green" }}>'SUCCESS' </h2>
                            ) : this.state.response.status !==
                              "You are creating...:" ? (
                                <h2 style={{ color: "red" }}>'FAILED'</h2>
                            ) : null}
                        </div>
                        <button type="submit" className="submit-button">
                            Add new player
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
export default Newplayer;
