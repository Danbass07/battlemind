import React, { Component } from 'react';
import {compareValues} from '../functions';
import {Link} from 'react-router-dom';

class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: [],
           
        };

        this.submitHandlerTwo = this.submitHandlerTwo.bind(this);
        this.fileUpload = this.fileUpload.bind(this);

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
    const formData = {file: image}
    return  axios.post(url, formData)
            .then(response => console.log(response))
  }

  render() {
    return (
     
        
            <form onSubmit={this.submitHandlerTwo} encType="multipart/form-data">

                    <input 
                    type="file"
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
         
         
          

    );
}
}
export default Photo