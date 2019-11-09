import React, { Component } from "react";

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: 12,
            activeEventDetails: [],
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
        let tables = []
        this.state.activeEventDetails.map((table, index) => {
            tables.push(
                <div key={"table " + index} className={"table tag" + index}>
                    <div className={"event-table-title"}>

                        {this.renderTypes(table.tableNumber)}
                        {/* {this.state.tableInfo[0].type + " " + a} */}
                    </div>
                    <div className={"event-table-user"}>
                        {this.state.tableInfo[0].usersPlaying.map(user => {
                            return (
                                <div key={user.id + user.name} className={" element"}>
                                    <div>{user.name} </div>
                                    <div>Choose his player </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        })


        this.setState({
            renderTables: tables
        });

    }
    renderTypes(tableNumber) {
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
                            {this.state.activeEventDetails.map((table, index) => (
                                tableNumber === index ?
                                    <option value={table.type} key={table.type}>
                                        {table.type}
                                    </option> : null
                            ))}
                            {this.props.group.types.map(type => (
                                <option value={type.type} key={type.id + type.type}>
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
    createEvent() {
        const newData = []
        let i;
        for (i = 0; i < this.state.tables; i++) {
            let table = {
                tableNumber: i,
                type: 'empty',
                users: [

                ],
            }
            newData.push(table);
        }


        this.setState({
            activeEventDetails: newData,
        }, this.renderTables())
        //   axios
        //   .post("/event", {
        //       data: JSON.stringify(newData),
        //       group_id:this.props.activeGroup,

        //   })
        //   .then( response => {

        //       let activeEventDetails = response.data.activeEventDetails;
        //       activeVoteDetails !== null ? 

        //       activeEventDetails.data = JSON.parse(activeEventDetails.data)

        //       : null ;

        //           this.setState({
        //             activeEventDetails: activeEventDetails,
        //           })


        //   });
    }
    render() {
        return (
            <div className={"venue-area"}>
                <div onClick={() => this.createEvent()} className={"mega-button"}>Create Event</div>
                {this.state.renderTables.map(item => {
                    return item;
                })}
            </div>
        );
    }
}
export default Event;
