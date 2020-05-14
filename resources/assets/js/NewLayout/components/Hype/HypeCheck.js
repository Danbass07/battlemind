import React, { Component } from "react";
import styled from "styled-components";
import * as HypeFunctions from "./HypeFunctions.js";

let TableWrapper = styled.div`
    width: 100%;
    overflow: scroll;
    margin: auto auto;
    height: 89%;
    word-break: break-word;
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
    table(data) {
        return (
            <TableWrapper>
                <table style={{ height: "90%" }}>
                    <tbody className="">
                        {data.map(type => {
                            return (
                                <tr key={type.id + " " + type.hype}>
                                    <td
                                        style={{
                                            width: "220px"
                                        }}
                                    >
                                        {type.type}
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
        );
    }
    render() {
        let Button = styled.button`
            width: 100%;
            height: 39px;
            background-color: ${this.props.theme.colorFive};
            color: ${this.props.theme.colorThree};
        `;
        let votingActive;
        let MainWrapper = styled.div``;
        let activeUsersRating;
        let group;
        let data;
        let votingList = [];
        let topList = [];
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
                            this.props.data.category
                            ? type
                            : null;
                    })
                    .sort(HypeFunctions.compareValues("totalHype", false))
            ];

            let votingList = [...data];

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

            votingActive = this.props.group.votes.filter(vote => {
                return vote.active ? vote : null;
            });
        } else {
            activeUsersRating = [];
            data = [];
        }
        return (
            <MainWrapper>
                <React.Fragment>
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

                    {group ? this.table(data) : null}
                </React.Fragment>
                {this.props.data.category === "main" ? (
                    <Button
                        onClick={() =>
                            this.setUpVote(topList, this.props.group.id)
                        }
                    >
                        Set vote
                    </Button>
                ) : null}
            </MainWrapper>
        );
    }
}
export default HypeCheck;
