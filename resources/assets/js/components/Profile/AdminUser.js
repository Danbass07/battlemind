import React, { Component } from "react";

class AdminUser extends Component {
    constructor(props) {
        super(props);
        this.state = {

            usersSelected: [{
                id: 0,
                name: 'test'
            }],
           type: ''

        }
    }
    addType(groupId) {
        console.log(groupId);
        console.log(this.state.type);
        axios
        .post("/types", {
            type: this.state.type,
            groupId: this.props.activeGroup,
          
        })
        .then(() => {
            this.setState({
                type: "",
             
            });
        });
    }
    changeHandler(e) {
        this.setState({
      
                [e.target.placeholder]: e.target.value
            
            
        });
    }
    addYourselfToGroup() {
        return this.props.allGroups.length
            ? this.props.allGroups.map((group, index) => {
                // console.log(this.props.userGroups);
                // console.log(group);
                return (
                    <React.Fragment
                        key={group.name + "groupListadmin" + index}
                    >
                        <div>
                            <input
                                onChange={() =>
                                    this.props.addUser(group, this.props.user)
                                }
                                defaultChecked={
                                    this.props.contains(
                                        this.props.userGroups,
                                        group
                                    )
                                        ? true
                                        : false
                                }
                                type="checkbox"
                                name="group"
                                value={group.id}
                            />
                            {group.name}
                        </div>
                    </React.Fragment>
                );
            })
            : null;
    }
    addUser(user) {
        let usersAdded = [...this.state.usersSelected]
        let usersAddedId = [...this.state.usersSelected.map(user => user.id)];
        usersAddedId.filter(id => id === user.id).length < 1 ? usersAdded.push(user) : null;

        this.setState({
            usersSelected: usersAdded
        })

    }
    activateUserController() {
        return this.props.groups.length > 1
            ? this.props.groups.map(group => {
                if (group.id === this.props.activeGroup) {
                    return group.users.map(user => {
                        return (
                            <div className={"admin-group-list"} key={user.name + group.id}>
                                <React.Fragment>
                                    <div onClick={() => this.addUser(user)}>{user.name}</div>
                                    <input
                                        onChange={() =>
                                            this.props.activeUser(
                                                group.id,
                                                user.id
                                            )
                                        }
                                        defaultChecked={
                                            user.pivot.active ? true : false
                                        }
                                        type="checkbox"
                                        name="group"
                                        value={user.id}
                                    />
                                </React.Fragment>
                            </div>
                        );
                    });
                }
            })
            : null;
    }

    addAnyUserToGroup() {




        if (this.props.group && this.props.group.users) {
            let groupUsersIds = [...this.props.group.users.map(user => user.id)];

            return (
                <div className={"name-list"}>
                    {this.props.users.length
                        ? this.props.users.map((user, index) => {


                            return (
                                <div
                                    className={"name-list-element"}
                                    key={user.name + "groupListadmin" + index}
                                >
                                    <React.Fragment>

                                        <div>
                                            <input
                                                onChange={() =>
                                                    this.props.addAnyUserToActiveGroup(
                                                        user
                                                    )
                                                }
                                                defaultChecked={

                                                    groupUsersIds.filter(id => id === user.id).length < 1 ? false : true


                                                }
                                                type="checkbox"
                                                name="group"
                                                value={user.id}
                                            />
                                            {user.name}
                                        </div>
                                    </React.Fragment>
                                </div>
                            );
                        })
                        : null}
                </div>
            );
        }
    }
    render() {
        
        return (
            <React.Fragment>
                <div> Add New Type to Group 
                <input
                            className="myform-control"
                            placeholder="type"
                            onChange={e => this.changeHandler(e)}
                            required
                        />
                        <button onClick={() => this.addType(this.props.activeGroup)}>Save</button>
                </div>
                <div className={"action-screen"}>
                    <div className={"action-screen-list"}>
                        <h4>List of Users to do an action</h4>
                        <div className={"screen-group-list"}>
                            {this.state.usersSelected.map(user => {
                                return (
                                    <React.Fragment key={user.id + user.name}>
                                        <div >{user.name}</div>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    </div>
                    <div className={"action-screen-actions-list"}>
                        <h4>Action to do</h4>
                        <div className={"action-button"}>Paid Subs Today</div>
                        <div className={"action-button"}>Will pay next time</div>
                        <div className={"action-button"}>Create Tournament</div>
                        <div className={"action-button"}>Create Painting Competition</div>
                        <div className={"action-button"}>Send them to the Moont</div>
                        
                    </div>

                   


                </div>
                <div className={"profile-grid "}>
                    <div className="superuser-group-list div1">
                        <h4>Add YourSelf To Group</h4>
                        {this.addYourselfToGroup()}
                    </div>
                    <div className="superuser-group-list div2">
                        <h4>Active/Nonactie UserController</h4>
                        {this.activateUserController()}
                    </div>
                    <div className="superuser-group-list div3">
                        <h4>Empty Slot</h4>
                    </div>
                    <div className="superuser-group-list div4">
                        <h4>Add Any User To Group</h4>
                        {this.addAnyUserToGroup()}
                    </div>
                </div>
            </React.Fragment>

        );
    }
}
export default AdminUser;
