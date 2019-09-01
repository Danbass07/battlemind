import React, { Component } from "react";

class Hypecheck extends Component {
    constructor(props) {
        super(props);
        this.state = ({
        })
       
    }
  clickController(id) {
    this.props.setUsersToHype([id]);
    
    
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
        const style3 = {
            backgroundColor: "black",
            fontSize: "11px",
            color: "white",
            height: '40px',
        
        };

        return (
            <React.Fragment>
                <button onClick={() => this.props.setUsersToHype(['all'])} className='hype-button'>Hype Fresh</button>
                <div style={style3} onClick={() => this.clickController(9)}>No Ramunas</div>
                <div style={style3} onClick={() => this.props.setUsersToHype([1])}>No Daniel</div>
                <div style={style3} onClick={() => this.props.setUsersToHype([4])}>No Virginijus</div>
                <div style={style3} onClick={() => this.props.setUsersToHype([5])}>No Bart</div>
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
