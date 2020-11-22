import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import Field from "./Field.js";

class UserModal extends React.Component{
  constructor(props) {
    super(props);
    this.handleClose = props.handleClose
    this.handleShow = props.handleShow
    this.parentHandleUserSubmit = props.handleUserSubmit
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getChildProps = this.getChildProps.bind(this)
    this.state = {
      show: props.show,
      config: props.config,
      data: {},
      errors: {}
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.show !== this.props.show){
        this.setState({
            show: this.props.show
        });
    }
    if (prevProps.errors !== this.props.errors){
      this.setState({
        errors: this.props.errors
      })
    }
  }


  getChildProps(name){
    return{
      name: name,
      config: this.state.config[name],
      onChangeHandler: this.onChangeHandler,
      // value: this.values[name],
      errors: this.state.errors.hasOwnProperty(name) ? this.state.errors[name]: []
    }
  }

  onChangeHandler(data){
    this.setState(prevState => ({
      data: {
          ...prevState.data,
          [data.name]: data.value
      },
    }));
  }

  handleSubmit(){
    this.parentHandleUserSubmit(this.state.data)
  }

  render(){
    return(
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Field {...this.getChildProps('username')}/>
            <Field {...this.getChildProps('email')}/>
            <Field {...this.getChildProps('first_name')}/>
            <Field {...this.getChildProps('last_name')}/>
            <Field {...this.getChildProps('is_active')}/>
            <Field {...this.getChildProps('is_staff')}/>
            <Field {...this.getChildProps('is_superuser')}/>
            <Field {...this.getChildProps('groups')}/>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>Close</Button>
          <Button variant="primary" onClick={this.handleSubmit}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    )};
}


export default UserModal;
