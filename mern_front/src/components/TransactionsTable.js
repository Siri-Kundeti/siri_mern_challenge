import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TransactionsTable = ({ transactions, fetchTransactions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchTransactions(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (transactions.length === itemsPerPage) {
      setCurrentPage(currentPage + 1);
      fetchTransactions(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="table-responsive" >
      <table className="table table-striped" >
        <thead className="thead-dark" style={{backgroundColor:'rgb(247, 247, 147)'}}>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Purchase</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.date_of_purchase}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <br></br>
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button className="btn btn-primary" onClick={handleNextPage} disabled={transactions.length < itemsPerPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
