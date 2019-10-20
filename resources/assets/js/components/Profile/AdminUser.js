import React, { Component } from 'react';




class AdminUser extends Component {
 
    render() {

        return (
            <React.Fragment>
                <div className="admin-group-list">
                    {this.props.allGroups.length
                        ? this.props.allGroups.map((group, index) => {
                            return (
                                <div key={group.name + "groupListadmin" + index}>
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
                            );
                        })
                        : null}
                </div>
                <div className="admin-group-list">
                    {this.props.groups.length > 1
                        ? this.props.groups.map((group) => {
                            if (group.id === this.props.activeGroup) {
                                return group.users.map((user) => {
                                    return (
                                        <React.Fragment key={user.name+ group.id}>
                                            <div>
                                                {user.name}
                                            </div>
                                            <input
                                                onChange={() =>
                                                    this.props.activeUser(group.id, user.id)
                                                }
                                                defaultChecked={
                                                    user.pivot.active
                                                        ? true
                                                        : false
                                                }
                                                type="checkbox"
                                                name="group"
                                                value={user.id}
                                            />

                                        </React.Fragment>


                                    )


                                })
                            }

                        }) : null}
                </div>
                <div className="admin-group-list">
                    {this.props.users.length
                        ? this.props.users.map((user, index) => {
                            return (
                                <div key={user.name + "groupListadmin" + index}>
                                    <input
                                      
                                        onChange={() =>
                                            this.props.addUser(this.props.group)
                                        }
                                        defaultChecked={
                                            this.props.contains(
                                                this.props.userGroups,
                                                user
                                            )
                                                ? true
                                                : false
                                        }
                                        type="checkbox"
                                        name="group"
                                        value={user.id}
                                    />
                                    {user.name}
                                </div>
                            );
                        })
                        : null}
                </div>

            </React.Fragment>

        )
    }
}
export default AdminUser