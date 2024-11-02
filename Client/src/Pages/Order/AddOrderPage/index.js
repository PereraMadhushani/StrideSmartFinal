import React, { useState } from 'react';
import './index.css';

const AddOrderPage = () => {
  const [page, setPage] = useState([]);

  return (
    <div className="add-order-page">
      <h1>Add Order</h1>
      {/* Add your form or content for adding an order here */}
      <button onClick={() => setPage('orders')} className="back-button">Back to Orders</button>
    </div>
  );
};

export default AddOrderPage;