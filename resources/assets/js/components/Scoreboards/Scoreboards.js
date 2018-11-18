import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class Scoreboards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scoreboards: [],
            
        };
    }
    deleteHandler(id) {
        
        const isNotId = scoreboard => scoreboard.id !== id;
        const updatedScoreboard = this.state.scoreboards.filter(isNotId);
        this.setState({scoreboards: updatedScoreboard});
        axios.delete(`/scoreboards/${id}`);

    }
    renderScoreboards(){
        return this.state.scoreboards.map(scoreboard => (
            <div key={scoreboard.id} className="media">
                 <div className="media-body">
                    <div>
                        {scoreboard.name}
                        <Link to={`scoreboards/${scoreboard.id}/edit`} className="btn btn-sm btn-success float-right">{scoreboard.id}Update</Link>
                        <button onClick={() => this.deleteHandler(scoreboard.id)}
                        className="btn btn-sm btn-warning float-right">Delete</button>
                    </div>
              </div>
             </div>
        ))
    }
    getScoreboards() {
       
        axios.get('/scoreboards').then(response =>
         this.setState({
            scoreboards: [...response.data.scoreboards]
             })
        );
        
    }
    componentWillMount() {
      
        this.getScoreboards(); 
      }
 
    render() {
    
        return (
            <div className="container">
                <h1>Scoreboard Component</h1>
                <h2>List of all your Scoreboards</h2>
                
                {this.renderScoreboards()}
            </div>
        );
    }
}
export default Scoreboards
