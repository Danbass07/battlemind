import React, { Component } from "react";

class Hypecheck extends Component {
    constructor(props) {
        super(props);
        
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
   

        return (
            <React.Fragment>
                <button
                    className="hype-button"
                >
                    Hype Fresh
                </button>


              
                    <table className="hypecheck-results-list">
                        <tbody className="hypecheck-results-list-body">
                            {this.props.userTypes.sort(this.compareValues("totalHype")).map((userType,index) => {
                                if (index < 3) {
                                    return (
                                        <tr key={userType.id}>
                                            <td>{userType.type}</td>
                                            {/* <td style={{ marginLeft: "auto" }}>
                                                {userType.totalHype}
                                            </td>
                                            <td style={{ marginLeft: "20px" }}>
                                                {userType.average}
                                            </td> */}
                                        </tr>
                                    );
                                }
                           
                            })}
                        </tbody>
                    </table>

            </React.Fragment>
        );
    }
}
export default Hypecheck;
