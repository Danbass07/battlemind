import React, { Component } from "react";
import Hypeset from "../components/Hypenotizer/Hypeset";
import Hypecheck from "../components/Hypenotizer/Hypecheck";
import Hypevote from "../components/Hypenotizer/Hypevote";

class Hypenotizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hypeLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
    // voteOptions() {
    //     if (
    //         JSON.stringify(
    //             this.state.userTypes.slice(0, 5).map(type => type.type)
    //         ) == JSON.stringify(this.state.votingList.map(type => type.type))
    //     ) {
    //         let votingList = [...this.state.userTypes];
    //         let ignoreList = [];
    //         this.state.userTypes.map(type => {
    //             return type.users.map(user => {
    //                 return user.pivot.hype == 1 ? ignoreList.push(type) : null;
    //             });
    //         });
    //         ignoreList = [...new Set(ignoreList)];
    //         console.log(ignoreList);
    //         votingList = votingList
    //             .filter(function(n) {
    //                 return ignoreList.indexOf(n) > -1 ? false : n;
    //             })
    //             .slice(0, 5)
    //             .map(candidate => {
    //                 return {
    //                     type: candidate.type,
    //                     votes: 0,
    //                     usersVoted: []
    //                 };
    //             });
    //         console.log(votingList);

    //         this.setState({
    //             votingList: [...votingList]
    //         });
    //     } else {
    //         this.setState({
    //             votingList: [...this.props.userTypes.slice(0, 5)]
    //         });
    //     }
    // }
    hypeLevelHandler(e, userType) {
        let userTypes = [...this.state.userTypes];
        userTypes.forEach(stateUserType => {
            if (stateUserType === userType) {
                stateUserType.hype = +e.target.value;
            }
        });
    }
    hypenotizer() {
        axios.post(`/hype/hypenotizer`, {
            userTypes: this.state.userTypes
        }).then(response => console.log(response));
    }

    componentDidMount() {
       

        let userTypes = [...this.props.userTypes];
        userTypes.map(userType => {
            userType.users.map(typeUser => {
                if (typeUser.id === this.props.user.id) {
                    userType.hype = typeUser.pivot.hype;
                    // console.log(typeUser.pivot.hype);
                }
       
            });
        });


        console.log(userTypes);
        userTypes.forEach(userType => {
            if (!userType.hype) {
                userType.hype = 5;
           }
        //    console.log(this.props.user)
        //    console.log(userType.users)
                if (!userType.users.includes(this.props.user)) {
                    // userType.hype = 5;
                    console.log('do not contain')
                }
            
            let totalHype = 0;
            userType.users.forEach(user => {
                totalHype += user.pivot.hype;
            });
            userType.totalHype = totalHype;
            userType.average = (totalHype / userType.users.length).toFixed(1);
        });
        this.props.userTypes.sort(this.compareValues("totalHype"));


        this.setState({
            userTypes: [...userTypes],
            //listSelected: [...userTypes],
            // votingList: votingList
        });




        // userTypes.forEach(userType => {
        //     if (!userType.hype) {
        //         userType.hype = 5;
         //   }
        //    console.log(this.props.user)
        //    console.log(userType.users)
                // if (!userType.users.includes(this.props.user)) {
                //     // userType.hype = 5;
                //     console.log('do not contain')
                // }
            
        //     let totalHype = 0;
        //     userType.users.forEach(user => {
        //         totalHype += user.pivot.hype;
        //     });
        //     userType.totalHype = totalHype;
        //     userType.average = (totalHype / userType.users.length).toFixed(1);
        // });
        // this.props.userTypes.sort(this.compareValues("totalHype"));

        // const votingList = this.props.userTypes.slice(0, 5).map(candidate => {
        //     return {
        //         type: candidate.type,
        //         votes: 0,
        //         usersVoted: []
        //     };
        // });
  
    }
     setUsersToHype($users_exluded) {
    //     let listSelected = [...this.state.userTypes];
    //     listSelected.forEach(userType => {
    //         let totalHype = 0;
    //         userType.users.forEach(user => {
    //             $users_exluded.forEach(user_exluded => {
    //                 if (user_exluded === user.id) {
    //                     totalHype += user.pivot.hype;
    //                 }
    //             });
    //         });
    //         userType.totalHype = totalHype;
    //         userType.average = (totalHype / userType.users.length).toFixed(1);
    //     });
    //     listSelected.sort(this.compareValues("totalHype"));

    //     this.setState({
    //         listSelected: listSelected
    //     });
     }




    render() {
        // console.log(this.state.userTypes);
        return (
            <React.Fragment>


                {this.props.navigation === "Hypeset" ? (
                    <Hypeset
                        userTypes={this.state.userTypes}
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
                        setUsersToHype={data => this.setUsersToHype(data)}
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
