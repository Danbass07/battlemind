import React, { Component } from "react";

class Hypevote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votingOptions: [1, 2, 3, 4],
            voteStage: 0
        };
    }
    componentDidMount() {
        // axios.get(`/vote/stage)
    }

    voteStageController(voteStage) {
        this.setState({
            voteStage: voteStage
        });
    }
    render() {
        // voting will be cast by first who click he need to finish or cancel to let anyone else do anything but voting
        const style = {
            color: "white"
        };
        return (
            <div className={"hype-vote-wrapper"}>
                <h1 style={style}>HYPEVOTE </h1>

                <div className={"main-area"}>
                    {this.state.voteStage === 0 ? (
                        <div className="none">
                            <h1>Prepare to vote</h1>
                            <div className={"options"}>
                                <div>
                                    remove games hype 1 by someone
                                    <input
                                        type="checkbox"
                                        name="ones"
                                        value="false"
                                        onClick={(e) => this.props.voteOptions(e)}
                                    />
                                </div>
                                <div>
                                    remove winner from last vote
                                    <input
                                        type="checkbox"
                                        name="winner"
                                        value="false"
                                        onClick={(e) => this.props.voteOptions(e)}
                                    />
                                </div>
                            </div>
                            <div>
                                {this.props.userTypes.map((type,index) => {
                                  return index < 5 ?  <div key={index}>{type.type}</div> : null
                                })}
                            </div>
                        </div>
                    ) : null}

                    {this.state.voteStage === 1 ? (
                        <div className="none">
                            <h1>Vote</h1>
                        </div>
                    ) : null}

                    {this.state.voteStage === 2 ? (
                        <div className="none">
                            <h1>See Results</h1>
                        </div>
                    ) : null}
                </div>

                <div className={"buttons-area"}>
                    {this.state.voteStage !== 0 ? (
                        <button
                            onClick={() =>
                                this.voteStageController(
                                    +this.state.voteStage + -1
                                )
                            }
                        >
                            PREVIOUS
                        </button>
                    ) : null}
                    {this.state.voteStage !== 2 ? (
                        <button
                            onClick={() =>
                                this.voteStageController(
                                    +this.state.voteStage + 1
                                )
                            }
                        >
                            NEXT
                        </button>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default Hypevote;
