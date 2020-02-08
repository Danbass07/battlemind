import React, { Component } from "react";
import ReactDOM from "react-dom";
import AppBody from "./AppBody";


class AppBrain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: 'loading',
                groups: [{id: 0}]
            },
            activeGroupIndex: 0,
        }
    }
    componentDidMount() {
        this.getUserContent();
    }
    activeGroupChange() {
        if (this.state.user.groups.length-1 > this.state.activeGroupIndex) {
            this.setState({
                activeGroupIndex: this.state.activeGroupIndex+1,
            })
        } else {
            this.setState({
                activeGroupIndex: 0,
            })
        }
    }
    getUserContent() {
        axios.get(`/users`).then(response =>
            this.setState(
                {
                    user: { ...response.data.user },
               
                },
                
            
            )
        );
    }
    render() {
//console.log(this.state);
        return (
           
                <AppBody 
                data={this.state}
                activeGroupChange={() => this.activeGroupChange()}
                />
           
        );
    }
}

export default AppBrain;

if (document.getElementById('AppBrain')) {
    ReactDOM.render(<AppBrain />, document.getElementById('AppBrain'));
}