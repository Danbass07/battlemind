import React, { Component } from 'react';


class Newplayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: 'planeswalker',
            url: 'url',
            wins: 0,
            lost: 0,
            draws: 0,
            response: {status: "You are creating...:" },

        };
        
    }

    changeHandler(e) {
        this.setState({
            [e.target.placeholder]: e.target.value
        });
    }
    optionChangeHandler(e) {
        
        this.setState({
            type: e.target.value,
        });
    }

    submitHandler(e) {
     
        e.preventDefault();
       
        axios.post('/players', {
            name: this.state.name,
            type: this.state.type,
            url: this.state.url,
            wins: this.state.wins,
            lost: this.state.lost,
            draws: this.state.draws,
        }).then(response => {
            
           this.setState({
            name: '',
            type: 'blank',
            url: 'url',
            wins: 0,
            lost: 0,
            draws: 0,
            response: response,
           });
        

        });

    }

    render() {
        return (
            
            <div className="Workarea">
                <form className="myform"  onSubmit={(e) => this.submitHandler(e)} >

                    <input 
                    className="myform-control"
                    placeholder="name"
                    onChange={(e) => this.changeHandler(e)}
                    required                    
                    />

                    <select 
                    className="myform-control"
                    
                    
                    onChange={(e) => this.optionChangeHandler(e)}
                    >
                    {this.props.types.map(type => (

                        <option  key={type.id}>{type.type}</option>

                    ))}
                    </select>
                    
                    <button 
                    type="submit" 
                    className="submit-button"
                    >
                    Add new player
                    </button>
                    <div className="response-display">
                    {this.state.response.status === 200 ? (
                        <h2 style={{ color: "green" }}>
                            'SUCCESS'{" "}
                        </h2>
                    ) : (
                        this.state.response.status !== "You are creating...:" ?
                        <h2 style={{ color: "red" }}>
                            'FAILED'
                        </h2> : null
                    )}
                </div>     
                </form>
            
            </div>
        );
    }
}
export default Newplayer
