import React, { Component } from "react";

class Hypecheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            click: true
        };
    }

    render() {
        let group = { ...this.props.group };
        let zeroRated = []
        
   
        let activeUsersRating = group.users.map(user => {
          return  user.pivot.active ?  user : null  
            }).filter(Boolean);

      
        group.types.map( type => {
            let totalHype = 0;
          
            activeUsersRating.map( user => { 
            return    user.types.map( userType => {
                    if (userType.id === type.id) {
                        totalHype += +userType.pivot.hype
                        if(+userType.pivot.hype === 1) {
                            // console.log(type);
                            zeroRated.push(type);
                        }
                    }
                })
            
            })
            type.totalHype = totalHype;
        })
        // console.log([...new Set(zeroRated)]);
        let data =[...group.types.filter( (type) => !zeroRated.includes(type))]; 
        console.log(data);
        return (

            <React.Fragment>
               

                {group.types ? (
                    <table className="hypecheck-results-list">
                        <tbody className="hypecheck-results-list">
                            {this.props.user.permissions === "basic"
                                ? data.map((type, index) => {
                                      if (index < 3) {
                                          return (
                                              <tr
                                                  key={
                                                      type.id + " " + type.hype
                                                  }
                                              >
                                                  <td>{type.type}</td>
                                              </tr>
                                          );
                                      }
                                  })
                                : data.map((type, index) => {

                               
                                      return (
                                          <tr key={type.id + ' ' + type.hype}>
                                              <td>{type.type}</td>

                                              <td
                                                  style={{ marginLeft: "auto" }}
                                              >
                                                  {type.totalHype}
                                              </td>
                                              <td
                                                  style={{ marginLeft: "20px" }}
                                              >
                                                  {type.average}
                                              </td>
                                          </tr>
                                      );



                                  })}
                        </tbody>
                    </table>
                ) : null}

                {/* <button onClick={() => this.setState({click: !this.state.click})} className="hype-button">
                    Hype Fresh
                </button> */}

                {/* <table className="hypecheck-results-list">
                    <tbody className="hypecheck-results-list">
                        {this.props.user.permissions === "basic"
                            ? group.map((userType, index) => {
                                  if (index < 3) {
                                      return (
                                          <tr key={userType.id+' ' +userType.hype}>
                                              <td>{userType.type}</td>
                                          </tr>
                                      );
                                  }
                              })
                            : group.map((userType, index) => {
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
                </table> */}
            </React.Fragment>
        );
    }
}
export default Hypecheck;
