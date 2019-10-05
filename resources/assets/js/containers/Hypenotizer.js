import React, { Component } from "react";
import Hypeset from "../components/Hypenotizer/Hypeset";
import Hypecheck from "../components/Hypenotizer/Hypecheck";
import Hypevote from "../components/Hypenotizer/Hypevote";

class Hypenotizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hypeLevels: [1, 2, 3, 4],
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

    // contains(a, obj) {
    //     if (typeof a === "object") {
    //         for (var i = 0; i < a.length; i++) {
    //             if (a[i].id === obj.id) {
    //                 return true;
    //             }
    //         }
    //         return false;
    //     } else {
    //         console.log(a);
    //     }
    // }

    // hypeLevelHandler(e, userType) {
    //     let userTypes = [...this.state.userTypes];
    //     userTypes.forEach(type => {
    //         if (type === userType) {
    //             type.hype = +e.target.value;
    //         }
    //     });
    //     this.setState({
    //         userTypes: [...userTypes]
    //     });
    // }

    // hypenotizer() {
    //     axios.post(`/hype/hypenotizer`, {
    //         userTypes: [...this.state.userTypes]
    //     });
    // }

    // componentDidMount() {
    //     this.setState({
    //         userTypes: [...this.props.userTypes]
    //     });
    // }

    render() {
        return (
            <React.Fragment>
                    <div className={this.props.hints === true ? "info-bar" : "info-bar-off"}>
                        Hello <h1>{this.props.user.name}</h1>Here we can show what and how much we like games in our Club.
                        1 - don't like ; 2 - I can play if my friends if they really want to ; 3 - I like the game; 
                        4 - I like it so much my friend's must like it too :-)
                    </div>
                {this.props.navigation === "Hypeset" ? (
                    <Hypeset
                        user={this.props.user}
                        userTypes={this.props.userTypes.sort(
                            this.compareValues("type")
                        )}
                        hypeLevels={this.state.hypeLevels}
                        hypeLevelHandler={(e, userType) =>
                            this.hypeLevelHandler(e, userType)
                        }
                        hypenotizer={() => this.props.hypenotizer()}
                        hypeLevelHandler={(e, userType) => this.props.hypeLevelHandler(e, userType)}
                    />
                ) : null}

                {this.props.navigation === "Hypecheck" ? (
                    <Hypecheck
                        user={this.props.user}
                        userTypes={this.props.userTypes.sort(this.compareValues("totalHype"))}
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
