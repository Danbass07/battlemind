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
            width: '100%'
        };
        const style2 ={
            display: 'flex',
            border: '1px solid white',
            marginBottom: '2px'
        }

        return (
            <React.Fragment>
                <button onClick={() => this.props.refreshData()} className='hype-button'>Hype Fresh</button>
                <div style={style}>
                <table >
                    <tbody >
                        {this.props.userTypes.map(userType => {
                            return (
                                <tr style={style2} key={userType.id}>
                                    <td>{userType.type}</td>
                                    <td style={{marginLeft: 'auto'}}>{userType.totalHype}</td>
                                    <td style={{marginLeft: '20px'}}>{userType.average}</td>
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
