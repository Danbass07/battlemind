import React, { Component } from 'react';


class Newplayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: '',
            url: '',
            wins: 0,
            lost: 0,
            draws: 0,
            types: [
                { id: 0,
                  type: 'test' },

            ],
        };
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.typeChangeHandler = this.typeChangeHandler.bind(this);
        this.urlChangeHandler = this.urlChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.getTypes = this.getTypes.bind(this);
        
        // this.renderTasks = this.renderTasks.bind(this);
        // this.deleteHandler = this.deleteHandler.bind(this);
    }

    nameChangeHandler(e) {
        this.setState({
            name: e.target.value
        });
    }
    typeChangeHandler(e) {
        this.setState({
            type: e.target.value
        });
    }
    urlChangeHandler(e) {
        // this.setState({
        //     url: e.target.value
        // });
    }
  
    

    submitHandler(e) {
      
        e.preventDefault();
      
        axios.post('players', {
            name: this.state.name,
            type: this.state.type,
            // url: this.state.url,
            wins: this.state.wins,
            lost: this.state.lost,
            draws: this.state.draws
        }).then(response => {
            
           this.setState({
            name: '',
            type: '',
            url: '',
            wins: 0,
            lost: 0,
            draws: 0,
           });
           this.props.history.push('/home');
        });

    }
    getTypes() {
        axios.get('/types').then(response =>
         this.setState({
            types: [...response.data.types]
             })
        );
    }
    componentWillMount(){
        this.getTypes();
    }

    render() {
        return (
            <div className="maincontent">
                <form className="myform" onSubmit={this.submitHandler} >
               
                                <input 
                                className="myform-control"
                                placeholder="Name"
                                onChange={this.nameChangeHandler}
                                required
                                
                                />
                                <select 
                                className="myform-control"
                                required
                                onChange={this.typeChangeHandler}
                                >
                            {this.state.types.map(type => (
                                <option key={type.id}>{type.type}</option>
                            ))}
                                
                                
                                
                                </select>
                                
                                
                                                            
                                
                                
                                <button 
                                type="submit" 
                                className="submit-button"

                                >
                                Add new player
                                </button>
                          
                </form>
            
            


                
            </div>
        );
    }
}
export default Newplayer
