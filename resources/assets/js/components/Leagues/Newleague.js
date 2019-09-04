import React, { Component } from "react";

class Newleague extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            win_point_value: "",
            lost_point_value: "",
            draw_point_value: "",
            number_of_games: "",
            number_of_players: "",
            number_of_points: "",
            response: { status: "You are creating...:" }
        };
    }
    changeHandler(e) {
        this.setState({
            [e.target.placeholder]: e.target.value
        });
    }

    submitHandler(e) {
        e.preventDefault();
        this.setState({ response: { status: "You are creating...:" } });
        axios
            .post("/leagues", {
                name: this.state.name,
                win_point_value: this.state.win_point_value,
                lost_point_value: this.state.lost_point_value,
                draw_point_value: this.state.draw_point_value,
                number_of_games: this.state.number_of_games,
                number_of_players: this.state.number_of_players,
                number_of_points: this.state.number_of_points
            })
            .then(response => {
                this.setState({
                    name: "",
                    win_point_value: "",
                    lost_point_value: "",
                    draw_point_value: "",
                    number_of_games: "",
                    number_of_players: "",
                    number_of_points: "",
                    response: response
                });
            });
    }
    render() {
        return (
            <div className="workarea">
                <div className="info-bar">
                    Don't worry about this part for now. Its scoring rules and
                    we have them ready for you. In future you can set your own
                    too.
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
                        <input
                            className="myform-control"
                            placeholder="win_point_value"
                            required
                            onChange={e => this.changeHandler(e)}
                            value={this.state.win_point_value}
                        />

                        <input
                            className="myform-control"
                            placeholder="lost_point_value"
                            required
                            onChange={e => this.changeHandler(e)}
                            value={this.state.lost_point_value}
                        />
                        <input
                            className="myform-control"
                            placeholder="draw_point_value"
                            required
                            onChange={e => this.changeHandler(e)}
                            value={this.state.draw_point_value}
                        />
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
                            Add new League
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
export default Newleague;
