import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
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
      console.log(response);
      console.log(response.data);
      setUsers([response.data]); 
      
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

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid Date';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

// function isoFormatDMY(date) {
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0'); 
//   const year = date.getFullYear();

//   return `${day}/${month}/${year}`;
// }

// function parseISOString(s) {
//   var b = s.split(/\D+/);
//   return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
// }




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
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="py-2 px-4 text-sm text-gray-600">{user.name}</td>
              {/* <td className="py-2 px-4 text-sm text-gray-600">{isoFormatDMY(parseISOString(user.dateOfBirth))}</td> */}
              <td className="py-2 px-4 text-sm text-gray-600">{formatDate(user.dateofbirth)}</td>
              <td className="py-2 px-4 text-sm text-gray-600">{user.email}</td>
              <td className="py-2 px-4 text-sm text-gray-600">{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
