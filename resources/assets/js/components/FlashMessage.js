import React, { Component } from 'react';
import { isAbsolute } from 'path';




class FlashMessage extends Component {


    render() {
        const style = {
            position: 'absolute',
            height: '250px',
            width: '100%',
            backgroundColor: 'wheat',
            color: 'darkred',
            top: '250px',
            zIndex: '1000',
        }
     
        return(
            <div style={style}>
        
               {this.props.message}
            </div>

                
        )
    }
}
export default FlashMessage