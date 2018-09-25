import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
           players: [],
        };
    }
    deleteHandler(id) {
        
        const isNotId = player => player.id !== id;
        const updatedPlayer = this.state.players.filter(isNotId);
        this.setState({players: updatedPlayer});
        axios.delete(`/players/${id}`);

    }
    renderPlayers(){
        return this.state.players.map(player => (
            <div key={player.id} className="media">
                 <div className="media-body">
                    <div>
                        {player.name}
                        <Link to={`players/${player.id}/edit`} className="btn btn-sm btn-success float-right">Update</Link>
                        <button onClick={() => this.deleteHandler(player.id)}
                        className="btn btn-sm btn-warning float-right">Delete</button>
                    </div>
              </div>
             </div>
        ))
    }
    getPlayers() {
        axios.get('/players').then(response =>
         this.setState({
            players: [...response.data.players]
             })
        );
    }
    componentWillMount() {
      this.getPlayers(); 
    }
    render() {
      
        return (
            <div className="container">
                <h1>Players Component</h1>
                <h2>List of all your players (decks,armies,teams)</h2>
                {this.renderPlayers()}
            </div>
        );
    }
}
export default Players
