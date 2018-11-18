import React, { Component } from 'react';
import Table from '../components/Table';

class Scoreboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            leagues: [],
            players: [],
            users: [],
            filter: 'all',
                    
        };
      
   
       
         
  
        
    }
    
    getAll() {
        // axios.get('/scoreboard').then(response =>
        //  this.setState({
        //     players: [...response.data.players],
        //     leagues: [...response.data.leagues],
        //     users: [...response.data.users],
            
          
        //      })      
        // );
        
    }
    componentWillMount() {
        
      this.getAll(); 
     
      
      
    }
  
    filterResult(e) {
        this.setState({
            filter: e.target.id,
        })
        console.log(e.target.id);
    }


    render() {
        return (
            <div className="container">
                <h1>Welcome Component</h1>
                <h2>Information you want to see every time you visit your profile</h2>
                {/* <div>
                    <div id='all' onClick={this.filterResult}>All</div>
                {this.state.users.map(user =>
                    <button id={user.id} key={user.id} onClick={this.filterResult}>{user.name}</button>
                )}
                </div>
          
                <hr />
                {this.state.filter === 'all' ?
                <Table players={this.state.players} leagues={this.state.leagues} users={this.state.users} /> : null} */}
                
             
              
            </div>
        );
    }
}
export default Scoreboard
