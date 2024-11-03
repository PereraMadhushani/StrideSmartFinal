import React, { useState } from 'react';
import Navbar from '../../Components/Navbar'; // Import the NavBar component
import './index.css';
import { useTranslation } from 'react-i18next';

const NewRequest = () => {
  const [material, setMaterial] = useState([]);
  useEffect(() => {
    const fetchRequest = async () => {
        try {
            const response = await axios.get('http://localhost:5000/storemanager/request');
            console.log(response.data);
            if (response.data.success && Array.isArray(response.data.request)) {
              setMaterial(response.data.users);
            } else {
              console.error('Expected an array but received:', response.data);
              setMaterial([]); // Set to an empty array if the format is incorrect
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    fetchRequest();
}, []);


  const handleSubmit = () => {
    // Add submit functionality here
    alert("Form Submitted");
  };

  const handleEdit = () => {
    // Add edit functionality here
    alert("Form Edited");
  };

 
};

export default NewRequest;