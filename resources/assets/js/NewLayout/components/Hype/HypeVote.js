import React, { Component } from "react";

class HypeVote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votingList: [
                {
                    name: "loading",
                    votes: ["lading", "loading"]
                }
            ],
            activeVote: {
                data: []
            }
        };
    }
    componentDidMount() {
        this.getData();
        this.interval = setInterval(() => {
            this.getData();
        }, 80000);
    }
    getData() {
        axios.get(`/vote/votecheckk/`).then(response => {
            let activeVoteDetails = response.data.user.groups;

            activeVoteDetails[this.props.groupIndex].votes.map(vote => {
                vote.data = JSON.parse(vote.data);
                if (vote.active) {
                    this.setState({
                        activeVote: vote
                    });
                }
            });
            this.setState({
                votingList: activeVoteDetails
            });
        });
    }

    castVote(typeId, userId) {
        let votingList = [...this.state.votingList.data];
        let voteCount = 0;
        this.state.votingList.map(type => {
            type.votersId.includes(userId) ? (voteCount += +1) : null;
        });

        if (voteCount < 2) {
            let data = [
                ...this.state.votingList.data.map(type => {
                    if (type.id === typeId && !type.votersId.includes(userId)) {
                        /// 3 votes but on different game.
                        type.votersId.push(userId);
                    }
                    return type;
                })
            ];
            votingList = [...data];
            let voteData = JSON.stringify(data);
            axios.put(`/vote/castvote/${this.props.group.id}`, {
                voteData: voteData
            });
            this.setState({
                votingList: votingList
            });
        } else {
            let data = [...this.state.votingList.data];

            data.map(type => {
                type.votersId.map(voterId => {
                    let removedIndx = data.indexOf(voterId);
                    if (typeId === type.id) {
                        type.votersId.splice(removedIndx, 1);
                    }
                });
            });

            votingList = [...data];
            let voteData = JSON.stringify(data);
            axios.put(`/vote/castvote/${this.props.group.id}`, {
                voteData: voteData
            });
            this.setState({
                votingList: votingList
            });
        }
    }
    render() {
        //console.log(this.state.votingList)
        return (
            <div className={""}>
                <div>
                    {this.state.activeVote.data.map(type => {
                        return <div key={type.id}>{type.name} </div>;
                    })}
                </div>

                {/* {this.state.votingList
                    ? this.state.activeVote.map(type => {
                          return (
                              <div className={""}  key={type.name}>
                                  <div
                                      className={""}
                                     
                                  >
                                      <div
                                         className={""}
                                          onClick={() =>
                                              this.castVote(
                                                  type.id,
                                                  this.props.user.id
                                              )
                                          }
                                      >
                                          {type.data} </div></div> */}
                {/* type name VotingList its rearranged from group types type.type */}
                {/* </div>
                                      <div className={""}>
                                      {type.votersId ? type.votersId.map(voter => {
                                          return this.props.group.users.map(
                                              user => {
                                                  if (user.id === voter) {
                                                      return (
                                                          <div className={""} key={voter}>
                                                              <div>
                                                                  {user.name}
                                                              </div>
                                                          </div>
                                                      );
                                                  }
                                              }
                                          );
                                      }) : null}
                                      </div>
                                     
                                      
                                  </div>
                                  <div className={""}>{type.votersId ? type.votersId.length : null}</div>
                              </div>
                          );
                      })
                    : null}
                <div className={""} onClick={() => this.closeVote()}>Close Vote</div> */}
                {/* </div>
         
        )}) : null} */}
            </div>
        );
    }
}

export default HypeVote;
