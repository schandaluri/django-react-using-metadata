import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import UserTable from "../components/UserTable";
import {getUserList} from "../network";

class UserView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      users: {
      },
    };
    this.handleUsersListData = this.handleUsersListData.bind(this);
  }

  handleUsersListData(data){
    if (data.success){
      this.setState(prevState => ({
        users: data.data,
      }));
    }
  }

  componentDidMount() {
    getUserList(this.handleUsersListData);
  }

  render() {
    return(
      <div>
        <Breadcrumb>
          <Breadcrumb.Item active>Users</Breadcrumb.Item>
        </Breadcrumb>
        <Link to='/users/create'>
          <Button variant="primary" className="float-right mb-2">Add User</Button>
        </Link>
        <UserTable usersList={this.state.users}/>
      </div>
    )
  }
}

export default UserView;