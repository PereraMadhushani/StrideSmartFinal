// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";

// API functions
const addProductionData = (data) => axios.post(`http://localhost:5000/salary/production`, data);
const fetchSalary = (regNumber) => axios.get(`http://localhost:5000/salary/salary/${regNumber}`);
const fetchEmployees = () => axios.get(`http://localhost:5000/employee/employees`);
const validateRegNumber = (regNumber) => axios.get(`http://localhost:5000/employee/validate/${regNumber}`);

function App() {
  const [employees, setEmployees] = useState([]);
  const [productionData, setProductionData] = useState({
    regNumber: "",
    shoe_type: "",
    size: "",
    unit_price: 0,
    quantity: 0,
  });
  const [salary, setSalary] = useState(null);

  useEffect(() => {
    fetchEmployees().then((res) => setEmployees(res.data));
  }, []);

  const handleProductionSubmit = async () => {
    try {
      const { data } = await validateRegNumber(productionData.regNumber);
      if (!data.valid) {
        alert("Invalid Registration Number. Please enter a valid reg number.");
        return;
      }

      await addProductionData(productionData);
      alert("Production data added successfully!");
      setProductionData({
        regNumber: "",
        shoe_type: "",
        size: "",
        unit_price: 0,
        quantity: 0,
      });
    } catch (error) {
      alert("Error adding production data.");
    }
  };

  const handleSalaryCalculation = async () => {
    try {
      const { data } = await fetchSalary(productionData.regNumber);
      setSalary(data.net_salary);
    } catch (error) {
      alert("Error calculating salary.");
    }
  };

  return (
    <div>
      <h1>Shoe Manufacturing Salary Calculation</h1>

      <div>
        <h3>Production Data</h3>
        <input
          type="text"
          placeholder="Reg Number"
          value={productionData.regNumber}
          onChange={(e) => setProductionData({ ...productionData, regNumber: e.target.value })}
        />
        <input
          type="text"
          placeholder="Shoe Type"
          value={productionData.shoe_type}
          onChange={(e) => setProductionData({ ...productionData, shoe_type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Size"
          value={productionData.size}
          onChange={(e) => setProductionData({ ...productionData, size: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={productionData.quantity}
          onChange={(e) => setProductionData({ ...productionData, quantity: e.target.value })}
        />
        <input
          type="number"
          placeholder="Unit Price"
          value={productionData.unit_price}
          onChange={(e) => setProductionData({ ...productionData, unit_price: e.target.value })}
        />
        <button onClick={handleProductionSubmit}>Add Production</button>
      </div>

      <button onClick={handleSalaryCalculation}>Calculate Salary</button>

      {salary !== null && (
        <div>
          <h3>Net Salary: {salary}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
