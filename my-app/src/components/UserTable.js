import Table from "react-bootstrap/Table";
import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";


function TrueOrFalseIcon(status){
  if (status === true){
    return <FontAwesomeIcon className="text-success" icon={faCheck}/>
  }
  else{
    return <FontAwesomeIcon className="text-danger" icon={faTimes}/>
  }
}

class UserTable extends React.Component{
  constructor(props) {
    super(props);
    if (props.usersList.hasOwnProperty('results')){
      this.state = {
        usersList: props.usersList.results
      }
    }
    else{
      this.state = {
        usersList: {
          results: []
        }
      }
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.usersList !== this.props.usersList){
        this.setState({
            usersList: this.props.usersList
        });
    }
  }


  render() {
    return(
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Is Active</th>
            <th>Is Staff</th>
            <th>Is Superuser</th>
            <th>Last Login</th>
            <th>Groups</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>

        {this.state.usersList.results.map((row) =>
          <tr key={row.username}>
            <td>{row.username}</td>
            <td>{row.email}</td>
            <td>{row.first_name}</td>
            <td>{row.last_name}</td>
            <td>{TrueOrFalseIcon(row.is_active)}</td>
            <td>{TrueOrFalseIcon(row.is_staff)}</td>
            <td>{TrueOrFalseIcon(row.is_superuser)}</td>
            <td>{row.last_login}</td>
            <td>{row.groups.join(', ')}</td>
            <td><Link className={'text-primary'} to={'/users/edit/'+row.id}><FontAwesomeIcon icon={faEdit}/></Link></td>
          </tr>
        )}
        </tbody>
      </Table>
    )
  }

}

export default UserTable
