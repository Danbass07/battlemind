import React, { Component } from "react";

class Hypevote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                data: []
            }
        };
    }
    componentDidMount() {}

    render() {
        return (
            <div className={"hype-vote-wrapper"}>
                {this.props.votingList
                    ? this.props.votingList.data.map(type => {
                          return (
                              <div className={"hype-row"}>
                                  <div
                                      className={"hype-type-bubble"}
                                      key={type.name}
                                  >
                                      <div
                                         className={"hype-type-bubble-type-name"}
                                          onClick={() =>
                                              this.props.castVote(
                                                  type.id,
                                                  this.props.user.id
                                              )
                                          }
                                      >
                                          {type.name} 
                                          {/* type name????? */}
                                      </div>
                                      <div className={"vote-bubble-voters-names"}>
                                      {type.votersId ? type.votersId.map(voter => {
                                          return this.props.group.users.map(
                                              user => {
                                                  if (user.id === voter) {
                                                      return (
                                                          <div className={"vote-bubble-voter-name"} key={voter}>
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
                                  <div className={"hype-vote-count"}>{type.votersId ? type.votersId.length : null}</div>
                              </div>
                          );
                      })
                    : null}
                <div className={"close-vote"} onClick={() => this.props.closeVote()}>Close Vote</div>
            </div>
        );
    }
}

export default Hypevote;
