import React from "react";
import Field from "../components/Field";
import Form from "react-bootstrap/Form";
import {Link} from 'react-router-dom';
import {getUserSchema, getUserData, userEdit} from "../network";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";


class UserEditView extends React.Component{
  constructor(props) {
    super(props);
    this.id = props.id;
    this.state = {
      config: {},
      data: {},
      errors: {}
    };

    this.handleUserSchemaData = this.handleUserSchemaData.bind(this);
    this.handleUserEditData = this.handleUserEditData.bind(this);
    this.handleUserSubmit = this.handleUserSubmit.bind(this);
    this.onChangeInputHandler = this.onChangeInputHandler.bind(this);
    this.handleUserEditDataSubmit = this.handleUserEditDataSubmit.bind(this);
  }

  getChildProps(name){
    return{
      name: name,
      config: this.state.config[name],
      onChangeHandler: this.onChangeInputHandler,
      initialValue: this.state.data[name],
      errors: this.state.errors.hasOwnProperty(name) ? this.state.errors[name]: []
    };
  }


  handleUserSchemaData(data){
    if (data.success){
      this.setState(prevState => ({
        config: data.data.actions.update
      }));
    }
  }

  handleUserEditData(data){
    if (data.success){
      this.setState(prevState => ({
        data: data.data
      }));
    }
  }

  onChangeInputHandler(data){
    this.setState(prevState => ({
      data: {
          ...prevState.data,
          [data.name]: data.value
      },
    }));
  }

  handleUserSubmit(){
    userEdit(this.id, this.state.data, this.handleUserEditDataSubmit);
  }

  handleUserEditDataSubmit(data){
    if (data.success){
      this.setState(prevState => ({
        ...prevState,
        errors: []
      }));
    }
    else{
      this.setState(prevState => ({
        ...prevState,
        errors: data.errors ? data.errors : prevState.errors,
      }));
    }
  }

  componentDidMount() {
    getUserSchema(this.handleUserSchemaData);
    getUserData(this.id, this.handleUserEditData);
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href='/users'>Users</Breadcrumb.Item>
          <Breadcrumb.Item active>Edit</Breadcrumb.Item>
        </Breadcrumb>
        { Object.keys(this.state.config).length > 0 ?
          <Form>
            <div className="row">
              <div className="col-6">
                <Field {...this.getChildProps('username')}/>
                <Field {...this.getChildProps('email')}/>
                <Field {...this.getChildProps('first_name')}/>
                <Field {...this.getChildProps('last_name')}/>
                <Field {...this.getChildProps('groups')}/>
              </div>
              <div className="col-6">
                <Field {...this.getChildProps('is_active')}/>
                <Field {...this.getChildProps('is_staff')}/>
                <Field {...this.getChildProps('is_superuser')}/>
              </div>
            </div>
            <Link to='/users'>
              <Button variant="secondary mr-3">Close</Button>
            </Link>
            <Button variant="primary" onClick={this.handleUserSubmit}>Save changes</Button>
          </Form>
        :null}
      </div>
    );
  }
}

export default UserEditView;