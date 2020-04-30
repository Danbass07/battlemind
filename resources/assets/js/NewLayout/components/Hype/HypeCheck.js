import React, { Component } from "react";
import styled from "styled-components";
import * as HypeFunctions from "./HypeFunctions.js";

let Button = styled.button`
    width: 80px;
    height: 100%;
    background-color: green;
    writing-mode: vertical-rl;
    text-orientation: upright;
`;

class HypeCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            click: true,
            exludeLevel: 0
        };
    }

    componentDidMount() {
        // console.log(this.props.group);
    }

    setUpVote(votingList, groupId) {
        HypeFunctions.setUpVote(votingList, groupId);
    }

    render() {
        let TableWrapper = styled.div`
            width: 60%;
            height: 100%;
            overflow: scroll;
            margin: auto auto;
        `;
        let activeUsersRating;
        let group;
        let data;
        let votingList = [];
        if (this.props) {
            group = { ...this.props.group };
            let zeroRated = [];

            activeUsersRating = group.users
                .map(user => {
                    return user.pivot.active ? user : null;
                })
                .filter(Boolean);

            group.types.map(type => {
                if (type.details) {
                    if (!type.details.category) {
                        type.details = JSON.parse(type.details);
                    }
                }

                let totalHype = 0;
                if (this.state.onlyOne) {
                    activeUsersRating = [...this.state.theOne];
                }
                activeUsersRating.map(user => {
                    return user.types.map(userType => {
                        if (userType.id === type.id) {
                            totalHype += +userType.pivot.hype;
                            if (
                                +userType.pivot.hype === this.state.exludeLevel
                            ) {
                                zeroRated.push(type);
                            }
                        }
                    });
                });
                type.totalHype = totalHype;
            });

            data = [
                ...group.types
                    .filter(type => {
                        return !zeroRated.includes(type) ? type : null;
                    })
                    .filter(type => {
                        return type.details.category ===
                            this.props.user.category
                            ? type
                            : null;
                    })
                    .sort(HypeFunctions.compareValues("totalHype", false))
            ];

            let votingList = [...data];

            let firstPlace = null;
            let topList = [];
            votingList.map((candidate, index) => {
                // console.log(candidate)
                return topList.length < 3
                    ? topList.push(candidate)
                    : topList[index - 1]
                    ? topList[index - 1].totalHype === candidate.totalHype
                        ? topList.push(candidate)
                        : null
                    : null;
            });
            votingList = topList;

            // votingList.sort(HypeFunctions.compareValues('totalHype', false)).slice(0,3);
        } else {
            activeUsersRating = [];
            data = [];
        }

        return (
            <React.Fragment>
                {/* {console.log(votingList)} */}
                {/* <Button
                    onClick={() =>
                        this.setUpVote(votingList, this.props.group.id)
                    }
                >
                    Set vote on what we should play
                </Button> */}

                {/* <div className={""}>
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
                </div> */}

                {group ? (
                    <TableWrapper>
                        <table>
                            <tbody className="">
                                {!group.types
                                    ? data.map((type, index) => {
                                          if (index < 3) {
                                              return (
                                                  <tr
                                                      key={
                                                          type.id +
                                                          " " +
                                                          type.hype
                                                      }
                                                  >
                                                      <td> {type.type} </td>
                                                  </tr>
                                              );
                                          }
                                      })
                                    : data.map(type => {
                                          return (
                                              <tr
                                                  key={
                                                      type.id + " " + type.hype
                                                  }
                                              >
                                                  <td
                                                      style={{
                                                          width: "220px"
                                                      }}
                                                  >
                                                      {type.type}{" "}
                                                  </td>

                                                  <td
                                                      style={{
                                                          marginLeft: "auto"
                                                      }}
                                                  >
                                                      {type.totalHype}
                                                  </td>
                                                  <td
                                                      style={{
                                                          marginLeft: "20px"
                                                      }}
                                                  >
                                                      {type.average}
                                                  </td>
                                              </tr>
                                          );
                                      })}
                            </tbody>
                        </table>
                    </TableWrapper>
                ) : null}
            </React.Fragment>
        );
    }
}
export default HypeCheck;
