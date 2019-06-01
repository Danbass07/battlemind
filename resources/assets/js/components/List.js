import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentToDisplay: [],
        };
    }
    deleteHandler(id) {
        
        const isNotId = contentToDisplay => contentToDisplay.id !== id;
        const updatedContent = this.state.contentToDisplay.filter(isNotId);
        this.setState({contentToDisplay: updatedContent});
        axios.delete(`/${this.props.object}s/${id}`);

    }
    renderContent(type){
     return  this.state.contentToDisplay.map(contentToDisplay =>  {
       if( contentToDisplay.type === type ) {

        return   <div key={contentToDisplay.id} className="list-item">
                 
                       
        <div className="list-item-name">{contentToDisplay.name}</div>
        <Link to={`/${this.props.object}s/${contentToDisplay.id}/edit`} className="button update">Update</Link>
        <button onClick={() => this.deleteHandler(contentToDisplay.id)}
        className="button">Delete</button>
    

</div>
       }
    
        }
            
        )
    }
    getContent() {
        if (this.props.object !== 'none') {
            axios.get(`/${this.props.object}s`).then(response =>
            this.setState({
                myContent: [...response.data.content[0]],
                friendsContent: [...response.data.content[1]],
                contentToDisplay: [...response.data.content[0]]
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
    myOnlyButtonHandler() {
        this.setState({
            contentToDisplay: [...this.state.myContent]
        })

    }
    myFriendsOnlyButtonHandler() {
        this.setState({
            contentToDisplay: [...this.state.friendsContent]
        })

    }
    allButtonHandler() {
        const all = this.state.myContent.concat(this.state.friendsContent)
        this.setState({
            contentToDisplay: [...all]
        })

    }
    typeChangeHandler(e){
        e.preventDefault();
        this.setState({
            type: e.target.value
        })
    }
   
    
    render() {
        console.log(this.state);
      
        return (
            <div className="Workarea">
            <button onClick={() => this.myOnlyButtonHandler()}> My only toggler</button>
            <button onClick={() => this.myFriendsOnlyButtonHandler()}> My Friends only toggler</button>
            <button onClick={() => this.allButtonHandler()}> All toggler</button>
            <select
                name="Choose a type"
                className="myform-control"
                onChange={e => this.typeChangeHandler(e)}
            >
                <option>Choose a Type</option>
                {this.props.types.map(type => (
                    <option
                        value={type.name}
                        key={type.id }
                    >
                        {type.type}
                    </option>
                ))}
            </select>
                <div className="list-grid">{this.renderContent(this.state.type)}</div>
            </div>
        );
    }
}
export default List
