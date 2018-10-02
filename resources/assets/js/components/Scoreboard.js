import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Scoreboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leagues: [],
           players: [],
           users: [],
           file: [],
           
        };
      
         this.displayTable = this.displayTable.bind(this);
         this.calculatePoints = this.calculatePoints.bind(this);
         this.onChange = this.onChange.bind(this)
         this.submitHandlerTwo = this.submitHandlerTwo.bind(this);
         this.fileUpload = this.fileUpload.bind(this)
         //this.fileInput = React.createRef();
        
    }
    compareValues(key, order='asc') {
        return function(a, b) {
          if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
              return 0; 
          }
      
          const varA = (typeof a[key] === 'string') ? 
            a[key].toUpperCase() : a[key];
          const varB = (typeof b[key] === 'string') ? 
            b[key].toUpperCase() : b[key];
      
          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            (order == 'desc') ? (comparison * -1) : comparison
          );
        };
      }
    calculatePoints(league) {
        this.state.players.map(player => (
           
          player.total =  player.wins * league.win_point_value + player.lost * league.lost_point_value + player.draws * league.draw_point_value
        ));
            const playersSoted = [...this.state.players.sort(this.compareValues('total',  'desc'))];
            // this.setState({
            //     players: playersSoted,
            // })
         
    }

  

    displayTable(league) {
        this.calculatePoints(league);
        const playersGlobalResults = 
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Name </th> 
                    <th scope="col">Owner </th>
                    <th scope="col">Points </th>    
                    <th scope="col"> Wins </th> 
                    <th scope="col"> Lost </th> 
                    <th scope="col"> Draws  </th>
                </tr>
            </thead> 
        {this.state.players.sort(this.compareValues('total',  'desc')).map(player => (
            
            
            <tbody key={player.id}>
                <tr>
                    <td>{player.name}</td>   

                {this.state.users.map(user => (
                    user.id === player.user_id ? <td key={user.id}>{user.name}</td> : null ))}

                    <td>{player.total}</td>
                    {/* <td>{player.wins * league.win_point_value + player.lost * league.lost_point_value + player.draws * league.draw_point_value}</td>  */}
                    <td>{player.wins}</td>
                    <td>{player.lost}</td> 
                    <td>{player.draws}</td>
                </tr>    
            </tbody>
        
            
        ))}
        </table>
        return playersGlobalResults
    }
    renderScoreboard(){                         
      
      
        
        const tableHead = this.state.leagues.map(league => (
                <div key={league.id} className="media">
                     <div className="media-body">
                        <div>
                            <table >
                                {this.state.users.map(user => (
                                    <thead key={user.id}>
                                        {league.user_id === user.id ?
                                            <tr>
                                                <th scope="col"> Name : {league.name}</th> 
                                                <th scope="col"> User : {user.name} </th> 
                                            </tr>
                                        : null}
                                    </thead>))}
                            
                            </table>
                            {this.displayTable(league)}
                            <hr />
                        </div>
                    </div>
                </div>));
            return tableHead
     
    }

    getAll() {
        axios.get('/scoreboard').then(response =>
         this.setState({
            players: [...response.data.players],
            leagues: [...response.data.leagues],
            users: [...response.data.users],
          
             })      
        );
        
    }
    componentWillMount() {
        
      this.getAll(); 
     
      
      
    }

    onChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
              return;
        this.createImage(files[0]);
      }

    submitHandlerTwo(e) {


        e.preventDefault() 
      this.fileUpload(this.state.image);
        // e.preventDefault();
        // this.setState({file:this.fileInput.current.files[0]});
        
        // const load = this.fileInput.current.files[0];
        // console.log(load);
        // axios.post('scoreboard', 
        //     load
        // ).then(response =>console.log(response));
    }
    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.setState({
            image: e.target.result
          })
        };
        reader.readAsDataURL(file);
      }
      fileUpload(image){
        const url = 'fileupload';
        const formData = {file: this.state.image}
        return  axios.post(url, formData)
                .then(response => console.log(response))
      }
    render() {
        return (
            <div className="container">
                <h1>Welcome Component</h1>
                <h2>Information you want to see every time you visit your profile</h2>
                <form onSubmit={this.submitHandlerTwo} encType="multipart/form-data">

                        <input 
                        type="file"
                        // ref={this.fileInput}
                        onChange={this.onChange}

                        required
                        />
                        <button 
                        type="submit"
                        className="btn btn-primary"
                        >
                        Add Photo
                        </button>

                </form>
                <hr />
                {this.renderScoreboard()}
             
              
            </div>
        );
    }
}
export default Scoreboard
