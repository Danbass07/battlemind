import React, { Component } from 'react';





class Hypecheck extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {

    }
  

    render() {
    console.log(this.props.userTypes);
        const style= {
            color: 'white',
        }
        return(
       <React.Fragment>
           {this.props.userTypes.map(result => {
           return    <h1 key={result.id} style={style}>{result.hype}</h1>
           })}
        
       </React.Fragment>
           
    

                
        )
    }
}
export default Hypecheck