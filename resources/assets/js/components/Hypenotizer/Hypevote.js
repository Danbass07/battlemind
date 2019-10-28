import React, { Component } from "react";

class Hypevote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                data:[]
            },
        };
    }
    componentDidMount() {
    
    }


    render() {
        // voting will be cast by first who click he need to finish or cancel to let anyone else do anything but voting
        const style = {
            color: "white"
        };
        return (
            <div className={"hype-vote-wrapper"}>
                <h1 style={style}>HYPEVOTE </h1>
            {this.props.votingList ? this.props.votingList.data.map(type => {
                return (
                    <div key={type.name}>
                    
                    <div onClick={() => this.props.castVote(type.id, this.props.user.id)}>{type.name}</div>
                     {type.votersId.map(voter => {
                    return    this.props.group.users.map(user => {
                            if(user.id === voter) {
                                return (
                                    <div key={voter}>
                                    <div>{user.name}</div>
                                    
                                    </div>
                                )
                            }
                        })
                       
                     })}
                    <div>{type.votersId.length}</div>
                    </div>
                )
            }): null} 
             <div onClick={() => this.props.closeVote()}>Close Vote</div>
            </div>
           
        );
    }
}

export default Hypevote;
