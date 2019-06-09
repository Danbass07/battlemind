import React, { Component } from 'react';





class Hypeset extends Component {

  

    render() {
    
        
        return(
       <React.Fragment>
           <button className='hype-button' onClick={() => this.props.hypenotizer()}>HYPE OR NOT HYPE</button>
            <div className='hype-wrapper'>

            
            {this.props.userTypes.length !== 0 ? this.props.userTypes.map((userType) => {
      
                    return (
                        
                        <div className="hype-row"key={userType.type} >
                        
                        <div className="hype-row-element">
                        {userType.type}
                        </div>
                        <div className="hype-row-element">
                        <select onChange={(e) => this.props.hypeLevelHandler(e, userType)}>
                        <option key={'default'+userType.type} defaultValue=
                        {userType.hype ? userType.hype : 5 }  >
                        
                        {userType.hype ?  userType.hype : 5}</option>
                            {this.props.hypeLevels.map( (level, index) => {
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
export default Hypeset