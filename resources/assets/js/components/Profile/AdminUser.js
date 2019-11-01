import React, { Component } from "react";

class AdminUser extends Component {
    constructor(props) {
        super(props);
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

    activateUserController() {
        return this.props.groups.length > 1
            ? this.props.groups.map(group => {
                  if (group.id === this.props.activeGroup) {
                      return group.users.map(user => {
                          return (
                              <div className={""} key={user.name + group.id}>
                                  <React.Fragment>
                                      <div>{user.name}</div>
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

      
    
    
        if(this.props.group && this.props.group.users) {
            let groupUsersIds = [...this.props.group.users.map(user => user.id)];
            console.log(groupUsersIds);
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
                                                      user.id
                                                  )
                                              }
                                              defaultChecked={ 
                                               
                                            groupUsersIds.filter(id => id === user.id ).length < 1 ? false : true
                                          
                                                   
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
            <div className={"profile-grid "}>
                <div className="admin-group-list div1">
                    <h4>Add YourSelf To Group</h4>
                    {this.addYourselfToGroup()}
                </div>
                <div className="admin-group-list div2">
                    <h4>Active/Nonactie UserController</h4>
                    {this.activateUserController()}
                </div>
                <div className="admin-group-list div3">
                    <h4>Empty Slot</h4>
                </div>
                <div className="admin-group-list div4">
                    <h4>Add Any User To Group</h4>
                    {this.addAnyUserToGroup()}
                </div>
            </div>
        );
    }
}
export default AdminUser;
