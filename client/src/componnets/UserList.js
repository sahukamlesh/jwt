import { useEffect, useState } from "react";
import {useHistory, useLocation} from 'react-router-dom'
import {getAllUsers} from "../services/user.service";
function UserList() {
  const [users, setUsers] = useState([]);
  const history =useHistory()
  const location = useLocation();
  useEffect(() => {
    const myToken = localStorage.getItem('token');
    if(!myToken){

        history.push("/login?returnUrl="+location.pathname)
        return;
    }
    getAllUsers().then((users) => {
      console.log(users);
      setUsers(users);
    });
  }, []);

  return (
    <>
      <div>
        <h1>Userlist</h1>
      </div>
      <hr />
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item">{user.firstname}</li>
        ))}
      </ul>
    </>
  );
}

export default UserList;
