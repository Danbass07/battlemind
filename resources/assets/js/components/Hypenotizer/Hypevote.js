import React, { Component } from "react";

class Hypevote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    componentDidMount() {
        axios.get(`/vote/votecheck/${this.props.activeGroup}`).then(response => {
            console.log(response.data);
            this.setState({
                data: response.data,
            })
        })
    }

  
    render() {
        // voting will be cast by first who click he need to finish or cancel to let anyone else do anything but voting
        const style = {
            color: "white"
        };
        return (
            <div className={"hype-vote-wrapper"}>
                <h1 style={style}>HYPEVOTE </h1>
            {/* {this.state.data.map(candidate => {
                return (
                    <div key={candidate.id}>{candidate.type}</div>
                )
            })} */} <h1 style={style}>{this.state.data.type}</h1>
            
            </div>
        );
    }
}

export default Hypevote;
