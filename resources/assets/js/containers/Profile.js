import React, { Component } from "react";
import BasicUser from "../components/Profile/BasicUser";
import AdminUser from "../components/Profile/AdminUser";

class Profile extends Component {
    render() {
        return (
            <div className="workarea">
    

                <div className="active-group-list">
                    {this.props.groups.length
                        ? this.props.groups.map(group => {
                              if (
                                  this.props.contains(
                                      this.props.userGroups,
                                      group
                                  )
                              )
                                  return (
                                      <div
                                          key={group.name + "active"}
                                          onClick={() =>
                                              this.props.activeGroupChange(
                                                  group.id
                                              )
                                          }
                                          className={
                                              this.props.activeGroup ===
                                              group.id
                                                  ? "active-group-selected"
                                                  : "active-group-notselected"
                                          }
                                      >
                                          {group.name}
                                      </div>
                                  );
                          })
                        : null}
                </div>

              
       
                {this.props.user.groups.map( (group) => {
                if (group.id === this.props.activeGroup && 
                group.pivot.permissions === 'admin') {
                   return(
                    <AdminUser
                    key={group.id+'admin'}
                    user={this.props.user}
                    groups={this.props.groups}
                    activeGroup={this.props.activeGroup}
                    activeUser={(groupId, userId) => this.props.activeUser(groupId, userId)}


                    types={this.props.types}
                    userGroups={this.props.user.groups}
                    addUser={group => this.props.addUser(group)}
                    contains={(userGroups, groups) =>
                        this.props.contains(userGroups, groups)
                    }
                    hints={this.props.hints}
                    />
                   )
                       
                      
               
                } else {
                    <BasicUser 
                    key={group.id+'basic'}
                    user={this.props.user}
                    groups={this.props.groups}
                    userGroups={this.props.user.groups}
                    addUser={group => this.props.addUser(group)}
                    contains={(userGroups, groups) =>
                       this.props.contains(userGroups, groups)
                   }
                    hints={this.props.hints}
                    />
                }
         
              
                 
                }) 
               }

        

          
                <div
                    style={{
                        backgroundImage:
                            "url(/images/" +
                            this.props.activeGroup +
                            "logo.png)"
                    }}
                    className="logo"
                ></div>
            </div>
        );
    }
}
export default Profile;