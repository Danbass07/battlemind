import React, { Component } from 'react';





class Hypenotizer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hypeLevels: [ 1,2,3,4,5,6,7,8,9,10],
            userTypes: [],

        };
    }
    componentDidMount() {
let data;
        axios.get("/types").then(response =>{
            response.data.userTypes.forEach( userType => {
                if (userType.users.length !== 0) {
                  
                    userType.hype = userType.users[0].pivot.hype;
                } else { userType.hype = 5 }
               
            })
            this.setState({
                userTypes:  [...response.data.userTypes],
               
           }, console.log(response.data.userTypes))
        }
            
        );
    
            // if (this.state.userTypes.users) {
            //     this.state.userTypes.forEach(userType => {
            //        if (userType.users[0]) {
            //            userType.hype = userType.users[0].pivot.hype
            //        }  else { userType.hype = 5; }
            //        })
            //        this.setState({
            //            userTypes: [...this.props.userTypes],
            //        });
            //    }
           
            //    let data;
            //    axios.get("/types").then(response =>
       
            //      data =  response.data.userTypes.forEach(userType => {
            //            if (userType.users[0]) {
            //                userType.hype = userType.users[0].pivot.hype
            //            }  else { userType.hype = 5; }
                  
       
            //            })
                   
       
                   
            //    ).then (
            //        this.setState({
            //            userTypes:  [...data],
                    
                       
            //        })
            //    );
              
      
        
       
    }
  
    hypeLevelHandler(e, userType) {
        let userTypes = [...this.state.userTypes]
        userTypes.forEach(stateUserType => {
            if (stateUserType === userType) {
                stateUserType.hype = +e.target.value
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
       <React.Fragment>
           <button className='hype-button' onClick={() => this.hypenotizer()}>HYPE OR NOT HYPE</button>
            <div className='hype-wrapper'>

            
            {this.state.userTypes.length !== 0 ? this.state.userTypes.map((userType) => {
      
                    return (
                        
                        <div className="hype-row"key={userType.type} >
                        
                        <div className="hype-row-element">
                        {userType.type}
                        </div>
                        <div className="hype-row-element">
                        <select onChange={(e) => this.hypeLevelHandler(e, userType)}>
                        <option key={'default'+userType.type} defaultValue=
                        {userType.users.length !== 0 ? userType.users[0].pivot.hype: 
                        5 }  >
                        
                        {userType.users.length !==0  ?  userType.users[0].pivot.hype : 5}</option>
                            {this.state.hypeLevels.map( (level, index) => {
                                return ( <option key={userType.type+index} value={level}>{level}</option>)
                            })}
                        </select>
                        </div >

                        </div >  
                        
                    
                    )
                }): null}
                
            </div>

       </React.Fragment>
           
    

                
        )
    }
}
export default Hypenotizer