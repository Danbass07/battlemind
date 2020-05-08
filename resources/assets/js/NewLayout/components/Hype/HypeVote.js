import React, { Component } from "react";
import styled from "styled-components";

let Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: scroll;
    margin: auto auto;
`;
let Voting = styled.div`
    width: 415px;
    height: 300px;
    background-image: url(/images/voting.jpg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin: auto auto;
`;

class HypeVote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeVote: {
                data: [
                    {
                        id: 0,
                        name: "loading",
                        votersId: []
                    }
                ]
            },
            voting: true
        };
    }
    componentDidMount() {
        if (this.props.middleSectionMoveValue === -1) {
            this.getData();
        }
        // this.Interval = setInterval(() => {
        //     let middleSectionMoveValue = this.props.middleSectionMoveValue;
        //     if (middleSectionMoveValue === -1) {
        //         this.getData();
        //     } else {
        //         clearInterval(this.Interval);
        //     }
        // }, 5000);
    }
    componentWillUnmount() {
        // clearInterval(this.Interval);
    }
    getData() {
        axios.get(`/vote/votecheck/${this.props.group.id}`).then(response => {
            let activeVoteDetails = response.data.activeVoteDetails;
            activeVoteDetails !== null
                ? (activeVoteDetails.data = JSON.parse(activeVoteDetails.data))
                : null;

            this.setState({
                activeVote: activeVoteDetails,
                voting: false
            });
        });
    }
    componentDidUpdate() {}

    displayVote() {
        let activeVote = this.props.group.votes.filter(vote => {
            return vote.active ? vote : null;
        });
        if (activeVote.length !== 0) return;
    }

    castVote(typeId, userId) {
        this.setState({
            voting: true
        });
        axios.put(`/vote/castvote/${this.props.group.id}`, {
            userId: userId,
            typeId: typeId
        });
        this.getData();
    }

    render() {
        const style1 = { color: "black", fontSize: "28px" };
        const style2 = { color: "white", fontSize: "36px" };
        // console.log(this.state);
        return !this.state.voting ? (
            <Wrapper>
                {this.state.activeVote.data.map(candidate => {
                    candidate.choosen = false;
                    candidate.votersId.map(id => {
                        if (id == this.props.userId) {
                            candidate.choosen = true;
                        }
                    });
                    return (
                        <div
                            style={!candidate.choosen ? style1 : style2}
                            key={candidate.id}
                            onClick={() => {
                                this.castVote(candidate.id, this.props.userId);
                            }}
                        >
                            {candidate.name}
                        </div>
                    );
                })}
            </Wrapper>
        ) : (
            <Voting />
        );
    }
}

export default HypeVote;
