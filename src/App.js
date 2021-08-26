import React, {Component} from 'react';
// eslint-disable-next-line
import {Modal,ModalBody,ModalHeader,ModalFooter} from "reactstrap";
// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
import fireDB from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from './firebase';
class App extends Component {
  state={
    data:[],
    modalInsert:false, 
    modalEdit:false,
    form:{
      title:'',
      image:'',
      description:'',
      score:'',
      price:'',

      
    }, 
    id:0,

  }
  petitionGet=()=>{
    fireDB.child('games').on('value', game=>{
      if(game.val()!==null){
        this.setState({...this.state.data, data: game.val()})
      }else{
        this.setState({data:[]})

      }
    })
  }

  petitionPost=()=>{
    firebase.child("games").push(this.state.form, error=>{
      if(error)console.log(error)
    });
    this.setState({modalInsert:false});
  }

  petitionPut=()=>{
    firebase.child(`games/${this.state.id}`).set(
      this.state.form, 
      error=>{
        if(error)console.log(error);
      });
      this.setState({modalEdit:false});
  }
  
  petitionDelete=()=>{
    if(window.confirm(`Are you sure you want to delete ${this.state.form && this.state.form.title}?`))
    {
      firebase.child(`games/${this.state.id}`).remove(
        error=>{
          if(error)console.log(error);
        });
    }
    
  }
  handleChange=e=>{
    this.setState({form:{
      ...this.state.form,
      [e.target.name]:e.target.value
    }})
    console.log(this.state.form)
  }

  selectedGame= async(game,id, gamecase)=>{
    await this.setState({form:game, id:id,});

    (gamecase==="Edit")?this.setState({modalEdit:true}):
    this.petitionDelete();
  }

  componentDidMount(){
    this.petitionGet();
  }

  render(){
    return (
      <div className="App">
        <h1 className="mt-5 mb-5">Game List</h1>
        <button className="btn mb-5 btn-success" onClick={()=>this.setState({modalInsert:true})}>Insertar</button>
        <br></br>
        <table className="table table-bordered">
          <thead>
            <th>Title</th>
            <th>Link</th>
            <th>Description</th>
            <th>Score</th>
            <th>Price</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {Object.keys(this.state.data).map(i=>{
              console.log(i)
              return <tr key={i}>
                <td>{this.state.data[i].title}</td>
                <td><a href={`${this.state.data[i].image}`}>{this.state.data[i].image}</a></td>
                <td>{this.state.data[i].description}</td>
                <td>{this.state.data[i].score}</td>
                <td>{this.state.data[i].price}</td>
                <td>
                  <button className="btn btn-primary"  onClick={()=>this.selectedGame(this.state.data[i],i,'Edit')}>Edit</button> {""}
                  <button className="btn btn-danger" onClick={()=>this.selectedGame(this.state.data[i],i,'Delete')}>Delete</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
        <Modal isOpen={this.state.modalInsert}>
          <ModalHeader>Insert Game</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Game:</label>
              <br/>
              <input name="title" type="text" className="form-control" onChange={this.handleChange}/>
              <br/>
              <label>Image link:</label>
              <br/>
              <input name="image" type="text" className="form-control" onChange={this.handleChange}/>
              <br/>
              <label>Description:</label>
              <br/>
              <input name="description" type="text" className="form-control" onChange={this.handleChange}/>
              <br/>
              
              <label>Score:</label>
              <br/>
              <input name="score" type="text" className="form-control" onChange={this.handleChange}/>
              <br/>
              <label>Price:</label>
              <br/>
              <input name="price" type="text" className="form-control" onChange={this.handleChange}/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>this.petitionPost()}>Insertar</button>
            <button className="btn btn-danger" onClick={()=>this.setState({modalInsert:false})}>Cancelar</button>
            
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.modalEdit}>
          <ModalHeader>Edit Game</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Game:</label>
              <br/>
              <input name="title" type="text" className="form-control" onChange={this.handleChange} value={this.state.form && this.state.form.title}/>
              <br/>
              <label>Image link:</label>
              <br/>
              <input name="image" type="text" className="form-control" onChange={this.handleChange} value={this.state.form && this.state.form.image}/>
              <br/>
              <label>Description:</label>
              <br/>
              <input name="description" type="text" className="form-control" onChange={this.handleChange} value={this.state.form && this.state.form.description}/>
              <br/>
              
              <label>Score:</label>
              <br/>
              <input name="score" type="text" className="form-control" onChange={this.handleChange} value={this.state.form && this.state.form.score}/>
              <br/>
              <label>Price:</label>
              <br/>
              <input name="price" type="text" className="form-control" onChange={this.handleChange} value={this.state.form && this.state.form.price}/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>this.petitionPut()}>Accept</button>
            <button className="btn btn-danger" onClick={()=>this.setState({modalEdit:false})}>Cancelar</button>
            
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  
}

export default App;
