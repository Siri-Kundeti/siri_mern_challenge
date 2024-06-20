import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TransactionsStatistics = ({ statistics }) => {
  return (
    <div className="card">
      <div className="card-header">
        Statistics
      </div>
      <div className="card-body">
        <p className="card-text">Total Sale: ${statistics.totalSale}</p>
        <p className="card-text">Total Sold Items: {statistics.soldItems}</p>
        <p className="card-text">Total Not Sold Items: {statistics.notSoldItems}</p>
      </div>
    </div>
  );
};

export default TransactionsStatistics;
