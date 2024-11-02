import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './index.css';

const HistoryRequestMaterial = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  const handleAddClick = () => {
    navigate('/newRequest');
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/material/history-request-material');
        console.log(response.data);
        if (response.data.success && Array.isArray(response.data.users)) {
          setHistory(response.data.users);
        } else {
          console.error('Expected an array but received:', response.data);
          setHistory([]); // Set to an empty array if the format is incorrect
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    }
    };

    fetchHistory();
  }, []);

  const handleDetailsClick = (id) => {
    alert(`See details for ${id}`);
    // Add functionality to navigate to details page or view modal
  };

  return (
    <div className="history-request-material-container">
      <h1>History of Request Material</h1>
      <IconButton onClick={handleAddClick} className="add-button">
        <AddIcon />
      </IconButton>

      <section className="history-content">
        <input type="text" placeholder="Search type of keywords" className="search-bar" />

        <div className="table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>Reg Number</th>
                <th>Name</th>
                <th>Date</th>
                <th>Address</th>
                <th>Raw Material</th>
                <th>Required Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(history) && history.map((e, index) => (
                <tr key={index}>
                  <td>
                    <div className="emp-info">
                      <span className="emp-icon">👤</span>
                      {e.regNumber}
                    </div>
                  </td>
                  <td>{e.name}</td>
                  <td>{e.date}</td>
                  <td>{e.address}</td>
                  <td>{e.raw_material}</td>
                  <td>{e.required_date}</td>
                  <td>
                    <button className="details-btn" onClick={() => handleDetailsClick(e.id)}>See Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default HistoryRequestMaterial;