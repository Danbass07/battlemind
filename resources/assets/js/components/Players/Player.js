import React, { Component } from 'react';
import {Link} from 'react-router-dom'


class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: 'planeswalker',
            allTypes: [],
            url: '',
  
        };

        
    }
   
        
    

    changeHandler(e, placeholder) {
    
        this.setState({
            [placeholder]: e.target.value
        });
 
    }


   
    submitHandler(e) {

        e.preventDefault();
      
        axios.put(`/players/${this.props.match.params.id}`, {
            name: this.state.name,
            type: this.state.type,
            url: this.state.url,
        });

    }
    

    getPlayers() {
        axios.get(`/players/${this.props.match.params.id}/edit`).then(response =>
         this.setState({
            name: response.data.player.name,            
            type: response.data.player.type,
            url: response.data.player.url,
             })
        );
    }
    getTypes() {
        axios.get('/types').then(response =>
         this.setState({
            allTypes: [...response.data.allTypes]
             },)
        );
    }
    componentWillMount() {
      this.getPlayers(); 
      this.getTypes();
      
    }


    render() {
        return (
        <div > 
            
            <div className="Modal">
            <Link to={`/`} className="Cancel-button">X</Link>
            <div className="myform">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Edit Player</div>

                           <form onSubmit={(e) => this.submitHandler(e)}>
                <div 
                               className="form-group">
                                <input 
                                className="form-control"
                                value={this.state.name}
                                onChange={(e) => this.changeHandler(e, "name")}
                                required
                                
                                />
                        <select className="myform-control" 
                                required
                                value={this.state.type}
                                onChange={(e) => this.changeHandler(e, "type")}>
               
                        {this.state.allTypes.map(type => (
                            
                        <option  value={type.type} key={type.id}>{type.type}</option> ))}
                        </select>
                                
                                
                                <input 
                                className="form-control" 
                                required
                                value={this.state.url}
                                onChange={(e) => this.changeHandler(e, "url")}
                                />
                                
                                
                                </div>
                                
                              
                                
                                <button 
                                type="submit" 
                                className="btn btn-primary"

                                >
                               Edit player
                                </button>
                </form>
                            <hr />
                            
                        </div>
                   
                </div>
            </div>
            
            </div>
            
       
        </div>
        );
    }
}
export default Player


