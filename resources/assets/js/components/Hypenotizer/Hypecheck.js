import React, { Component } from "react";

class Hypecheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            click: true,
        }
    }
    
   
    render() {
   
        
            let userTypes =[...this.props.userTypes]
            userTypes.map((userType, index) => {

                userType.users.map((user) => {
                    if (user.pivot.hype === 1) {
                         userTypes.splice(index,1);
                    }
                })
            })
             
        
    
        return (
            <React.Fragment>
                {/* <button onClick={() => this.setState({click: !this.state.click})} className="hype-button">
                    Hype Fresh
                </button> */}
                
                <table className="hypecheck-results-list">
                    <tbody className="hypecheck-results-list">
                        {this.props.user.permissions === "basic"
                            ? userTypes.map((userType, index) => {
                                  if (index < 3) {
                                      return (
                                          <tr key={userType.id+' ' +userType.hype}>
                                              <td>{userType.type}</td>
                                          </tr>
                                      );
                                  }
                              })
                            : userTypes.map((userType, index) => {
                                  return (
                                      <tr key={userType.id+' ' +userType.hype}>
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
