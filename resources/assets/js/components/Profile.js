import React, { Component } from 'react';




class Profile extends Component {



    render() {
        const style = {
            height: '100%',
            width: 'auto',
            backgroundColor: 'gray',
            marginTop: '120px',
            padding: '2px',
        }
        
        return(
            <div style={style}>
                <h1>{this.props.user.name}</h1>

                    {this.props.groups.map((group) => {
                        return (
                            <div>

                                <input 
                                onChange={() => this.props.addUser(group)} 
                                defaultChecked={this.props.contains(this.props.userGroups, group) ? true : false  } 
                                type="checkbox" name="group" value={group.id} 
                               
                                />{group.name}

                            </div>
                            
                          
                        )
                    })}
           </div>
        )
    }
}
export default Profile