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
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.userTypes !== prevState.userTypes){
          return { userTypes: nextProps.userTypes};
       }
       else return null;
     }
     
     componentDidUpdate(prevProps, prevState) {
       if(prevProps.userTypes!==this.props.userTypes){
         //Perform some operation here
         this.setState({userTypes: this.props.userTypes});
       
       }
     }
    componentDidMount() {
        // axios.get("/types").then(response =>{
        //     response.data.userTypes.forEach( userType => {
        //         if (userType.users.length !== 0) {
        //             userType.users.map(user => {
        //                 if (response.data.user.id === user.id) {
        //                     userType.hype = user.pivot.hype;
        //                 }
        //             })
                    
        //         } else { userType.hype = 5 }
               
        //     })
        //     this.setState({
        //         userTypes:  [...response.data.userTypes],
               
        //    })
        // })
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
           hypeLevels={this.state.hypeLevels}
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