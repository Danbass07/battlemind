import React, { Component } from 'react';


class Newscoreboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: 'planeswalker',
            url: '',
            wins: 0,
            lost: 0,
            draws: 0,
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
      
       // e.preventDefault();
      
        axios.post('/scoreboards', {
            name: this.state.name,
            type: this.state.type,
    
        }).then(response => {
            
           this.setState({
            name: '',
            type: '',
        });
        if (response.status == 200){
             alert("SUCCESS")
            }
        });

    }
    render() {
        return (
            <div className="Workarea">
                <form className="myform" onSubmit={() => this.submitHandler()} >
               
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
                                Add new Scoreboard
                                </button>
                             
                </form>
            
            


                
            </div>
        );
    }
}
export default Newscoreboard
