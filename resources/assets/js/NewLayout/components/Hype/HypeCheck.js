import React, { Component } from "react";
import styled from "styled-components";

class HypeCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            click: true,
            exludeLevel: 0
        };
    }
    componentDidMount() {}

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
    setUpVote(votingList) {
        const activeVoteDetails = votingList.map(type => {
            return (type = {
                id: type.id,
                name: type.type,
                votersId: [],
                winner: false
            });
        });
        axios
            .post("/vote/setUpVote", {
                data: JSON.stringify(activeVoteDetails),
                group_id: this.props.group.id
            })
      
    }
    checkPlayerRating(user) {
        let theOne = [];
        theOne.push(user);
        this.setState({
            theOne: theOne,
            onlyOne: !this.state.onlyOne
        });
    }

    render() {
        let group = { ...this.props.group };
        let zeroRated = [];

        let activeUsersRating = group.users
            .map(user => {
                return user.pivot.active ? user : null;
            })
            .filter(Boolean);

        group.types.map(type => {
            let totalHype = 0;
            if (this.state.onlyOne) {
                activeUsersRating = [...this.state.theOne];
            }
            activeUsersRating.map(user => {
                return user.types.map(userType => {
                    if (userType.id === type.id) {
                        totalHype += +userType.pivot.hype;
                        if (+userType.pivot.hype === this.state.exludeLevel) {
                            zeroRated.push(type);
                        }
                    }
                });
            });
            type.totalHype = totalHype;
        });

        let data = [
            ...group.types
                .filter(type => {
                    return !zeroRated.includes(type) ? type : null;
                })
                .sort(this.compareValues("totalHype", false))
        ];

        let votingList = [...data];

        let firstPlace = null;
        let topList = [];
        votingList.map((candidate, index) => {
            // console.log(candidate)
            topList.length < 3
                ? topList.push(candidate)
                : topList[index - 1]
                ? topList[index - 1].totalHype === candidate.totalHype
                    ? topList.push(candidate)
                    : console.log("list is full")
                : null;
        });
        votingList = topList;
       
        // votingList.sort(this.compareValues('totalHype', false)).slice(0,3);

        const Button = styled.button``;

        return (
            <React.Fragment>
                {this.props.user.user.id === 1 ? (
                    <Button onClick={() => this.setUpVote(votingList)}>
                        CAST VOTE{" "}
                    </Button>
                ) : null}

                <div className={""}>
                    {activeUsersRating.map(user => {
                        return (
                            <div
                                className={""}
                                onClick={() => this.checkPlayerRating(user)}
                                key={user.name}
                            >
                                {user.name}
                            </div>
                        );
                    })}
                </div>

                {group.types ? (
                    <table className="">
                        <tbody className="">
                            {!group.types
                                ? data.map((type, index) => {
                                      if (index < 3) {
                                          return (
                                              <tr
                                                  key={
                                                      type.id + " " + type.hype
                                                  }
                                              >
                                                  <td>{type.type}</td>
                                              </tr>
                                          );
                                      }
                                  })
                                : data.map(type => {
                                      return (
                                          <tr key={type.id + " " + type.hype}>
                                              <td>{type.type}</td>

                                              <td
                                                  style={{ marginLeft: "auto" }}
                                              >
                                                  {type.totalHype}
                                              </td>
                                              <td
                                                  style={{ marginLeft: "20px" }}
                                              >
                                                  {type.average}
                                              </td>
                                          </tr>
                                      );
                                  })}
                        </tbody>
                    </table>
                ) : null}
            </React.Fragment>
        );
    }
}
export default HypeCheck;
