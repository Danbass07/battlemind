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
import Profile from "../containers//Profile";
import FlashMessage from "../components/FlashMessage";
import Hypenotizer from "../containers/Hypenotizer";

class Battlemind extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: "profile",
            object: "none",
            userTypes: [],
            userScoreboards: [],
            friendsScoreboards: [],
            userPlayers: [{}],
            friendsPlayers: [{}],
            userLeagues: [{}],
            friendsLeagues:[{}],
            user: {
                groups: []
            },
            groups: [{}],
            userGroups: [{}],
            allGroups:[{}],
            activeGroup: 0,
            activeGroupIndex: 0,
            hints: false
        };
    }
 

    hypeLevelHandler(e, typeId) {

        let groups = [...this.state.groups];

        groups.map(group => {
            if(group.id === this.state.activeGroup) {
                group.users.map( user => {
                    if(user.id === this.state.user.id) {
                       user.types.map(type => {
                            if(type.id === typeId)
                            type.pivot.hype = parseInt(e.target.value, 10);
                            return type;
                        })
                    }
                })
            }
        })
 
        this.setState({
            groups: [...groups]
            });
      
    }

    hypenotizer() {
        let activeGroupTypes = this.state.groups.map( group => {
            if (group.id === this.state.activeGroup) {
              return   group.users.map( user => {
                    if (user.id === this.state.user.id) {
                     return    user.types
                    }
                }).filter(Boolean).flat(1);
            }
        }).filter(Boolean).flat(1);

        axios.post(`/hype/hypenotizer`, {
            userTypes: [...activeGroupTypes]
        });
  
      
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

    getUserContent() {
        axios.get(`/users`).then(response =>
            this.setState(
                {
                    user: { ...response.data.user },
                    users:[...response.data.users],
                    activeGroup: response.data.user.groups[0].id
                },
                () => {
                    this.getFriendsContent();
                }
            )
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
                userLeagues: [...response.data.content[0]]
            })
        );
        axios.get(`/groups`).then(response => {
            var groups = [...response.data.groups];
            let activeGroupMembersRatings = [];

            groups.map(group => {
                group.users.map(user => {
                    if (group.id === this.state.activeGroup) {
                        user.pivot.active
                            ? activeGroupMembersRatings.push(user)
                            : null;
                    }
                });
            });
            this.setState({
                groups: [...groups],
                allGroups: [...response.data.allGroups],
                userGroups: [...response.data.userGroups],
                activeGroupMembersRatings: activeGroupMembersRatings
            });
        });
    }

    getFriendsContent() {
        axios
            .get(`/types/${this.state.activeGroup}/userTypes`)
            .then(response => {
                this.setState({
                    userTypes: [...response.data], 
     
                });
            });

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
    activeUser(groupId, userId) {
        var groups = [...this.state.groups];
        groups.map(group => {
            if (group.id === this.state.activeGroup) {
                group.users.map(user => {
                    if (user.id === userId) {

                        user.pivot.active = !user.pivot.active;
             
                    }
                });
            }
        });

        this.setState({
            groups: groups,
           
        });
        axios.put(`/groups/${groupId}/toggleActiveUser/${userId}`);
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

    addUser(group, user=this.props.user.id) {
        if (!this.contains(this.state.user.groups, group)) {
            axios.get(`/groups/${group.id}/addUser/${user.id}`).then(() => {
                this.getUserContent();
                this.getFriendsContent();
            });
        } else {
            axios.get(`/groups/${group.id}/removeUser/${user.id}`).then(() => {
                this.getUserContent();
                this.getFriendsContent();
            });
        }
    }
    activeGroupChange(id, index) {
        this.setState(
            {
                activeGroup: id,
                activeGroupIndex: index,
            },
            () => {
                this.getFriendsContent();
            }
        );
    }
    hintsToggle() {
        this.setState({
            hints: !this.state.hints
        });
    }
    componentDidMount() {
        this.getUserContent();
    }

    render() {
         
         // console.log(this.state.allGroups);
          // console.log(this.state.activeGroupIndex);
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
                            user={this.state.user}
                            activeGroup={this.state.activeGroup}
                            activeGroupIndex={this.state.activeGroupIndex}
                            activeGroupMembersRatings={
                                this.state.activeGroupMembersRatings
                            }
                            groups={this.state.groups}
                            group={this.state.groups[this.state.activeGroupIndex]}
                            navigation={this.state.object}
                            hypeLevelHandler={(e, userType) =>
                                this.hypeLevelHandler(e, userType)
                            }
                            hypenotizer={() => this.hypenotizer()}
                            hints={this.state.hints}
                        />
                    ) : null}

                    {this.state.action === "profile" ? (
                        <Profile
                            user={this.state.user}
                            groups={this.state.groups}
                            allGroups={this.state.allGroups}
                            group={this.state.groups[this.state.activeGroup]}
                            activeGroup={this.state.activeGroup}
                            users={this.state.users}
                            activeGroupChange={(id, index) => this.activeGroupChange(id, index)}
                            activeUser={(groupId, userId) =>
                                this.activeUser(groupId, userId)
                            }
                            userGroups={this.state.user.groups}
                            addUser={(group, user) => this.addUser(group, user)}
                            contains={(userGroups, groups) =>
                                this.contains(userGroups, groups)
                            }
                            hints={this.state.hints}
                        />
                    ) : null}

                    {this.state.action === "event" ? (
                        <Event
                            scoreboards={this.state.userScoreboards}
                            friendsScoreboards={this.state.friendsScoreboards}
                            userPlayers={this.state.userPlayers}
                            friendsPlayers={this.state.friendsPlayers}
                            leagues={this.state.leagues}
                            types={this.state.userTypes}
                            hints={this.state.hints}
                        />
                    ) : null}

                    {this.state.action === "results" ? (
                        <Result
                            scoreboards={this.state.userScoreboards}
                            userLeagues={this.state.userLeagues}
                            friendsLeagues={this.state.friendsLeagues}
                        />
                    ) : null}
                    {this.state.action === "list" ? (
                        <List
                            activeGroup={this.state.activeGroup}
                            object={this.state.object}
                            types={this.state.userTypes}
                            hints={this.state.hints}
                        />
                    ) : null}
                    {this.state.action === "new" &&
                    this.state.object === "player" ? (
                        <Newplayer
                            types={this.state.userTypes}
                            hints={this.state.hints}
                        />
                    ) : null}
                    {this.state.action === "new" &&
                    this.state.object === "league" ? (
                        <Newleague hints={this.state.hints} />
                    ) : null}
                    {this.state.action === "new" &&
                    this.state.object === "scoreboard" ? (
                        <Newscoreboard
                            types={this.state.userTypes}
                            hints={this.state.hints}
                        />
                    ) : null}
                </Switch>
                <div
                    className={"hints-toggle"}
                    onClick={() => this.hintsToggle()}
                >
                    {this.state.hints === true ? <p>Hints On</p> : "Hints Off"}
                </div>
            </div>
        );
    }
}
export default Battlemind;
