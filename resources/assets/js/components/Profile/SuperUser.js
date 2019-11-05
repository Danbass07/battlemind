import React, { Component } from "react";

class AdminUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersSelected: [
             
            ],
            toggle: false,
            action: "userList"
        };
    }
    actionController(action) {
        this.setState({
            action: action
        });
    }
    displayTournament() {

 
        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
          
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
          
              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
          
              // And swap it with the current element.
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
          
            return array;
          }
        let tournament = [...this.state.usersSelected];
        if (tournament.length % 2 !== 0) {
            tournament.push({name: 'Bye - Free Win'})
        }
    

        return (
            <div className={"action-screen-list"}>
                
                {tournament.map( (user,index) =>
                    <div key={user.name+user.id}
                    className={ index % 2 == 0? null :"even"}>
                        {user.name}
                    </div>
                
                )}
            </div>
        );
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
        let usersAdded = [...this.state.usersSelected];
        let usersAddedId = [...this.state.usersSelected.map(user => user.id)];
        usersAddedId.filter(id => id === user.id).length < 1
            ? usersAdded.push(user)
            : null;

        this.setState({
            usersSelected: usersAdded
        });
    }
    activateUserController() {
        return this.props.groups.length > 0
            ? this.props.groups.map(group => {
                  if (group.id === this.props.activeGroup) {
                      return group.users.map(user => {
                          return (
                              <div className={""} key={user.name + group.id}>
                                  <div className={"user-list-element"}>
                                      <div>Active</div>
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
                                  </div>
                                  <div className={"user-list-element"}>
                                      <div onClick={() => this.addUser(user)}>
                                          {user.name}
                                      </div>
                                  </div>
                              </div>
                          );
                      });
                  }
              })
            : null;
    }

    addAnyUserToGroup() {
        if (this.props.group && this.props.group.users) {
            let groupUsersIds = [
                ...this.props.group.users.map(user => user.id)
            ];

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
                                                      groupUsersIds.filter(
                                                          id => id === user.id
                                                      ).length < 1
                                                          ? false
                                                          : true
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
    toggle() {
        this.setState({
            toggle: !this.state.toggle
        });
    }
    render() {
        return (
            <React.Fragment>
                <div className={"action-screen"}>
                    {this.state.action === "userList" ? (
                        <div className={"action-screen-list"}>
                            <h4>List of Users to do an action</h4>
                            <div className={"screen-group-list"}>
                                {this.state.usersSelected.map(user => {
                                    return (
                                        <React.Fragment
                                            key={user.id + user.name}
                                        >
                                            <div>{user.name}</div>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        this.displayTournament()
                    )}
                    <div className={"action-screen-actions-list"}>
                        <h4>Action to do</h4>
                        <div className={"action-button"}>Paid Subs Today</div>
                        <div className={"action-button"}>
                            Will pay next time
                        </div>
                        <div
                            onClick={() => this.actionController("tournament")}
                            className={"action-button"}
                        >
                            Create Tournament
                        </div>
                        <div className={"action-button"}>
                            Create Painting Competition
                        </div>
                        <div className={"action-button"}>
                            Send them to the Moon
                        </div>
                    </div>
                </div>
                <div
                    className={
                        this.state.toggle
                            ? "admin-users-list-wrapper"
                            : "admin-users-list-wrapper hidden"
                    }
                >
                    <div className="admin-users-list">
                        <h4>
                            Choose User by clicking his name. Mark him as active
                        </h4>
                        <div className="user-list">
                            {this.activateUserController()}
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => this.toggle()}
                    className={"admin-users-list-button"}
                >
                   
                    Toggle Group Users List
                </div>
            </React.Fragment>
        );
    }
}
export default AdminUser;