import Navigation from "../components/Navigation/Navigation";
import Newplayer from "../components/Players/Newplayer";
import Newleague from "../components/Leagues/Newleague";
import Newscoreboard from "../components/Scoreboards/Newscoreboard";
import { BrowserRouter, Switch, Router, Route, Link } from "react-router-dom";
import Player from "../components/Players/Player";
import League from "../components/Leagues/League";
import Scoreboard from "../components/Scoreboards/Scoreboard";
import React, { Component } from "react";
import List from "../components/List";
import Event from "../components/Event";
import Result from "../components/Result";
import Profile from "../components/Profile";
import FlashMessage from "../components/FlashMessage";
import Hypenotizer from "../containers/Hypenotizer";

class Battlemind extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userContent: {
                players: [{}],
                scoreboards: [{}],
                leagues: [{}]
            },

            friendsContent: {
                players: [{}],
                scoreboards: [{}],
                leagues: [{}],
                friendsScoreboards: [{}],
                friendsPlayers: [{}],
                friendsLeagues: [{}]
            },

            action: "profile",
            object: "none",
            types: [{ id: 0, type: "test" }],
            userTypes: [],
            allTypes: [],
            userScoreboards: [],
            friendsScoreboards: [],
            userPlayers: [{}],
            leagues: [{}],
            user: {
                groups: []
            },
            groups: [{}],
            userGroups: [{}],
            activeGroup: 1,
            message: [
                [
                    "Welcome to the Battlemind. First you need players. They are your armies, teams or simply yourself." +
                    " All depend what you play and what scores you want to store and compare with your friends. You can switch off hint in profile menu."
                ],
                ["Second Message"],
                ["Third Message"]
            ],
            messageNumber: 0,
            result: []
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

    getUserContent() {////////////////////////////////////////////////////////////////////////////////////////////////
        axios.get("/types").then(response => {
            const userTypes = [...response.data.userTypes];
            userTypes.forEach(userType => {
                if (userType.users.length !== 0) {
                    userType.users.map(user => {
                        if (response.data.user.id === user.id) {
                            userType.hype = user.pivot.hype;
                        }
                    });
                } else {
                    userType.hype = 5;
                }
                this.setState({
                    userTypes: [...userTypes],
                    types: [...response.data.allTypes]
                });
            });
        });

        axios.get(`/users`).then(response =>
            this.setState({
                user: { ...response.data },
                activeGroup: response.data.groups[0].id
            })
        );
        axios.get(`/scoreboards`).then(response =>
            this.setState({
                userScoreboards: response.data.content[0]
            })
        );
        axios.get("/players").then(response =>
            this.setState({
                userPlayers: [...response.data.content[0]]
            })
        );
        axios.get("/leagues").then(response =>
            this.setState({
                leagues: [...response.data.content[0]],
            })
        );
        axios.get(`/groups`).then(response =>
            this.setState({
                groups: [...response.data.groups]
            })
        );
    }
    getFriendsContent() {
        axios
            .get(`/leagues/${this.state.activeGroup}/friendsContent`)
            .then(response =>
                this.setState({
                    friendsLeagues: [...response.data]
                })
            );
        axios
            .get(`/players/${this.state.activeGroup}/friendsContent`)
            .then(response =>
                this.setState({
                    friendsPlayers: [...response.data]
                })
            );
        axios
            .get(`/scoreboards/${this.state.activeGroup}/friendsContent`)
            .then(response =>
                this.setState({
                    friendsScoreboards: [...response.data]
                })
            );
    }

    contains(a, obj) {
        if (typeof a === "object") {
            for (var i = 0; i < a.length; i++) {
                if (a[i].id === obj.id) {
                    return true;
                }
            }
            return false;
        } else {
            console.log(a);
        }
    }

    addUser(group) {
        if (!this.contains(this.state.user.groups, group)) {
            axios.get(`/groups/${group.id}/addUser`).then(() => {this.getUserContent() ; this.getFriendsContent()});
        } else {
            axios
                .get(`/groups/${group.id}/removeUser`)
                .then(() => {this.getUserContent() ; this.getFriendsContent()});
        }
    }
    activeGroupChange(id) {
        this.setState(
            {
                activeGroup: id
            },
            this.getFriendsContent()
        );
    }

    componentDidMount() {
        this.getUserContent();
        this.getFriendsContent();
    }

    render() {
        return (
            <div className="battlemind">

                <Navigation
                    button={e => this.buttonHandler(e)}
                    object={this.state.object}
                    action={this.state.action}
                />
                <Switch>
                    <Route
                        exact
                        path="/players/:id/edit"
                        component={Player}
                    ></Route>
                    <Route
                        exact
                        path="/leagues/:id/edit"
                        component={League}
                    ></Route>
                    <Route
                        exact
                        path="/scoreboards/:id/edit"
                        component={Scoreboard}
                    ></Route>

                    {this.state.action === "hype" ? (
                        <Hypenotizer
                            userTypes={this.state.userTypes}
                            navigation={this.state.object}
                            groups={this.state.groups}
                            activeGroup={this.state.activeGroup}
                        />
                    ) : null}

                    {this.state.action === "profile" ? (
                        <Profile
                            user={this.state.user}
                            groups={this.state.groups}
                            activeGroup={this.state.activeGroup}
                            activeGroupChange={id => this.activeGroupChange(id)}
                            types={this.state.types}
                            userGroups={this.state.user.groups}
                            addUser={group => this.addUser(group)}
                            contains={(userGroups, groups) =>
                                this.contains(userGroups, groups)
                            }
                        />
                    ) : null}

                    {this.state.action === "event" ? (
                        <Event
                            scoreboards={this.state.userScoreboards}
                            friendsScoreboards={
                                this.state.friendsScoreboards
                            }
                            userPlayers={this.state.userPlayers}
                            friendsPlayers={this.state.friendsPlayers}
                            leagues={this.state.leagues}
                            type={this.state.type}
                        />
                    ) : null}

                    {this.state.action === "results" ? (
                        <Result
                            scoreboards={this.state.userScoreboards}
                            leagues={this.state.leagues}
                            friendsLeagues={this.state.friendsLeagues}
                        />
                    ) : null}
                    {this.state.action === "list" ? (
                        <List
                            activeGroup={this.state.activeGroup}
                            object={this.state.object}
                            types={this.state.types}
                        />
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
                </Switch>
            </div>
        );
    }
}
export default Battlemind;
