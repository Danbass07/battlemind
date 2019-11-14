import React, { Component } from "react";
import Axios from "axios";

class Hypecheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            click: true,
            exludeLevel: 0,  
        };
    }
    componentDidMount() {
        axios.get(`/vote/votecheck/${this.props.activeGroup}`);
    }
    
    compareValues(key, ascending = false) {
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
    checkPlayerRating(user) {
        let theOne = []
        theOne.push(user)
        this.setState({
            theOne: theOne,
            onlyOne: !this.state.onlyOne,
        })
    }

    render() 
  
    {
        let group = { ...this.props.group };
        let zeroRated = []
        
      
        let activeUsersRating = group.users.map(user => {
          return  user.pivot.active ?  user : null  
            }).filter(Boolean);

       
      
        group.types.map( type => {
            let totalHype = 0;
          if(this.state.onlyOne){
            activeUsersRating = [...this.state.theOne] 
          }
            activeUsersRating.map( user => { 
            return    user.types.map( userType => {
                    if (userType.id === type.id) {
                        totalHype += +userType.pivot.hype
                        if(+userType.pivot.hype === this.state.exludeLevel) {
                            zeroRated.push(type);
                        }
                    }
                })
            
            })
            type.totalHype = totalHype;
        })
        
        let data =[...group.types.filter( (type) =>{return !zeroRated.includes(type) ? type : null  } ).sort(this.compareValues('totalHype', false))]; 
       
        let votingList =[...data];
        votingList.sort(this.compareValues('totalHype', false)).slice(0,3);

        return (

            <React.Fragment>
                  {this.props.group.pivot.permissions === "superuser" ? 
                        <div
          className={"mega-button"}
          onClick={() => this.props.setUpVote(votingList.sort(this.compareValues('totalHype', false)).slice(0,3))}>
                                 CAST VOTE </div>
                                 : null} 
                <div className={"active-user-minilist"}>
                    {activeUsersRating.map(user => {
                        return (
                            <div
                            className={"active-user-minilist"} 
                            onClick={() => this.checkPlayerRating(user)}
                            key={user.name}
                            >{user.name}</div>
                        )
                    })}
                </div>
      
            
                {group.types ? (
                    <table className="hypecheck-results-list">
                        <tbody className="hypecheck-results-list">
                       
                            {this.props.user.permissions === "basic"
                                ? data.map((type, index) => {
                                      if (index < 3) {
                                          return (
                                              <tr
                                                  key={
                                                      type.id + " " + type.hype
                                                  }
                                              >
                                                  <td>{type.type}</td>
                                              </tr>
                                          );
                                      }
                                  })
                                : data.map((type) => {

                               
                                      return (
                                       
                                       
                                          <tr key={type.id + ' ' + type.hype}>
                                              <td>{type.type}</td>

                                              <td
                                                  style={{ marginLeft: "auto" }}
                                              >
                                                  {type.totalHype}
                                              </td>
                                              <td
                                                  style={{ marginLeft: "20px" }}
                                              >
                                                  {type.average}
                                              </td>
                                          </tr>
                                         
                                      );



                                  })}
                        </tbody>
                    </table>
                ) : null}
        
  
            </React.Fragment>
        );
    }
}
export default Hypecheck;
