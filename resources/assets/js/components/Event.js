import React, { Component } from "react";
import Card from "./Card";

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: 1,
            scoreboard: 0,
            scoreboardplayers: [],
            type: "",
            url: "jace",
            playerid: 0,
            index: 1,
            player: {
                url: "url",
                name: "empty"
            }
        };
    }
    checkAvailability(arr, val) {
        return arr.some(arrVal => val === arrVal);
    }
    contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i].id === obj.id) {
                return true;
            }
        }

        return false;
    }
    actionController() {
        this.setState({
            action: this.state.action * -1
        });
    }

    buttonController(category, value) {
        const scoreboardPlayersUpdate = [...this.state.scoreboardplayers];
        if (category === "Win") {
            scoreboardPlayersUpdate[this.state.index].pivot.win += value;
            if (scoreboardPlayersUpdate[this.state.index].pivot.win < 0) {
                scoreboardPlayersUpdate[this.state.index].pivot.win = 0;
            }
        }
        if (category === "Lost") {
            scoreboardPlayersUpdate[this.state.index].pivot.lost += value;
            if (scoreboardPlayersUpdate[this.state.index].pivot.lost < 0) {
                scoreboardPlayersUpdate[this.state.index].pivot.lost = 0;
            }
        }
        if (category === "Draw") {
            scoreboardPlayersUpdate[this.state.index].pivot.draw += value;
            if (scoreboardPlayersUpdate[this.state.index].pivot.draw < 0) {
                scoreboardPlayersUpdate[this.state.index].pivot.draw = 0;
            }
        }

        this.setState({
            scoreboardplayers: scoreboardPlayersUpdate
        });
    }

    scoreboardChangeHandler(e) {
        this.setState({
            playerid: 0
        });

        if (e.target.value !== "Choose a scoreboard") {
            const value = e.target.value.split("break");

            axios.get(`/scoreboards/${value[0]}/edit`).then(response =>
                this.setState({
                    scoreboard: value[0],
                    type: value[1],
                    scoreboardplayers: response.data.scoreboardPlayers
                })
            );
        } else {
            this.setState({
                scoreboard: 0
            });
        }
    }

    addPlayer(scoreboard, player) {
        axios
            .get(`/scoreboards/${scoreboard}/addPlayer/${player}`)
            .then(response =>
                this.setState({
                    scoreboard: scoreboard,
                    scoreboardplayers: [...response.data]
                })
            );
    }

    removePlayer(scoreboard, player) {
        axios
            .get(`/scoreboards/${scoreboard}/removePlayer/${player}`)
            .then(response =>
                this.setState({
                    focusOn: "",
                    scoreboard: scoreboard,
                    scoreboardplayers: [...response.data]
                })
            );
    }

    selectPlayer(player, index) {
        this.setState({
            focusOn: "player",
            editedPlayer: { ...player },
            index: index
        });
    }

    renderOptions(scoreboards) {
        return (
            <select
                name="Choose a scoreboard"
                className="myform-control"
                onChange={e => this.scoreboardChangeHandler(e)}
            >
                <option>Choose a scoreboard</option>
                {scoreboards.map(scoreboard => (
                    <option
                        value={scoreboard.id + "break" + scoreboard.type}
                        key={scoreboard.id + scoreboard.name}
                    >
                        {scoreboard.name}
                    </option>
                ))}
            </select>
        );
    }

    renderPlayers(option, players) {
        if (option == "noexist") {
            return (
                <div className="Event-list-grid">
                    {players.map(player =>
                        !this.contains(this.state.scoreboardplayers, player) &&
                        this.state.type == player.type ? (
                            <div
                                className="Event-list-item"
                                onClick={() =>
                                    this.addPlayer(
                                        this.state.scoreboard,
                                        player.id
                                    )
                                }
                                key={player.type + player.id + player.name}
                            >
                                {player.name}
                            </div>
                        ) : null
                    )}
                </div>
            );
        } else {
            return (
                <div className="Event-list-grid">
                    {this.state.scoreboardplayers.map((player, index) =>
                        this.contains(this.state.scoreboardplayers, player) ? (
                            <div
                                className="Event-list-item Select-player"
                                onClick={() => this.selectPlayer(player, index)}
                                key={player.type + player.id + player.name}
                            >
                                {player.name}
                                <div className="Result-mini-strip">
                                    <div className="Result-mini-item">
                                        {"W : " + player.pivot.win}
                                    </div>
                                    <div className="Result-mini-item">
                                        {"L : " + player.pivot.lost}
                                    </div>
                                    <div className="Result-mini-item">
                                        {"D : " + player.pivot.draw}
                                    </div>
                                </div>

                                <div
                                    className="Remove-button"
                                    onClick={() =>
                                        this.removePlayer(
                                            this.state.scoreboard,
                                            player.id
                                        )
                                    }
                                >
                                    {" "}
                                    X{" "}
                                </div>
                            </div>
                        ) : null
                    )}
                </div>
            );
        }
    }
    // renderResults() {
    //     return (
    //         <div>
    //             {this.state.scoreboardplayers.length > 0
    //                 ? this.state.scoreboardplayers.map(player => (
    //                       <div key={this.state.scoreboard + player.id}>
    //                           {player.name +
    //                               "  W-" +
    //                               player.pivot.win +
    //                               " L-" +
    //                               player.pivot.lost +
    //                               " D-" +
    //                               player.pivot.draw}
    //                       </div>
    //                   ))
    //                 : null}
    //         </div>
    //     );
    // }
    submitHandler() {
        this.setState({ focusOn: "" });
        axios
            .post(`/scoreboards/${this.state.scoreboard}/updateResults`, {
                scoreboardplayers: [...this.state.scoreboardplayers]
            })
            .then(response => {
                if (response.status == 200) {
                }
            });
    }
    render() {
        return (
            <div className="Workarea">
                {this.state.focusOn === "player" ? (
                    <div className="Pop-up">
                        <div className="Card-wrapper">
                            <div
                                className="Closing-div"
                                onClick={() => this.submitHandler()}
                            >
                                X
                            </div>

                            <Card
                                actioncontroller={() => this.actionController()}
                                action={this.state.action}
                                buttoncontroller={(category, value) =>
                                    this.buttonController(category, value)
                                }
                                player={this.state.editedPlayer}
                            />
                        </div>
                    </div>
                ) : null}

                {this.state.focusOn === "addPlayers" ? (
                    <div className="Pop-up">
                        <div className="Card-wrapper">
                            <div
                                className="Closing-div"
                                onClick={() => this.setState({ focusOn: "" })}
                            >
                                X
                            </div>

                            {this.renderPlayers(
                                "noexist",
                                this.props.userPlayers
                            )}
                        </div>
                    </div>
                ) : null}

                {this.state.focusOn === "viewPlayers" ? (
                    <div className="Pop-up">
                        <div className="Card-wrapper">
                            <div
                                className="Closing-div"
                                onClick={() => this.setState({ focusOn: "" })}
                            >
                                X
                            </div>

                            {this.renderPlayers("", this.props.userPlayers)}
                        </div>
                    </div>
                ) : null}

                <form className="Scoreboard-dropdown">
                    {this.renderOptions(this.props.scoreboards)}
                    <button
                        className="Scoreboard-addPlayer-button"
                        onClick={e => {
                            e.preventDefault();
                            this.setState({ focusOn: "addPlayers" });
                        }}
                    >
                        ADD PLAYERS
                    </button>
                </form>
                {this.state.scoreboard !== 0 ? (
                    <React.Fragment>
                        {this.renderPlayers("", this.props.userPlayers)}
                    </React.Fragment>
                ) : null}
            </div>
        );
    }
}
export default Event;
