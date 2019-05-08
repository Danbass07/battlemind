import React, { Component } from 'react';




class Card extends Component {


    render() {
        const style = {
            height: '250px',
            backgroundImage: 'url("/images/'+this.props.player.url+'")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            padding: '2px',
        }
        const style2 = {
            width: '100%',
            backgroundColor: 'rgb(245, 222, 179, 0.8)',
            margin: '13% auto',
            textAlign: 'center',

        }
        return(
            <div>
                <div className="Player-results-board">
                    <div className="Player-results">Wins:{' '}{this.props.player.pivot.win}</div>
                    <div className="Player-results">Losts:{' '}{this.props.player.pivot.lost}</div>
                    <div className="Player-results">Draws:{' '}{this.props.player.pivot.draw}</div>
                </div>

                <button className={"Score-button"} onClick={() => this.props.buttoncontroller('Win', 1)}>+</button>
                <button className={"Score-button"} onClick={() => this.props.buttoncontroller('Win', -1)}>-</button>
                <button className={"Score-button"} onClick={() => this.props.buttoncontroller('Lost', 1)}>+</button>
                <button className={"Score-button"} onClick={() => this.props.buttoncontroller('Lost', -1)}>-</button>
                <button className={"Score-button"} onClick={() => this.props.buttoncontroller('Draw', 1)}>+</button>
                <button className={"Score-button"} onClick={() => this.props.buttoncontroller('Draw', -1)}>-</button>
                <div style={style}><h1 style={style2}>{this.props.player.name}</h1></div>

            </div>

                
        )
    }
}
export default Card