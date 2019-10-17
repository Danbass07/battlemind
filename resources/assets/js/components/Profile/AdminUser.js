import React, { Component } from 'react';




class AdminUser extends Component {
 
    render() {

        return (
            <React.Fragment>
                <div className="admin-group-list">
                    {this.props.groups.length
                        ? this.props.groups.map((group, index) => {
                            return (
                                <div key={group.name + "groupListadmin"+index}>
                                    <input
                                      
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

            </React.Fragment>

        )
    }
}
export default AdminUser