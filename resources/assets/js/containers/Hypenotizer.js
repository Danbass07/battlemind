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
    voteOptions(e) {
        console.log(this.state.userTypes);
      const ones =  this.state.userTypes.map(type => {
         return   type.users.map( user => {
                console.log(type)
              return  user.pivot.hype !== 1 ? type : null
            })
        })
        console.log(ones);
    }
   
    componentDidMount() {
        this.props.userTypes.forEach(userType => {
            if(!userType.hype) { userType.hype = 5}
            let totalHype = 0;
            userType.users.forEach(user => {
                totalHype += user.pivot.hype;
            });
            userType.totalHype = totalHype;
            userType.average = (totalHype / userType.users.length).toFixed(1);
        });
       this.props.userTypes.sort(this.compareValues('totalHype'));
                 this.setState({
                userTypes:  [...this.props.userTypes],
               
           })
    }
  
    hypeLevelHandler(e, userType) {
        let userTypes = [...this.state.userTypes]
        userTypes.forEach(stateUserType => {
            if (stateUserType === userType) {
                stateUserType.hype = +e.target.value
            }
            
        })
        
    }
    hypenotizer() {
        axios.post(`/types/hypenotizer`, {
            userTypes: this.state.userTypes,
           
        })
  ;
     
    }
    compareValues(key, ascending = false) {
        console.log('/// sorting');
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
           voteOptions={(e) => this.voteOptions(e)}
            />:null}

       </React.Fragment>
           
    

                
        )
    }
}
export default Hypenotizer