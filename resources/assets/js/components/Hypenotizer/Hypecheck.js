import React, { Component } from "react";

class Hypecheck extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <button className="hype-button">Hype Fresh</button>
                <table className="hypecheck-results-list">
                    <tbody className="hypecheck-results-list-body">
                        {this.props.user.permissions === "basic"
                            ? this.props.userTypes.map((userType, index) => {
                                  if (index < 3) {
                                      return (
                                          <tr key={userType.id}>
                                              <td>{userType.type}</td>
                                          </tr>
                                      );
                                  }
                              })
                            : this.props.userTypes.map((userType, index) => {
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
