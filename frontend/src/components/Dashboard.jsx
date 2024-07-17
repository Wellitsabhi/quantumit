import React, { useEffect, useState } from 'react';
import { Image, Button } from 'react-bootstrap';
import { FaCog, FaTimes } from 'react-icons/fa';
import Axios from "axios";

Axios.defaults.withCredentials = true;

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const getUsers = async () => {
    try {
      const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}/dashboard`);
      console.log(response.data);
      console.log(response.data.email);
      console.log(response.data.name);
      console.log(response.data.password);
      console.log(response.data.dateofbirth);
      setUsers(response.data); 
      
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  getUsers();
}, []);

if (loading) return <p>Loading...</p>;
if (error) return <p>Error loading data: {error.message}</p>;
  return (
    
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="w-full bg-gray-100 border-b">
            {/* <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">#</th> */}
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Name</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Date of Birth</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Email </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Pasword</th>
           
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="border-b">
              <td className="py-2 px-4 text-sm text-gray-600">{user.name}</td>
              <td className="py-2 px-4 text-sm text-gray-600">{user.dateofbirth}</td>
              <td className="py-2 px-4 text-sm text-gray-600">{user.email}</td>
              <td className="py-2 px-4 text-sm text-gray-600">{user.password}</td>
              
            
              <td className="py-2 px-4 text-sm text-gray-600">
                <Button variant="link" className="text-blue-500">
                  <FaCog />
                </Button>
                <Button variant="link" className="text-red-500 ml-2">
                  <FaTimes />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
