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
            action: "event",
            object: "none",
            types: [{ id: 0, type: "test" }],
            userTypes: [1,2],
            allTypes: [1,1],
            scoreboards: [],
            userPlayers: [{}],
            leagues: [{}],
            user: {
                groups: []
            },
            groups: [{}],
            userGroups: [{}],
            message: [
                [
                    "Welcome to the Battlemind. First you need players. They are your armies, teams or simply yourself."+
                    " All depend what you play and what scores you want to store and compare with your friends. You can switch off hint in profile menu."
                ],
                ["Second Message"],
                ["Third Message"]
            ],
            messageNumber: 0,
            result: [],
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
        axios.get("/types/hypecheck/2");
        axios.get("/types").then(response =>{
            const    userTypes = [...response.data.userTypes]
            userTypes.forEach( userType => {
                
                    if (userType.users.length !== 0) {
                       
                        userType.users.map(user => {
                            if (response.data.user.id === user.id) {
                                userType.hype = user.pivot.hype;
                     
                            }
                        })
                        
                    } else { userType.hype = 5 }
                    this.setState({
                        userTypes:  [...userTypes],
                        types: [...response.data.allTypes],
                        
                    })
                })
            })

        axios.get(`/users`).then(response =>
            this.setState({
                user: { ...response.data }
            })
        );
        axios.get(`/scoreboards`).then(response =>
            this.setState({
                scoreboards: response.data.content[0],
                FriendsScoreboards: response.data.content[1],
            })
        );
        axios.get("/players",  ).then(response =>
            this.setState({
                userPlayers: [...response.data.content[0]],
                friendsPlayers: [...response.data.content[1]],
            })
        );
        axios.get("/leagues").then(response =>
            this.setState({
                leagues: [...response.data.content[1]]
            })
        );
        axios.get(`/groups`).then(response =>
            this.setState({
                groups: [...response.data.groups]
            })
        );
    }

    contains(a, obj) {
       if (typeof a === 'object'){
        for (var i = 0; i < a.length; i++) {
            if (a[i].id === obj.id) {
                return true;
            }
        }
        return false;
       }  else { console.log(a)}
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

    componentDidMount() {
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
               <Switch>


<Route exact path="/players/:id/edit" component={Player}></Route>
<Route exact path="/leagues/:id/edit" component={League}></Route>
<Route exact path="/scoreboards/:id/edit" component={Scoreboard}></Route>

                {this.state.action === "hype"  ? (
                    <Hypenotizer
                    userTypes={this.state.userTypes}
                    navigation={this.state.object}/>
                ) : null}
      
                {this.state.action === "profile" ? (
                    <Profile
                        user={this.state.user}
                        groups={this.state.groups}
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
                        scoreboards={this.state.scoreboards}
                        userPlayers={this.state.userPlayers}
                        leagues={this.state.leagues}
                        type={this.state.type}
                    />
                ) : null}

                {this.state.action === "results" ? (
                    <Result
                        scoreboards={this.state.scoreboards}
                        leagues={this.state.leagues}
                    />
                ) : null}
                {this.state.action === "list" ? (
                    <List 
                    object={this.state.object}
                    types={this.state.types} />
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
