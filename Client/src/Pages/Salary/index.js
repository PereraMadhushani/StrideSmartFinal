// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";

// API functions
const addProductionData = (data) => axios.post(`http://localhost:5000/salary/production`, data);
const fetchSalary = (regNumber) =>
  axios.get(`http://localhost:5000/salary/salary/${regNumber}`);
const fetchEmployees = () =>
  axios.get(`http://localhost:5000/employee/employees`);

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [productionData, setProductionData] = useState({
    shoe_type: "",
    size: "",
    unit_price: 0,
    quantity: 0,
  });
  const [salary, setSalary] = useState(null);
  useEffect(() => {
    fetchEmployees().then((res) => setEmployees(res.data));
  }, []);

  const handleProductionSubmit = () => {
    addProductionData({
      ...productionData,
      regNumber: selectedEmployee,
    }).then(() => alert("Production data added"));
  };

  const handleSalaryCalculation = () => {
    fetchSalary(selectedEmployee).then((res) => setSalary(res.data.net_salary));
  };

  return (
    <div>
      <h1>Shoe Manufacturing Salary Calculation</h1>

      <select
        onChange={(e) => setSelectedEmployee(e.target.value)}
        value={selectedEmployee}
      >
        <option>Select Employee</option>
        {employees.map((emp) => (
          <option key={emp.regNumber} value={emp.regNumber}>
            {emp.regNumber}
          </option>
        ))}
      </select>

      <div>
        <h3>Production Data</h3>
        <input
          type="text"
          placeholder="Shoe Type"
          onChange={(e) => setProductionData({ ...productionData, shoe_type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Size"
          onChange={(e) => setProductionData({ ...productionData, size: e.target.value })}
        />
        <input
          type="number"
          placeholder="Unit Price"
          onChange={(e) => setProductionData({ ...productionData, unit_price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          onChange={(e) => setProductionData({ ...productionData, quantity: e.target.value })}
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
