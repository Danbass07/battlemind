import React, { Component } from 'react';




class Card extends Component {


    render() {
        const style = {
            height: '100%',
            width: 'auto',
            backgroundImage: 'url("/images/'+this.props.url+'")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            padding: '2px',
        }
        return(
            <div style={style}>
                    <button className={"Score-button"} onClick={() => this.props.buttoncontroller('Win', this.props.action)}>Win</button>
                    <button className={"Score-button"} onClick={() => this.props.buttoncontroller('Lost', this.props.action)}>Lost</button>
                    <button className={"Score-button"} onClick={() => this.props.buttoncontroller('Draw', this.props.action)}>Draw</button>
                    <button className={"Score-button"} onClick={() => this.props.actioncontroller()}>{this.props.action === 1 ? <p>Now you add results</p> : <p>Now you remove results </p> } </button>
            </div>
        )
    }
}
export default Card