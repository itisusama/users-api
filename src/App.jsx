import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddUser from './AddUser';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
    <h1>User Management</h1>
    <AddUser/>
      <h1>Users</h1>
      <div>
        {users.map(user => (
          <div style={{border: '1px solid black'}}>
          <p key={user.id}>{user.first_name}</p>
          <p>{user.last_name}</p>
          <p>{user.email}</p>
          <p>{user.password}</p>
          <p>{user.gender}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
