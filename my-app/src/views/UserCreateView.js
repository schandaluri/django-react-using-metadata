import React from "react";
import Field from "../components/Field";
import Form from "react-bootstrap/Form";
import {Link} from 'react-router-dom';
import {getUserSchema, userCreate} from "../network";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";

class UserCreateView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      config: {},
      data: {},
      errors: {}
    };

    this.handleUserSchemaData = this.handleUserSchemaData.bind(this);
    this.handleUserCreateData = this.handleUserCreateData.bind(this);
    this.handleUserSubmit = this.handleUserSubmit.bind(this);
    this.onChangeInputHandler = this.onChangeInputHandler.bind(this);
  }

  getChildProps(name){
    return{
      name: name,
      config: this.state.config[name],
      onChangeHandler: this.onChangeInputHandler,
      errors: this.state.errors.hasOwnProperty(name) ? this.state.errors[name]: []
    };
  }


  handleUserSchemaData(data){
    if (data.success){
      this.setState(prevState => ({
        config: data.data.actions.create
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
    userCreate(this.state.data, this.handleUserCreateData);
  }

  handleUserCreateData(data){
    if (data.success){
      this.setState(prevState => ({
        errors: []
      }));
    debugger
    this.props.history.push('/users/edit/'+data.data.id)
    }
    else{
      this.setState(prevState => ({
        errors: data.errors,
      }));
    }
  }

  componentDidMount() {
    getUserSchema(this.handleUserSchemaData);
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href='/users'>Users</Breadcrumb.Item>
          <Breadcrumb.Item active>Create</Breadcrumb.Item>
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

export default UserCreateView;