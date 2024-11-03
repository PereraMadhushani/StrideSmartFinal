import React, { useState } from "react";
import "./index.css";
import axios from 'axios'

function OrderForm() {
  const [formData, setFormData] = useState({
    regNumber: "",
    date: "",
    qty: "",
    dueDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/order/orders", formData);
      alert(response.data.message);
    } catch (error) {
      alert("Failed to submit order.");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="order-form">
        <h2>Order Form</h2>
        <label>Employee ID:</label>
        <input
          type="text"
          name="employeeId"
          value={formData.regNumber}
          onChange={handleChange}
          required
        />

        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>Quantity:</label>
        <input
          type="number"
          name="qty"
          value={formData.qty}
          onChange={handleChange}
          required
        />

        <label>Due Date:</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default OrderForm