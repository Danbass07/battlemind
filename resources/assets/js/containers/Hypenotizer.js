import React, { Component } from 'react';
import Hypeset from '../components/Hypenotizer/Hypeset';
import Hypecheck from '../components/Hypenotizer/Hypecheck';
import Hypevote from '../components/Hypenotizer/Hypevote';


class Hypenotizer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hypeLevels: [ 1,2,3,4,5,6,7,8,9,10],
            userTypes: [],

        };
    }
   
    componentDidMount() {
        this.props.userTypes.forEach(userType => {
            let totalHype = 0;
            userType.users.forEach(user => {
                totalHype += user.pivot.hype;
            });
            userType.totalHype = totalHype;
            userType.average = (totalHype / userType.users.length).toFixed(1);
        });
                 this.setState({
                userTypes:  [...this.props.userTypes],
               
           })
    }
  
    hypeLevelHandler(e, userType) {
        console.log('totalHype')
        let userTypes = [...this.state.userTypes]
        userTypes.forEach(stateUserType => {
            if (stateUserType === userType) {
                stateUserType.hype = +e.target.value
            }
            
        })
        userTypes.forEach(userType => {
            
            let totalHype = 0;
            userType.users.forEach(user => {
                totalHype += user.pivot.hype;
                console.log(totalHype)
            });
            userType.totalHype = totalHype;
            userType.average = (totalHype / userType.users.length).toFixed(1);
        });
           
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
           {this.props.navigation ===  'Hypeset' ?  <Hypeset
           userTypes={this.state.userTypes}
           hypeLevels={this.state.hypeLevels}
           hypeLevelHandler={(e, userType) => this.hypeLevelHandler(e, userType)}
           hypenotizer={() =>this.hypenotizer()}
            />:null}

            {this.props.navigation ===  'Hypecheck' ?  <Hypecheck
           userTypes={this.state.userTypes}
            />:null}
           
           {this.props.navigation ===  'Hypevote' ?  <Hypevote
           userTypes={this.state.userTypes}
           hypeLevels={this.state.hypeLevels}
            />:null}

       </React.Fragment>
           
    

                
        )
    }
}
export default Hypenotizer