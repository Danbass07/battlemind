import React, { Component } from "react";

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingPleaseWait: true,
            tables: 12,
            activeEventDetails: {
                
                type: "empty",
                data: [
                    {   

                        users: [[], [], [], []]
                    }
                ]
            },
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
        axios
            .get(`/event/getActiveEvent/${this.props.group.id}`)
            .then(response => {
                console.log(response.data)
                if (response.data.activeEventDetails !== null) {
                    response.data.activeEventDetails.data = JSON.parse(
                        response.data.activeEventDetails.data
                    );
                    this.setState(
                        {
                            loadingPleaseWait: false,
                            activeEventDetails: {
                                ...response.data.activeEventDetails
                            }
                        },
                        this.renderTables(response.data.activeEventDetails)
                    );
                } else {
                    this.setState(
                        {
                            loadingPleaseWait: false,
                            activeEventDetails: {
                               active: false,
                            }
                        }
                    );
                }

            });
    }
    tableGameController(e, table) {
        let activeEventDetails = { ...this.state.activeEventDetails };
        activeEventDetails.data[table.tableNumber].type = e.target.value;
        this.setState({
            activeEventDetails: activeEventDetails
        });
    }
    tableUserController(e, table, index) {
        // console.log(e.target.value);
        // console.log(table);
        // console.log(index);
        let activeEventDetails = { ...this.state.activeEventDetails };
        activeEventDetails.data[table.tableNumber].users[index].name =
            e.target.value;
        this.setState({
            activeEventDetails: activeEventDetails
        });
    }
    closeEvent() {
        let activeEventDetails = {...this.state.activeEventDetails}
        let newData = [];
        let i;
        for (i = 0; i < this.state.tables; i++) {
            let table = {
                tableNumber: i,
                type: "empty",
                users: [ {
                    id: 0,
                    name: 'empty'
                },{
                    id: 0,
                    name: 'empty'
                }, {
                    id: 0,
                    name: 'empty'
                }, {
                    id: 0,
                    name: 'empty'
                }, ]
            };
            newData.push(table);
        }
        activeEventDetails.data = newData;
        activeEventDetails.active = false;
        this.setState({
            activeEventDetails:  activeEventDetails
                
        });
        axios
        .put(`/event/closeActiveEvent/${this.props.group.id}`);
    }
    
    saveEvent() {
        axios
        .put(`/event/updateActiveEvent/${this.props.group.id}`, {
            data: JSON.stringify(this.state.activeEventDetails.data),
        
        })
        .then(() => {
    
        });
        console.log(this.state.activeEventDetails);
    }
    createEvent() {
        let activeEventDetails = [...this.state.activeEventDetails]
        let newData = [];
        let i;
        for (i = 0; i < this.state.tables; i++) {
            let table = {
                tableNumber: i,
                type: "empty",
                users: [ {
                    id: 0,
                    name: 'empty'
                },{
                    id: 0,
                    name: 'empty'
                }, {
                    id: 0,
                    name: 'empty'
                }, {
                    id: 0,
                    name: 'empty'
                }, ]
            };
            newData.push(table);
        }
        activeEventDetails.data = newData;
        activeEventDetails.active = true;
        this.setState({
            activeEventDetails: activeEventDetails,
        },this.renderTables(activeEventDetails));
        axios
            .post("/event", {
                data: JSON.stringify(newData),
                group_id: this.props.group.id
            })
            .then(response => {
             activeEventDetails = response.data.activeEventDetails;
             activeEventDetails !== null
                    ? (activeEventDetails.data = JSON.parse(
                          activeEventDetails.data
                      ))
                    : null;

                // this.setState({
                //     activeEventDetails: activeEventDetails
                // });
            });
    }
    renderTables(activeEventDetails) {
        let tables = [];
        activeEventDetails.data.map((table, index) => {
            tables.push(
                <div key={"table " + index} className={"table tag" + index}>
                    <div className={"event-table-title"}>
                        {this.renderTypes(table)}
                    </div>
                    <div className={"event-table-user"}>
                        {table.users.map((user, index) => {
                            return (
                                <select
                                    key={user.name + "  " + index}
                                    className={" element"}
                                    onClick={e =>
                                        this.tableUserController(
                                            e,
                                            table,
                                            index
                                        )
                                    }
                                >
                                    {user.length === 0 ? (
                                        <option value={"empty " + index}>
                                            Empty {index}
                                        </option>
                                    ) : (
                                        <option
                                            value={user.name + "  " + index}
                                        >
                                            {user.name}
                                        </option>
                                    )}
                                    {this.props.group.users.map(user => {
                                        return (
                                            <option
                                                key={user.name}
                                                value={user.name}
                                            >
                                                {user.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            );
                        })}

                    </div>
                </div>
            );
        });

        this.setState({
            renderTables: tables
        });
    }
    renderTypes(table) {
        return (
            <React.Fragment>
                <form onSubmit={e => this.updateEvent(e)}>
                    <div className="form-event">
                        <select
                            className="event-type-dropdown"
                            onChange={e => this.tableGameController(e, table)}
                        >
                            <option value="0">{table.type}</option>
                            {this.props.group.types ? this.props.group.types.map(type => (
                                <option
                                    value={type.type}
                                    key={type.id + type.type}
                                >
                                    {type.type}
                                </option>
                            )): null }
                        </select>
                    </div>

                </form>
            </React.Fragment>
        );
    }
    
    render() {
        return (
            <div className={"venue-area"}>
                {!this.state.loadingPleaseWait ? this.state.activeEventDetails.active ? (
                    <div
                        onClick={() => this.saveEvent()}
                        className={"mega-button"}
                    >
                        Save Event
                    </div>
                ) : (
                    <div
                        onClick={() => this.createEvent()}
                        className={"mega-button"}
                    >
                        Create Event
                    </div>
                ):  <div
                className={"mega-button"}
            >
                Please Wait
            </div> }
{this.state.activeEventDetails.active ? 
                this.state.renderTables.map(item => {
                    return item;
                }): null }
                 {this.state.activeEventDetails.active ? (
                    <div
                        onClick={() => this.closeEvent()}
                        className={"mega-button"}
                    >
                        Close Event
                    </div>
                ) : (
                    null
                )}
            </div>
        );
    }
}
export default Event;
