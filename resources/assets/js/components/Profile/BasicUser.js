import React, { Component } from "react";

class BasicUser extends Component {
    render() {
        return (
            <React.Fragment>
                <div
                    className={
                        this.props.hints === true ? "info-bar" : "info-bar-off"
                    }
                >
                    Hello <h1>{this.props.user.name}</h1>Welcome to Battlemind.
                    App to connect players, groups and local shops. Click{" "}
                    <h3>NEW</h3> in top left corner. Add new player and gather
                    scores so our Website can show to the world what we are made
                    of.
                </div>
                <div className="group-list">
                    {this.props.groups.length
                        ? this.props.groups.map(group => {
                              if (
                                  !this.props.contains(
                                      this.props.userGroups,
                                      group
                                  ) &&
                                  group.id === 1
                              )
                                  return (
                                      <div key={group.name + "groupList1"}>
                                          <input
                                              key={
                                                  group.id +
                                                  group.name +
                                                  "groupList"
                                              }
                                              onChange={() =>
                                                  this.props.addUser(group)
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
                                          {group.name} --- Please confirm that
                                          you are member of Retford Wyverns
                                          Gaming Club
                                      </div>
                                  );
                          })
                        : null}
                </div>
            </React.Fragment>
        );
    }
}
export default BasicUser;
