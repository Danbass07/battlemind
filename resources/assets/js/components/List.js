import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
        };
    }
    deleteHandler(id) {
        
        const isNotId = player => player.id !== id;
        const updatedPlayer = this.state.players.filter(isNotId);
        this.setState({players: updatedPlayer});
        axios.delete(`/players/${id}`);

    }
    renderContent(){
        return this.state.content.map(content => (
            <div key={content.id} className="list-item">
                 
                    
                        {content.name}
                        <Link to={`${this.props.object}s/${content.id}/edit`} className="button update">Update</Link>
                        <button onClick={() => this.deleteHandler(content.id)}
                        className="button">Delete</button>
                    
               
             </div>
        ))
    }
    getContent() {
        axios.get(`/${this.props.object}s`).then(response =>
         this.setState({
            content: [...response.data.content]
             })
        );
    }
    componentWillMount() {
      this.getContent(); 
    }
    componentDidUpdate(prevProps) {
        if( prevProps.object !== this.props.object)    {
             this.getContent();   
            console.log(prevProps.object)
            console.log(this.props.object)
        }
    }

    
    render() {
        {console.log(this.props.object)}
      
        return (
            <div className="maincontent">
             
                <div className="list-grid">{this.renderContent()}</div>
            </div>
        );
    }
}
export default List
