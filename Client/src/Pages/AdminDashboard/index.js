import React , {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import WebSocketComponent from '../../Components/WebSocketComponent';

const AdminDashboard = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/admin/users');
            console.log(response.data);
            if (response.data.success && Array.isArray(response.data.users)) {
              setUser(response.data.users);
            } else {
              console.error('Expected an array but received:', response.data);
              setUser([]); // Set to an empty array if the format is incorrect
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    fetchUsers();
}, []);

const handleSubmit = async (userData) => {
  try {
    const response = await axios.post('http://localhost:5000/admin/register', userData);
    // Handle response...
  } catch (error) {
    console.error('Error registering user:', error);
    alert('An error occurred. Please try again.');
  }
};

const handleDelete = (id) => {
  console.log(`Attempting to delete user with ID: ${id}`); // Log ID to be deleted
  axios.delete(`http://localhost:5000/admin/deleteUser/${id}`)
    .then((result) => {
      console.log("Delete result:", result.data); // Log the delete result
      if (result.data.Status) {
        // If the deletion is successful
        setUser(user.filter(u => u.id !== id)); // Update state to reflect deletion
        alert("user deleted successfully");
      } else {
        alert(result.data.Error);
      }
    })
    .catch((err) => {
      console.error("Error deleting user:", err);
    });
};



  return (
    <><Navbar/>
    <div className="admin-dashboard">
      <h1>Users Management System</h1>
      <WebSocketComponent />
      <div className="top-controls">
      <Link to="/addNewUser" className="add-user">Add New User</Link>
        <select className="select-year">
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2023">2022</option>
          <option value="2023">2021</option>
        </select>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search type of keywords" />
      </div>
      <table>
        <thead>
          <tr>
            <th>Reg Number</th>
            <th>Name</th>
            <th>Image</th>
            <th>Address</th>
            <th>Contact Number</th>
            <th>Email Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {user.map((e, index) => (
              <tr key={index}>
                <td>{e.regNumber}</td>
                <td>{e.name}</td>
                <td>
                  <img
                    src={`http://localhost:5000/Images/` + e.image}
                    alt=""
                    className="employee_image"
                  />
                </td>
                <td>{e.address}</td>
                <td>{e.contact_number}</td>
                <td>{e.email}</td>
                <td>

                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}
                    
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div></>
  );
}

export default AdminDashboard;
