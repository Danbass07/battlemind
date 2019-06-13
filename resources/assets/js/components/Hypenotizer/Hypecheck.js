import React, { Component } from "react";

class Hypecheck extends Component {
    constructor(props) {
        super(props);
       
    }
  

    render() {
        const style = {
            color: "white",
            overflow: "scroll",
            height: '400px',
        };

        return (
            <React.Fragment>
                <div style={style} >
                    {this.props.userTypes.map(userType => {
                        return (
                            <div key={userType.id}>
                                <h2>{userType.type}</h2>
                                <h2>{userType.totalHype}</h2>
                                <h2>{userType.average}</h2>
                            </div>
                        );
                    })}
                </div>
            </React.Fragment>
        );
    }
}
export default Hypecheck;
