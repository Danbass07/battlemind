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

              
                    <table className="hypecheck-results-list">
                        <tbody className="hypecheck-results-list-body">
                            {this.props.userTypes.map(userType => {
                                return (
                                    <tr key={userType.id}>
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

            </React.Fragment>
        );
    }
}
export default Hypecheck;
