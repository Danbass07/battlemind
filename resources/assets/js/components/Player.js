import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Player extends Component {
    render() {
        return (
            <div className="container">
                <h1>Player Component</h1>
                <h2>Display all information about certain player(deck,team, army)</h2>
                <h2>You can update results</h2>
            </div>
        );
    }
}
export default Player
