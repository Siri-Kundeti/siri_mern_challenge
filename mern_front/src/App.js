import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsTable from './components/TransactionsTable';
import TransactionsStatistics from './components/TransactionsStatistics';
import TransactionsBarChart from './components/TransactionsBarChart';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL = 'http://localhost:3001';

const App = () => {
  const [month, setMonth] = useState('March');
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTransactions(currentPage);
    fetchStatistics();
    fetchBarChartData();
  }, [month, search, currentPage]);

  const fetchTransactions = async (page = 1) => {
    try {
      const response = await axios.get(`/api/transactions`, {
        params: {
          month,
          search,
          page,
        },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error.response ? error.response.data : error.message);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`/api/statistics`, {
        params: { month },
      });
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error.response ? error.response.data : error.message);
    }
  };

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get(`/api/barChartData`, {
        params: { month },
      });
      setBarChartData(response.data);
    } catch (error) {
      console.error("Error fetching bar chart data:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container">
      <div className="my-4">TransactionsTable<br></br>
        <label htmlFor="monthSelect" className="form-label">Select Month:</label>
        <select id="monthSelect" className="form-select" value={month} onChange={(e) => setMonth(e.target.value)} style={{innerWidth:'50px'}}>
          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transactions"
        />
      </div>
      <TransactionsTable transactions={transactions} fetchTransactions={fetchTransactions} /><br></br>
      <TransactionsStatistics statistics={statistics} /><br></br>
      <TransactionsBarChart barChartData={barChartData} /><br></br>
    </div>
  );
};

export default App;
