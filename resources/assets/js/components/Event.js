import React, { Component } from "react";

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: 12,
            renderTables: [],
            tableInfo: [
                {
                    type: "NAME OF THE GAME",
                    usersPlaying: [
                        {
                            name: "user1"
                        },
                        {
                            name: "user2"
                        },
                        {
                            name: "user3"
                        },
                        {
                            name: "user4"
                        }
                    ]
                }
            ]
        };
    }
    componentDidMount() {
        this.renderTables();
    }
    renderTables() {
        let i;
        let tables = [];
        for (i = 0; i < this.state.tables; i++) {
            let a = i+1
            tables.push(
                <div key={"table " + i} className={"table tag" + i}>
                    <div className={"event-table-title"}>
                        {this.state.tableInfo[0].type +" "+ a}
                    </div>
                    {this.state.tableInfo[0].usersPlaying.map(user => {
                        return (
                            <div className={"event-table-user element1"}>
                                <div>{user.name} </div>
                                <div>Choose his player </div>
                            </div>
                        );
                    })}
                </div>
            );
        }
        this.setState({
            renderTables: tables
        });
        return tables;
    }

    render() {
        return (
            <div className={"venue-area"}>
                {this.state.renderTables.map(item => {
                    return item;
                })}
            </div>
        );
    }
}
export default Event;
