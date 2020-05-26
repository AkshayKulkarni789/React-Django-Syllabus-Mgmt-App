import React,{Component} from 'react';
import Modal from './components/modal' 
import axios from 'axios' 
    
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      modal: false,
      viewCompleted: false,
      syllabus: [],
      activeItem:{
        title:"",
        name:"",
        description:"",
        completed:false,
      },
     }
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios.get("/api/syllabus").then(res => this.setState({syllabus: res.data})).catch(err => console.log(err))
  }

  toggle = () => {
    this.setState({modal: !this.state.modal})
  }

  submitHandler = (item) => {
    this.toggle();
    axios.post("/api/syllabus/",item).then(res => this.refreshList())
    this.setState({activeItem:{title:"", name:"", description:"",completed:false}})
  }

  handleDelete = (item) => {
    axios.delete(`/api/syllabus/${item.id}`).then(res => this.refreshList())
  }

  createItem = () => {
    const item = {title:"", name:"", description:"",completed:false}
    this.setState({activeItem:item, modal: !this.state.modal})
  }

  editItem = (item) => {
    this.setState({activeItem:item,modal: !this.state.modal})
  }

  displayCompleted = (status) => {
    if(status){
      return this.setState({viewCompleted: true})
    }
    return this.setState({viewCompleted: false})
  }

  renderTablist = () => {
    return(
      <div className="container center" >
        <button onClick={() => this.displayCompleted(true)} className={`btn green {this.state.viewCompleted ? "active" : ''}`}>Complete</button>
        <button onClick={() => this.displayCompleted(false)} className={`btn red {this.state.viewCompleted ? '' : "active"}`}>Incomplete</button>
      </div>
    )
  }

  renderItems = () => {
    const {viewCompleted} = this.state
    const newItems = this.state.syllabus.filter(
      item => item.completed === viewCompleted
    )
    return newItems.map(item => (
      <div className="card center">
        <div className="card-content">
          <li key={item.id}>
            <span className="card-title center">{item.title}</span>
            <p>{item.description}</p>
            <div className="card-action">{item.name}</div>
            <span>
              <button className="waves-effect waves-light btn red" onClick={()=> this.handleDelete(item)}>Delete</button>
            </span>
          </li>
        </div>
      </div>
    ))
  }

  render() { 
    return ( 
      <main className="container center">
        <h1>Syllabus Manager</h1>
        <div className="row">
          <div className="col s12 m6">
            <div className="card z-depth-0 transparent">
              {this.renderTablist()}
            </div>
            <div className="card transparent">
              <ul>
                {this.renderItems()}
              </ul>
            </div>
          </div>
          <div className="col s12 m5 offset-m1">
            <h3 className="" onClick={() => this.createItem()}>Add Topic</h3><br/><br/>
            <Modal activeItem={this.state.activeItem} toggle={this.toggle} onSave={this.submitHandler} />
          </div>
        </div>
      </main>
     );
  }
}
 
export default App;
