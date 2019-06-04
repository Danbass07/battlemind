import React, { Component } from 'react';
import Matrix from './Matrix';



class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hypeLevels: [ 1,2,3,4,5,6,7,8,9,10],
            userTypes: [],

        };
    }
    componentDidMount() {
        

        if (this.props.userTypes) {
         this.props.userTypes.forEach(userType => {
                userType.hypeLevel = 5;
            })
            this.setState({
                userTypes: this.props.userTypes,
            });
        }
      
        
       
    }
    hypeLevelHandler(e, userType) {
        let userTypes = [...this.state.userTypes]
        userTypes.forEach(stateUserType => {
            if (stateUserType === userType) {
                stateUserType.hypeLevel = +e.target.value
            }
            
        })
        this.setState({
            userTypes: userTypes
        })
        
    }
    hypenotizer() {
        axios.post(`/types/hypenotizer`, {
            userTypes: this.state.userTypes,
           
        });
    }

    render() {
      
        return(
            <div className='profile-wrapper'>
                <div>
                <h1>{this.props.user.name}</h1>
                <button onClick={() => this.hypenotizer()}>HYPE OR NOT HYPE</button>
                {this.state.userTypes.map((userType) => {
                        return (
                            
                            <div key={userType.type} >
                              {userType.type}
                            <select onChange={(e) => this.hypeLevelHandler(e, userType)}>
                            <option key={'default'+userType.type} defaultValue= "Choose here" hidden>Choose here</option>
                                {this.state.hypeLevels.map( (level, index) => {
                                    return ( <option key={userType.type+index} value={level}>{level}</option>)
                                })}
                            </select>
                            
                            </div >  
                            
                          
                        )
                    })}
                </div>
               
                <Matrix
                groups={this.props.groups}
                types={this.props.types}/>
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