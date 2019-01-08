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
        
        const isNotId = content => content.id !== id;
        const updatedContent = this.state.content.filter(isNotId);
        this.setState({content: updatedContent});
        axios.delete(`/${this.props.object}s/${id}`);

    }
    renderContent(){
        return this.state.content.map(content => (
            <div key={content.id} className="list-item">
                 
                    
                        <div className="list-item-name">{content.name}</div>
                        <Link to={`/${this.props.object}s/${content.id}/edit`} className="button update">Update</Link>
                        <button onClick={() => this.deleteHandler(content.id)}
                        className="button">Delete</button>
                    
               
             </div>
        ))
    }
    getContent() {
        if (this.props.object !== 'none') {
            axios.get(`/${this.props.object}s`).then(response =>
            this.setState({
                content: [...response.data.content]
                })
            );
        }
    }
    componentWillMount() {
      this.getContent(); 
    }
    componentDidUpdate(prevProps) {
        if( prevProps.object !== this.props.object)    {
             this.getContent();   
           
            
        }
    }

    
    render() {
      
        return (
            <div className="Workarea">
             
                <div className="list-grid">{this.renderContent()}</div>
            </div>
        );
    }
}
export default List
