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
        axios.get(`/vote/votecheck/${this.props.activeGroup}`).then(response => {
           
            response.data.data = JSON.parse(response.data.data);
           
            this.setState({
                data: response.data,
            })
        })
    }

    closeVote(){

        axios.put(`/vote/voteclose/${this.props.activeGroup}`).then( () => {
            axios.get(`/vote/votecheck/${this.props.activeGroup}`).then(response => {
           
                response.data.data = JSON.parse(response.data.data);
               
                this.setState({
                    data: response.data,
                })
            })
     
        })
       

    }
    render() {
        // voting will be cast by first who click he need to finish or cancel to let anyone else do anything but voting
        const style = {
            color: "white"
        };
        console.log(this.state)
        return (
            <div className={"hype-vote-wrapper"}>
                <h1 style={style}>HYPEVOTE </h1>
            {this.state.data.data.map(type => {
                return (
                    <div key={type.id}>{type.type}</div>
                )
            })} 
             <div onClick={() => this.closeVote()}>Close Vote</div>
            </div>
           
        );
    }
}

export default Hypevote;
