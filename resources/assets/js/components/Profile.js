import React, { Component } from 'react';
import Matrix from '../containers/Matrix';



class Profile extends Component {

 


    render() {
        return(
            <div className='profile-wrapper'>
                <div>
                <h1>{this.props.user.name}</h1>
      
                </div>
{/*                
                <Matrix
                groups={this.props.groups}
                types={this.props.types}/> */}
                <div className="group-list">
                    {this.props.groups.length ? this.props.groups.map((group) => {
                        return (
                            
                            <div key={group.name} >
                                <input 
                             key={group.id+group.name} 
                                
                                onChange={() => this.props.addUser(group)} 
                                defaultChecked={this.props.contains(this.props.userGroups, group) ? true : false  } 
                                type="checkbox" name="group" value={group.id} 
                               
                                />{group.name}

                            </div >  
                            
                          
                        )
                    }): null}
                     </div>
           </div>
        )
    }
}
export default Profile