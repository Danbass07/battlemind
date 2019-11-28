import React, { Component } from "react";
import BasicUser from "../components/Profile/BasicUser";
import AdminUser from "../components/Profile/AdminUser";
import SuperUser from "../components/Profile/SuperUser";

class Profile extends Component {
    render() {
  
        return (
            <div className="workarea">
    

                <div className="active-group-list">
                    {this.props.groups.length
                        ? this.props.groups.map((group, index) => {
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
                                                  group.id, index
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
                    allGroups={this.props.allGroups}
                    users={this.props.users}
                    group={this.props.group}
                    activeGroup={this.props.activeGroup}
                    activeUser={(groupId, userId) => this.props.activeUser(groupId, userId)}
                    addAnyUserToActiveGroup={(userId) => this.props.addAnyUserToActiveGroup(userId)}

                    types={this.props.types}
                    userGroups={this.props.user.groups}
                    addUser={(group, user) => this.props.addUser(group, user)}
                    contains={(userGroups, groups) =>
                        this.props.contains(userGroups, groups)
                    }
                    hints={this.props.hints}
                    deleteType={(typeId) => this.props.deleteType(typeId)}
                    refresh={() => this.props.refresh()}
                    />
                   )
                       
                } else if (group.id === this.props.activeGroup && 
                    group.pivot.permissions === 'superuser') {
                        return(
                            <SuperUser
                            hints={this.props.hints}
                            key={group.id+'admin'}
                            user={this.props.user}
                            groups={this.props.groups}
                            allGroups={this.props.allGroups}
                            users={this.props.users}
                            group={this.props.group}
                            activeGroup={this.props.activeGroup}
                            activeUser={(groupId, userId) => this.props.activeUser(groupId, userId)}
                            addAnyUserToActiveGroup={(userId) => this.props.addAnyUserToActiveGroup(userId)}
        
                            types={this.props.types}
                            userGroups={this.props.user.groups}
                            addUser={(group, user) => this.props.addUser(group, user)}
                            contains={(userGroups, groups) =>
                                this.props.contains(userGroups, groups)
                            }
                            hints={this.props.hints}
                            />
                           )
                } else  {
               
                    return (
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
                    )
              
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
