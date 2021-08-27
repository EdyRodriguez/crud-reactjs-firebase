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
      <div className="App" style={bodyStyle}>
        <h1 className="mt-5 mb-5">Game List</h1>
        <button className="btn mb-5 btn-success" onClick={()=>this.setState({modalInsert:true})}>Insert</button>
        <br></br>
        <div className="container row mt-5" style={{margin:0}}>
          {Object.keys(this.state.data).map(i=>{
              console.log(i)
              return <div className="card p-3 mb-3 shadow rounded text-center " key={i} style={cardStyle} >
              <div class="card-body" >
                <h5 class="card-title"> {this.state.data[i].title}</h5>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><a href={`${this.state.data[i].image}`}>{this.state.data[i].image}</a></li>
                  <li class="list-group-item">{this.state.data[i].price}</li>
                  <li class="list-group-item">{this.state.data[i].score}</li>
                </ul>
                <p class="card-text">{this.state.data[i].description}</p>
                
                  <button className="btn btn-primary"  onClick={()=>this.selectedGame(this.state.data[i],i,'Edit')}>Edit</button> {""}
                  <button className="btn btn-danger" onClick={()=>this.selectedGame(this.state.data[i],i,'Delete')}>Delete</button>
               
              </div>
              </div>
            })}
        </div>
        <Modal isOpen={this.state.modalInsert}>
          <ModalHeader style={modalStyle}>Insert Game</ModalHeader>
          <ModalBody style={modalStyle}>
            <div className="form-group" >
              <label>Game:</label>
              <br/>
              <input name="title" type="text" className="form-control" onChange={this.handleChange}/>
              <br/>
              <label>Game page link:</label>
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
          <ModalFooter style={modalStyle}>
            <button className="btn btn-primary" onClick={()=>this.petitionPost()}>Insert</button>
            <button className="btn btn-danger" onClick={()=>this.setState({modalInsert:false})}>Cancel</button>
            
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.modalEdit}>
          <ModalHeader style={modalStyle}>Edit Game</ModalHeader>
          <ModalBody style={modalStyle}>
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
          <ModalFooter style={modalStyle}>
            <button className="btn btn-primary" onClick={()=>this.petitionPut()}>Accept</button>
            <button className="btn btn-danger" onClick={()=>this.setState({modalEdit:false})}>Cancelar</button>
            
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  
}


 const cardStyle= {
    width: '18rem',
    marginLeft:'2vh',
    backgroundColor: '#EEEEEE',
  }
 const bodyStyle={
  backgroundColor: '#334257',
 }
 
 const modalStyle={
  backgroundColor: '#EEEEEE',
 }

export default App;
