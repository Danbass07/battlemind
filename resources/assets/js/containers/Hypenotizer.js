import React, { Component } from "react";
import Hypeset from "../components/Hypenotizer/Hypeset";
import Hypecheck from "../components/Hypenotizer/Hypecheck";
import Hypevote from "../components/Hypenotizer/Hypevote";

class Hypenotizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hypeLevels: [1, 2, 3, 4],
            userTypes: [],
            votingList: []
        };
    }
    compareValues(key, ascending = false) {
        return function(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }

            const varA =
                typeof a[key] === "string" /// letter case insensitive
                    ? a[key].toUpperCase()
                    : a[key];
            const varB =
                typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return ascending == false ? comparison * -1 : comparison;
        };
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

    hypeLevelHandler(e, userType) {
        console.log(e.target.value);
        let userTypes = [...this.state.userTypes];
        userTypes.forEach(type => {


                if (type === userType) {
                    type.hype = +e.target.value;
                }
                                    

           
        });
               
        this.setState({
            userTypes: [...userTypes]
        });
    }
    hypenotizer() {
        axios
            .post(`/hype/hypenotizer`, {
                userTypes: [...this.state.userTypes]
            })
            .then(response => console.log(response));
    }

    componentDidMount() {
        let userTypes = [...this.props.userTypes];


        // userTypes.map(userType => {
        //     userType.users.map(typeUser => {
        //         if (typeUser.id === this.props.user.id) {
        //             userType.hype = typeUser.pivot.hype;
        //         }
        //     });
        // });

        userTypes.forEach(userType => {
            if (!userType.hype) {
                userType.hype = 3;
            }
            let totalHype = 0;
            userType.users.forEach(user => {
                totalHype += user.pivot.hype;
            });
            userType.totalHype = totalHype;
            userType.average = (totalHype / userType.users.length).toFixed(1);
        });
        
        
        this.setState({
            userTypes: [...userTypes]
        });
    }

    render() {
        console.log(this.state.userTypes.sort(this.compareValues("type")));
        return (
            <React.Fragment>
                {this.props.navigation === "Hypeset" ? (
                    <Hypeset
                        user={this.props.user}
                        userTypes={this.state.userTypes.sort(this.compareValues("type"))}
                        hypeLevels={this.state.hypeLevels}
                        hypeLevelHandler={(e, userType) =>
                            this.hypeLevelHandler(e, userType)
                        }
                        hypenotizer={() => this.hypenotizer()}
                    />
                ) : null}

                {this.props.navigation === "Hypecheck" ? (
                    <Hypecheck
                        userTypes={this.state.userTypes}
                        groups={this.props.groups}
                    />
                ) : null}

                {/* {this.props.navigation === "Hypevote" ? (
                    <Hypevote
                        votingList={this.state.votingList}
                        hypeLevels={this.state.hypeLevels}
                        voteOptions={() => this.voteOptions()}
                    />
                ) : null} */}
            </React.Fragment>
        );
    }
}
export default Hypenotizer;
