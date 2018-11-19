import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class Leagues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leagues: [],
        };
    }
    deleteHandler(id) {
        
        const isNotId = league => league.id !== id;
        const updatedLeague = this.state.leagues.filter(isNotId);
        this.setState({leagues: updatedLeague});
        axios.delete(`/leagues/${id}`);

    }
    renderLeagues(){
        return this.state.leagues.map(league => (
            <div key={league.id} className="media">
                 <div className="media-body">
                    <div>
                        {league.name}
                        <Link to={`leagues/${league.id}/edit`} className="btn btn-sm btn-success float-right">{league.id}Update</Link>
                        <button onClick={() => this.deleteHandler(league.id)}
                        className="btn btn-sm btn-warning float-right">Delete</button>
                    </div>
              </div>
             </div>
        ))
    }
    getLeagues() {
       
        axios.get('/leagues').then(response =>
         this.setState({
            leagues: [...response.data.leagues]
             })
        );
        
    }
    componentWillMount() {
      
        this.getLeagues(); 
      }
 
    render() {
    
        return (
            <div>
                <h1>Leagues Component</h1>
                <h2>List of all your leagues</h2>
                
                {this.renderLeagues()}
            </div>
        );
    }
}
export default Leagues
