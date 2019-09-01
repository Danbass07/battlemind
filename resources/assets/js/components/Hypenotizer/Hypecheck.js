import React, { Component } from "react";

class Hypecheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exludedUsers: []
        };
    }
    clickController(id) {
        if ((id === 'nope')) {
            this.props.setUsersToHype([1,4,5,9,]);
            this.setState({
                exludedUsers: []
            });
        } else {
            let exludedUsers = [...this.state.exludedUsers];
            if (this.state.exludedUsers.includes(id)) {
                exludedUsers = exludedUsers.filter(item => item !== id);
            } else {
                exludedUsers.push(id);
            }
            this.props.setUsersToHype(exludedUsers);
            this.setState({
                exludedUsers: exludedUsers
            });
        }
    }

    render() {
        const style = {
            color: "white",
            overflow: "scroll",
            height: "400px",
            width: "100%"
        };
        const style2 = {
            display: "flex",
            border: "1px solid white",
            marginBottom: "2px"
        };

        return (
            <React.Fragment>
                <button
                    onClick={() => this.clickController('nope')}
                    className="hype-button"
                >
                    Hype Fresh
                </button>
                <div className="hypecheck-exlude-list">
                    {this.props.groups.map(group => {
                        if (group.id === 2) {
                            return group.users.map(user => {
                                return (
                                    <div
                                        key={user.id}
                                        className={
                                            !this.state.exludedUsers.includes(
                                                user.id
                                            )
                                                ? "hypecheck-exlude-list-item"
                                                : "hypecheck-exlude-list-item active"
                                        }
                                        onClick={() =>
                                            this.clickController(user.id)
                                        }
                                    >
                                        {user.name}
                                    </div>
                                );
                            });
                        }
                    })}
                </div>

                <div style={style}>
                    <table>
                        <tbody>
                            {this.props.userTypes.map(userType => {
                                return (
                                    <tr style={style2} key={userType.id}>
                                        <td>{userType.type}</td>
                                        <td style={{ marginLeft: "auto" }}>
                                            {userType.totalHype}
                                        </td>
                                        <td style={{ marginLeft: "20px" }}>
                                            {userType.average}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}
export default Hypecheck;
