import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import './index.css';

const EmployeeManagementSystem = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    // Use Axios to fetch employee data from backend API
    axios.get('http://localhost:5000/employee/employees')
        .then(response => {
            setEmployee(response.data);  // Update state with fetched data
        })
        .catch(error => {
            console.error('Error fetching employees:', error);
        });
}, []);

  // Function to handle employee deletion
  const handleDelete = (e_id) => {
    console.log(`Attempting to delete employee with ID: ${e_id}`); // Log ID to be deleted
    axios.delete(`http://localhost:5000/employee/delete_employee/${e_id}`)
      .then((result) => {
        console.log("Delete result:", result.data); // Log the delete result
        if (result.data.Status) {
          // If the deletion is successful
          setEmployee(employee.filter(e => e.e_id !== e_id)); // Make sure to use e.e_id here
          alert("Employee deleted successfully");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.error("Error deleting employee:", err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="employee-management-system">
        <h1>Employee Management System</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search type of keywords" />
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Reg Number</th>
                <th>Image</th>
                <th>Name</th>
                <th>Role</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th>Email Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employee.map((e, index) => (
                <tr key={index}>
                  <td>{e.regNumber}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/Images/` + e.image}
                      alt=""
                      className="employee_image"
                    />
                  </td>
                  <td>{e.name}</td>
                  <td>{e.role}</td>
                  <td>{e.address}</td>
                  <td>{e.contact_number}</td>
                  <td>{e.email}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleDelete(e.e_id)}>                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default EmployeeManagementSystem;