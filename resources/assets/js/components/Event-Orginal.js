import React, { Component } from "react";
import Card from "./Card";

class EventOriginal extends Component {
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

    renderOptions(scoreboards, friendsScoreboards) {
        return (
                <select
                    name="Choose an event"
                    className="myform-control"
                    onChange={e => this.scoreboardChangeHandler(e)}
                >
                    <option>Choose an Event</option>
                    {scoreboards.map(scoreboard => (
                        <option
                            value={scoreboard.id + "break" + scoreboard.type}
                            key={scoreboard.id + scoreboard.name}
                        >
                            {scoreboard.name}{" "}{scoreboard.type}
                        </option>
                    ))}
                      {friendsScoreboards.map(scoreboard => (
                        <option
                            value={scoreboard.id + "break" + scoreboard.type}
                            key={scoreboard.id + scoreboard.name}
                        >
                            {scoreboard.name}{" "}{scoreboard.type}{" "}{scoreboard.user_name}
                        </option>
                    ))}
                </select>
    
        );
    }

    renderPlayers(option, players) {
        if (option === "noexist") {
            return (
                <div className="Event-list-grid-addplayers">
                    {players.map(player =>
                        !this.contains(this.state.scoreboardplayers, player) &&
                        this.state.type === player.type ? (
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
                                {player.user_name}
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
                                {player.name} {player.user_name}
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
                                    X
                                </div>
                            </div>
                        ) : null
                    )}
                </div>
            );
        }
    }

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
            <div className="workarea">
                <div className={this.props.hints === true ? "info-bar" : "info-bar-off"}>
                    There it is. A main part of the app. Here we store the
                    result. Choose a Scorboard, add some players and keep track
                    of games. That part of the app will tell our WebSite what to
                    display. What we did every week. NO CHEATING!!!
                </div>
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
                            {this.renderPlayers(
                                "noexist",
                                this.props.friendsPlayers
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
                            {this.renderPlayers("", this.props.friendsPlayers)}
                        </div>
                    </div>
                ) : null}

                <form className="Scoreboard-dropdown">
                    {this.renderOptions(
                        this.props.scoreboards,
                        this.props.friendsScoreboards
                    )}
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
                        {this.renderPlayers("", [])}
                    </React.Fragment>
                ) : null}
            </div>
        );
    }
}
export default EventOriginal;
