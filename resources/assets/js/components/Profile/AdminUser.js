import React, { Component } from 'react';




class BasicUser extends Component {


    render() {
     
        return(
            <React.Fragment>
            <div className="admin-group-list">
                {this.props.groups.length
                    ? this.props.groups.map(group => {
                          return (
                              <div key={group.name + "groupList2"}>
                                  <input
                                      key={group.id + group.name}
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
                                  {group.name}
                              </div>
                          );
                      })
                    : null}
            </div>
            <div className="admin-group-list">
                {console.log(this.props.groups)}
                {this.props.groups.length > 1
                    ? this.props.groups.map(group => { 
                      return  group.users.map(user => {
                         return   <div key={user.name}>
                               { user.name }
                            </div>
                       })
                    }): null }
            </div>

        </React.Fragment>
                
        )
    }
}
export default BasicUser