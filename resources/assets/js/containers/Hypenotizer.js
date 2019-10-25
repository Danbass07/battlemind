import React, { Component } from "react";
import Hypeset from "../components/Hypenotizer/Hypeset";
import Hypecheck from "../components/Hypenotizer/Hypecheck";
import Hypevote from "../components/Hypenotizer/Hypevote";
import Axios from "axios";

class Hypenotizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hypeLevels: [1, 2, 3, 4],     
            votingList:[]       
        };
    }
  
    componentDidUpdate(prevProps) {
   
    }
    componentDidMount() {
       
    }
    castVote(data) {
        axios
        .post("/vote/setUpVote", {
            data: JSON.stringify(data),
            group_id:this.props.activeGroup,
      
        })
        .then(() => {
            this.setState({
                votingList: data,
            })
        });
      
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
                        group={this.props.groups[this.props.activeGroupIndex]}
                        hypeLevels={this.state.hypeLevels}
                        hypenotizer={() => this.props.hypenotizer()}
                        hypeLevelHandler={(e, typeId) => this.props.hypeLevelHandler(e, typeId)}
                        activeGroup={this.props.activeGroup}
                    />
                ) : null}

                {this.props.navigation === "Hypecheck" ? (
                    <Hypecheck
                        user={this.props.user}
                       // userTypes={this.props.userTypes.sort(this.compareValues("totalHype"))}
                        group={this.props.group}
                        activeGroup={this.props.activeGroup}
                        castVote={(data) => this.castVote(data)}
                    />
                ) : null}

                {this.props.navigation === "Hypevote" ? (
                    <Hypevote
                    activeGroup={this.props.activeGroup}
                    />
                ) : null}
            </React.Fragment>
        );
    }
}
export default Hypenotizer;
