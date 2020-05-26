import React,{Component} from 'react';
import {Button, Input, Label} from 'reactstrap'
import Form from 'react-bootstrap/Form'

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            activeItem: this.props.activeItem
         }
    }

    changeHandler = (e) => {
        let {name, value} = e.target;
        if(e.target.type === "checkbox"){
            value = e.target.checked
        }
        const activeItem = {...this.state.activeItem, [name]:value}
        this.setState({activeItem})
    }

    render() { 
        const{onSave} = this.props
        return ( 
            <div className="container center">
                <div className="card">
                    <div className="card-title"></div>
                    <div className="card-content">
                        <Form>
                            <Form.Group>
                                <Label for="title">Title</Label>
                                <Input type="text" name="title" value={this.state.activeItem.title} onChange={this.changeHandler} placeholder="Enter Topic title"/>
                            </Form.Group>
                            <Form.Group>
                                <Label for="description">Description</Label>
                                <Input type="text" name="description" value={this.state.activeItem.description} onChange={this.changeHandler} placeholder="Enter details"/>
                            </Form.Group>
                            <Form.Group>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" value={this.state.activeItem.name} onChange={this.changeHandler} placeholder="Enter your name"/>
                            </Form.Group>                            
                        </Form>
                    </div>
                    <div className="card-actions">
                        <Button color="success" onClick={()=> onSave(this.state.activeItem)} style={{marginBottom: 10}}>Save</Button>
                    </div>
                </div>
            </div>
         );
    }
}