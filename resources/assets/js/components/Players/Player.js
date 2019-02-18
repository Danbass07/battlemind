import React, { Component } from 'react';
import {Link} from 'react-router-dom'


class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: 'planeswalker',
            types: [],
            url: '',
  
        };

        
    }
   
        
    

    changeHandler(e) {
        this.setState({
            [e.target.placeholder]: e.target.value
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
            types: [...response.data.types]
             })
        );
    }
    componentWillMount() {
      this.getPlayers(); 
      this.getTypes();
    }


    render() {
        
        return (
        <div > 
            <div className="Modal"></div>
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
                                placeholder="name"
                                value={this.state.name}
                                onChange={(e) => this.changeHandler(e)}
                                required
                                
                                />
                        <select className="myform-control" 
                                placeholder="type"
                                required
                                value={this.state.type}
                                onChange={(e) => this.changeHandler(e)}>
                
                        {this.state.types.map(type => (
                            
                        <option value={type.type} key={type.id}>{type.type}</option> ))}
                        </select>
                                
                                
                                <input 
                                className="form-control" 
                                placeholder="url"
                                required
                                value={this.state.url}
                                onChange={(e) => this.changeHandler(e)}
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
        );
    }
}
export default Player


