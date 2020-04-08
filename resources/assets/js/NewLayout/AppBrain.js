import React, { Component } from "react";
import ReactDOM from "react-dom";
import AppBody from "./AppBody";

class AppBrain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "loading",
                groups: [{ id: 0, users: [], types: [] }]
            },
            activeGroupIndex: 0
        };
    }
    hypeLevelHandler(e, typeId) {
        const user = { ...this.state.user };

        user.groups[this.state.activeGroupIndex].users
            .filter(user => user.id === this.state.user.id)[0]
            .types.filter(type => type.id === typeId)[0].pivot.hype =
            e.target.value;

        axios.post(`/hype/hypenotizerrr`, {
            typeId: typeId,
            value: e.target.value
        });
    }
    componentDidMount() {
        this.getUserContent();
    }
    activeGroupChange() {
        if (this.state.user.groups.length - 1 > this.state.activeGroupIndex) {
            this.setState({
                activeGroupIndex: this.state.activeGroupIndex + 1
            });
        } else {
            this.setState({
                activeGroupIndex: 0
            });
        }
    }
    getUserContent() {
        axios.get(`/users`).then(response => {
            if (response.data.user.groups.length === 0) {
                response.data.user.groups = [{ id: 0, users: [], types: [] }];
            }
            this.setState({
                user: { ...response.data.user }
            });
        });
    }
    setUpVote(votingList) {
        this.setState({
            votingList: votingList
        });
    }
    demo() {
        axios.get(`/groups/3/addUser/${this.state.user.id}`).then(() => {
            this.getUserContent();
        });
    }
    addType(e, value) {
        e.preventDefault();
        axios
            .post("/types", {
                type: value.value,
                groupId: this.state.user.groups[this.state.activeGroupIndex].id
            })
            .then(() => {
                this.getUserContent();
            });
    }
    render() {
        return (
            <AppBody
                addType={(e, value) => this.addType(e, value)}
                setUpVote={votingList => this.setUpVote(votingList)}
                hypeLevelHandler={(e, typeId) =>
                    this.hypeLevelHandler(e, typeId)
                }
                data={this.state}
                activeGroupChange={() => this.activeGroupChange()}
                demo={() => this.demo()}
            />
        );
    }
}

export default AppBrain;

if (document.getElementById("AppBrain")) {
    ReactDOM.render(<AppBrain />, document.getElementById("AppBrain"));
}
