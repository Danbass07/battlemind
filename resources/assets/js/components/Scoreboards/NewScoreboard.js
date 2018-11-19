import React, { Component } from 'react';


class NewScoreboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: '',
            url: '',
            wins: 0,
            lost: 0,
            draws: 0,
        };
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.typeChangeHandler = this.typeChangeHandler.bind(this);
        this.urlChangeHandler = this.urlChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        
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
      
        axios.post('scoreboards', {
            name: this.state.name,
            type: this.state.type,
    
        }).then(response => {
            
           this.setState({
            name: '',
            type: '',
        });
       
          this.props.history.push('/home');
        });

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
                                <input 
                                className="myform-control"
                                placeholder="Type"
                                required
                                onChange={this.typeChangeHandler}
                                />
                                
                                
                                                            
                                
                                
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
export default NewScoreboard
