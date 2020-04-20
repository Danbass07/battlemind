import React, { Component } from "react";
import ReactDOM from "react-dom";
import AppBody from "./AppBody";
import { hypeLevelHandler } from "./Functions.js";

class AppBrain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "loading",
                groups: [
                    {
                        id: 0,
                        users: [],
                        types: [
                            { type: "Select Game to Edit and Click this to " }
                        ]
                    }
                ]
            },
            activeGroupIndex: 0,
            editedTypeIndex: 0,
            details: "main" //// globalChange for type displaying (might CHANGE!!!) always check if something not work
        };
    }

    hypeLevelHandler(e, typeId) {
        const data = hypeLevelHandler(
            e,
            typeId,
            this.state.user,
            this.state.activeGroupIndex
        );
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
    selectTypeToEdit(index) {
        this.setState({
            editedTypeIndex: index
        });
    }
    detailsController() {
        if (this.state.details === "main") {
            this.setState({
                details: "small"
            });
        } else {
            this.setState({
                details: "main"
            });
        }
    }
    addType(e, value) {
        e.preventDefault();
        axios
            .post("/types", {
                type: value,
                groupId: this.state.user.groups[this.state.activeGroupIndex].id,
                details: this.state.details
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
                editedData={
                    this.state.user.groups[this.state.activeGroupIndex].types[
                        this.state.editedTypeIndex
                    ]
                }
                activeGroupChange={() => this.activeGroupChange()}
                demo={() => this.demo()}
                detailsController={() => this.detailsController()}
                selectTypeToEdit={index => this.selectTypeToEdit(index)}
                refreshData={() => this.getUserContent()}
            />
        );
    }
}

export default AppBrain;

if (document.getElementById("AppBrain")) {
    ReactDOM.render(<AppBrain />, document.getElementById("AppBrain"));
}
