import React, { Component } from "react";

class EventBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingPleaseWait: true,
            tableInfo: {
                
                        tableNumer: 99,
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

                    
                
            },
           
        };
    }

    componentDidMount() {
        axios
            .get(`/event/getActiveEvent/${this.props.group.id}`)
            .then(response => {
          
             
                    let tableInfo;
                    let activeEventDetails = {...response.data.activeEventDetails};
                    activeEventDetails.data = JSON.parse(activeEventDetails.data);
                    activeEventDetails.data.map( table => {
                     
                        table.users.map(user => {
                            if (user.name === this.props.user.name) {
                                tableInfo = table;
                            }
                        })
                    })
                    console.log(tableInfo)
                    if(tableInfo) {
                        this.setState({
                            tableInfo: {...tableInfo},
                            loadingPleaseWait: false,
                            hasBooking: true,
                           })
                    } else {
                        this.setState({
                            loadingPleaseWait: false,
                            hasBooking: false,
                           })
                    }
                 
                
               
               
            });
    }
    tableGameController(e) {
        let tableInfo = {...this.state.tableInfo};
        tableInfo.type= e.target.value;
        this.setState({
            tableInfo: tableInfo
        })
    }
    tableUserController(e, index) {
        let tableInfo = {...this.state.tableInfo};
        tableInfo.users[index].name = e.target.value;
        this.setState({
            tableInfo: tableInfo
        })
    }
   
    
    updateTableDetails() {
        axios
        .put(`/event/updateTableDetails/${this.props.group.id}`, {
            tableInfo: this.state.tableInfo
        
        })
        .then((response) => {
            console.log(response);
        });
        
    }
    bookTable() {
        axios
        .put(`/event/bookTable/${this.props.group.id}`, {
            tableInfo: this.state.tableInfo
        
        })
        .then((response) => {
            console.log(response);
        });
        
    } 
    
  
    renderTable() {
   console.log(this.state.tableInfo)
       return (
        <div key={"table "} className={"table tag" }>
        <div className={"event-table-title"}>
            {this.renderTypes()}
        </div>
        <div className={"event-table-user"}>
            {this.state.tableInfo.users.map((user, index) => {
                return (
                    <select
                        key={user.name + "  " + index}
                        className={" element"}
                        onClick={e =>
                            this.tableUserController(
                                e,
                                index
                            )
                        }
                    >
                     
                            <option
                                value={this.state.tableInfo.users[index].name}
                            >
                                {this.state.tableInfo.users[index].name}
                            </option>
                        
                        {this.props.group.types ? this.props.group.users.map(user => {
                            return (
                                <option
                                    key={user.name}
                                    value={user.name}
                                >
                                    {user.name}
                                </option>
                            );
                        }) : null}
                    </select>
                );
            })}

   
        </div>
    </div>
       )
               
            


      
    }
    renderTypes() {
        return (
            <React.Fragment>
             
                    <div className="form-event">
                        <select
                            className="event-type-dropdown"
                            onChange={e => this.tableGameController(e)}
                        >
                            <option value="0">{this.state.tableInfo.type}</option>
                            {this.props.group.types ? this.props.group.types.map(type => (
                                <option
                                    value={type.type}
                                    key={type.id + type.type}
                                >
                                    {type.type}
                                </option>
                            )): null}
                        </select>
                    </div>

           
            </React.Fragment>
        );
    }
    
    render() {
        return (
            <div className={"venue-area"}>
                {!this.state.loadingPleaseWait && this.state.hasBooking ? (
                    
                    <div
                        onClick={() => this.updateTableDetails()}
                        className={"mega-button"}
                    >
                        Update Details
                    </div>
                ) : !this.state.loadingPleaseWait && !this.state.hasBooking ?
                <div
                onClick={() => this.bookTable()}
                className={"mega-button"}
            >
               Book Table
            </div>
                :<div
                className={"mega-button"}
            >
                Please Wait
            </div> }
{
                this.renderTable()}
 
            </div>
        );
    }
}
export default EventBasic;
