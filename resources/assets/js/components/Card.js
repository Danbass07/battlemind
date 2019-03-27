import React, { Component } from 'react';




class Card extends Component {


    render() {
        const style = {
            height: '250px',
            backgroundImage: 'url("/images/'+this.props.url+'")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            padding: '2px',
        }
        const style2 = {
            width: '100%',
            backgroundColor: 'rgb(245, 222, 179, 0.6)',
            margin: '25% auto',
            textAlign: 'center',

        }
        return(
            <div>
                <button className={"Score-button"} onClick={() => this.props.actioncontroller()}>{this.props.action === 1 ? 'ADD click to change' : 'REMOVE clickto change'}</button>
                <div style={style}><h1 style={style2}>{this.props.name}</h1></div>
                <button className={"Score-button"} onClick={() => this.props.buttoncontroller('Win', this.props.action)}>Win</button>
                <button className={"Score-button"} onClick={() => this.props.buttoncontroller('Lost', this.props.action)}>Lost</button>
                <button className={"Score-button"} onClick={() => this.props.buttoncontroller('Draw', this.props.action)}>Draw</button>

            </div>

                
        )
    }
}
export default Card