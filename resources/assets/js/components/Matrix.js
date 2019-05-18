import React, { Component } from 'react';




class Matrix extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupId: 0,
            typeId: 0,
         
        
        };
    }
    addTypeToGroup() {
        axios
        .get(`/types/${this.state.typeId}/addToTheGroup/${this.state.groupId}`)
        .then(response =>{ console.log(response)
            });
        
    }
    componentDidMount() {

    }

    render() {
        const style = {
            height: '300px',
            width: '400px',
            backgroundColor: 'black',
            marginTop: '10px',
            padding: '2px',
            color: 'wheat',
        }
        // console.log(this.props.userGroups)
        return(
            <div style={style}>
                <h1>Matrix</h1>
                
                                <select onChange={(e) => this.setState({typeId: e.target.value})}>
                                {this.props.types.map((type) => (
                                    <option  key={type.id}  name="type" value={type.id} > {type.type} </option>
                                ))}
                                </select>
                                <select onChange={(e) => this.setState({groupId: e.target.value})}>
                                {this.props.groups.map((group) => (
                                    <option  key={group.id}  name="group" value={group.id} > {group.name} </option>
                                ))}
                                </select>
                                <button onClick={() => this.addTypeToGroup()}>ADD GAME</button>

                       
                            
              
           
           </div>
        )
    }
}
export default Matrix