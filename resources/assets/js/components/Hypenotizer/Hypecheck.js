import React, { Component } from "react";

class Hypecheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            click: true
        };
    }
    
    compareValues(key, ascending = false) {
        return function(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }
            const varA =
                typeof a[key] === "string" /// letter case insensitive
                    ? a[key].toUpperCase()
                    : a[key];
            const varB =
                typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return ascending == false ? comparison * -1 : comparison;
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
        let data =[...group.types.filter( (type) => !zeroRated.includes(type)).sort(this.compareValues('totalHype', false))]; 
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
