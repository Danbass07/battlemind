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
            let a = i + 1;
            tables.push(
                <div key={"table " + i} className={"table tag" + i}>
                    <div className={"event-table-title"}>
                        {this.renderTypes()}
                        {/* {this.state.tableInfo[0].type + " " + a} */}
                    </div>
                    <div className={"event-table-user"}>
                        {this.state.tableInfo[0].usersPlaying.map(user => {
                            return (
                                <div className={" element"}>
                                    <div>{user.name} </div>
                                    <div>Choose his player </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
        this.setState({
            renderTables: tables
        });
        return tables;
    }
    renderTypes() {
        console.log(this.props.group)
        return (
            <React.Fragment>
                <form onSubmit={e => this.updateEvent(e)}>
                    <div className="form-group">
                        <select
                            className="myform-control"
                            required
                            value={this.state.type}
                            onChange={e => this.chooseType(e)}
                        >
                            {this.props.group.types.map(type => (
                                <option value={type.type} key={type.id}>
                                    {type.type}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* <button
          type="submit"
          className="btn btn-primary"
      >
          Edit player
      </button> */}
                </form>
            </React.Fragment>
        );
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
