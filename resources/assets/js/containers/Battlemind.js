import Navigation from "../components/Navigation/Navigation";
import Newplayer from "../components/Players/Newplayer";
import Newleague from "../components/Leagues/Newleague";
import Newscoreboard from "../components/Scoreboards/Newscoreboard";
import Player from "../components/Players/Player";
import League from "../components/Leagues/League";
import Scoreboard from "../components/Scoreboards/Scoreboard";
import React, { Component } from "react";
import { BrowserRouter, Switch, Router, Route, Link } from "react-router-dom";
import List from "../components/List";
import Event from "../components/Event";
import Result from "../components/Result";
import Profile from "../components/Profile";
import FlashMessage from "../components/FlashMessage";

class Battlemind extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: "event",
            object: "none",
            types: [{ id: 0, type: "test" }],
            scoreboards: [{}],
            players: [{}],
            leagues: [{}],
            user: {
                groups: []
            },
            groups: [{}],
            userGroups: [{}],
            message: [
                [
                    "Welcome to the Battlemind. First you need players. They are your armies, teams or simply yourself. All depend what you play and what scores you want to store and compare with your friends. You can switch off hint in profile menu."
                ],
                ["Second Message"],
                ["Third Message"]
            ],
            messageNumber: 0
        };
    }

    buttonHandler(e) {
        if (e.target.name === "event") {
            this.setState({
                object: ""
            });
        }
        this.setState({
            [e.target.value]: e.target.name
        });
    }

    getAll() {
        axios.get("/types").then(response =>
            this.setState({
                types: [...response.data.types]
            })
        );
        axios.get(`/users`).then(response =>
            this.setState({
                user: { ...response.data }
            })
        );
        axios.get(`/scoreboards`).then(response =>
            this.setState({
                scoreboards: response.data.content
            })
        );
        axios.get("/players").then(response =>
            this.setState({
                players: [...response.data.content]
            })
        );
        axios.get("/leagues").then(response =>
            this.setState({
                leagues: [...response.data.content]
            })
        );
        axios.get(`/groups`).then(response =>
            this.setState({
                    groups: [...response.data.groups]
                })
        );
    }

    contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i].id === obj.id) {
                return true;
            }
        }
        return false;
    }

    addUser(group) {
        if (!this.contains(this.state.user.groups, group)) {
            axios.get(`/groups/${group.id}/addUser`).then(() => this.getAll());
        } else {
            axios
                .get(`/groups/${group.id}/removeUser`)
                .then(() => this.getAll());
        }
    }

    componentWillMount() {
        this.getAll();
    }

    render() {
        return (
            <div className="Battlemind">
                {/* {this.state.user.hints ? <FlashMessage 
             message = {this.state.message[this.state.messageNumber]}
             /> : null } */}

                <Navigation
                    button={e => this.buttonHandler(e)}
                    object={this.state.object}
                    action={this.state.action}
                />

                {this.state.action === "profile" ? (
                    <Profile
                        user={this.state.user}
                        groups={this.state.groups}
                        userGroups={this.state.user.groups}
                        addUser={group_id => this.addUser(group_id)}
                        contains={(userGroups, groups) =>
                            this.contains(userGroups, groups)
                        }
                    />
                ) : null}

                {this.state.action === "event" ? (
                    <Event
                        scoreboards={this.state.scoreboards}
                        players={this.state.players}
                        leagues={this.state.leagues}
                        type={this.state.type}
                    />
                ) : null}

                {this.state.action === "results" ? (
                    <Result
                        scoreboards={this.state.scoreboards}
                        players={this.state.players}
                        leagues={this.state.leagues}
                    />
                ) : null}
                {this.state.action === "list" ? (
                    <List object={this.state.object} />
                ) : null}
                {this.state.action === "new" &&
                this.state.object === "player" ? (
                    <Newplayer types={this.state.types} />
                ) : null}
                {this.state.action === "new" &&
                this.state.object === "league" ? (
                    <Newleague />
                ) : null}
                {this.state.action === "new" &&
                this.state.object === "scoreboard" ? (
                    <Newscoreboard types={this.state.types} />
                ) : null}
            </div>
        );
    }
}
export default Battlemind;
