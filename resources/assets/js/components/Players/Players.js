import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Players.css';

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
            <div key={player.id} className="list-item">
                 
                    
                        {player.name}
                        <Link to={`players/${player.id}/edit`} className="button update">Update</Link>
                        <button onClick={() => this.deleteHandler(player.id)}
                        className="button">Delete</button>
                    
               
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
            <div className="maincontent">
             
                <div className="list-grid">{this.renderPlayers()}</div>
            </div>
        );
    }
}
export default Players
