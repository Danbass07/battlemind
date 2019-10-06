import React, { Component } from 'react';




class BasicUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: 1,
            scoreboard: 0,
            scoreboardplayers: [],
            type: "",
            url: "jace",
            playerid: 0,
            index: 1,
            player: {
                url: "url",
                name: "empty"
            }
        };
    }
    activeUser(user) {
        console.log('active');
        axios
        .put(`/users/${user.id}`, {
            active: !this.props.user.active,
        })
        .then(response => {console.log(response)});

           }
    render() {

        return (
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
                    {this.props.groups.length > 1
                        ? this.props.groups.map(group => {
                            if (group.id === this.props.activeGroup) {
                                return group.users.map(user => {
                                    return (
                                        <React.Fragment>
                                            <div key={user.name}>
                                                {user.name}
                                            </div>
                                            <input
                                                key={group.id + group.name}
                                                onChange={() =>
                                                    this.activeUser(user)
                                                }
                                                defaultChecked={
                                                    user.active
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
export default BasicUser