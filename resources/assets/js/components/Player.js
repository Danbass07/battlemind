import React, { Component } from 'react';
import {Link} from 'react-router-dom'


class Player extends Component {
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
        this.addWin = this.addWin.bind(this);
        this.addLost = this.addLost.bind(this);
        this.addDraw = this.addDraw.bind(this);
        this.removeWin = this.removeWin.bind(this);
        this.removeLost = this.removeLost.bind(this);
        this.removeDraw = this.removeDraw.bind(this);
        
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
        this.setState({
            url: e.target.value
        });
    }

   
    submitHandler(e) {

        e.preventDefault();
        axios.put(`/players/${this.props.match.params.id}`, {
            name: this.state.name,
            type: this.state.type,
            url: this.state.url,
            wins: this.state.wins,
            lost: this.state.lost,
            draws: this.state.draws
        }).then(response => {
           this.props.history.push('/home');
        });

    }
    

    getPlayers() {
        axios.get(`/players/${this.props.match.params.id}/edit`).then(response =>
         this.setState({
            name: response.data.player.name,            
            type: response.data.player.type,
            url: response.data.player.url,
            wins: response.data.player.wins,
            lost: response.data.player.lost,
            draws: response.data.player.draws,
             })
        );
    }
    componentWillMount() {
      this.getPlayers(); 
    }
    addWin(){
        
        const win = +this.state.wins + +1;
        this.setState({
            wins: win
        });
    }
    addLost(){
        const lost = +this.state.lost + +1;
        this.setState({
            lost: lost
        });
    }
    addDraw(){
        const draw = +this.state.draws + +1;
        this.setState({
            draws: draw
        });
    }
    removeWin(){
        
        const win = +this.state.wins - +1;
        if (win >= 0) {
            this.setState({
                wins: win
            });
        }
    }
    removeLost(){
        const lost = +this.state.lost - +1;
        if (lost >= 0) {
            this.setState({
                lost: lost
            });
        }
    }
    removeDraw(){
        const draw = +this.state.draws - +1;
        if (draw >= 0) {
            this.setState({
                draws: draw
            });
        }
    }
    render() {
        console.log(this.props.match.params.id);
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Edit Player</div>

                           <form onSubmit={this.submitHandler}>
                <div 
                               className="form-group">
                                <input 
                                className="form-control"
                                placeholder="Name"
                                value={this.state.name}
                                onChange={this.nameChangeHandler}
                                required
                                
                                />
                                <input 
                                className="form-control"
                                placeholder="Type"
                                required
                                value={this.state.type}
                                onChange={this.typeChangeHandler}
                                />
                                
                                
                                <input 
                                className="form-control" 
                                placeholder="Url"
                                required
                                value={this.state.url}
                                onChange={this.urlChangeHandler}
                                />
                                
                                
                                </div>
                                
                                <div>Wins :{this.state.wins}</div><div onClick={this.addWin}>++++</div><hr /><div onClick={this.removeWin}>----</div>
                                <div>Lost: {this.state.lost}<div onClick={this.addLost}>++++</div><hr /><div onClick={this.removeLost}>----</div></div>
                                <div>Draws: {this.state.draws}<div onClick={this.addDraw}>++++</div><hr /><div onClick={this.removeDraw}>----</div></div>
                                
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


