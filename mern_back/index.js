import express from 'express';
import cors from'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3001;
const API_URL = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
// Middleware
 app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../mern_front/public')));

// Helper function to fetch data from the third-party API
app.get('/api/transactions', async (req, res) => {
  try {
    const { month, search = '', page = 1 } = req.query;
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data.filter(transaction => {
      const transactionMonth = new Date(transaction.date_of_purchase).toLocaleString('default', { month: 'long' });
      return transactionMonth === month &&
        (transaction.title.toLowerCase().includes(search.toLowerCase()) ||
          transaction.description.toLowerCase().includes(search.toLowerCase()) ||
          transaction.price.toString().includes(search));
    });

    const itemsPerPage = 10;
    const paginatedTransactions = transactions.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    res.json(paginatedTransactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'An error occurred while fetching transactions' });
  }
});

app.get('/api/statistics', async (req, res) => {
  try {
    const { month } = req.query;
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data.filter(transaction => {
      const transactionMonth = new Date(transaction.date_of_purchase).toLocaleString('default', { month: 'long' });
      return transactionMonth === month;
    });

    const totalSale = transactions.reduce((sum, transaction) => sum + transaction.price, 0);
    const soldItems = transactions.filter(transaction => transaction.sold).length;
    const notSoldItems = transactions.length - soldItems;

    res.json({
      totalSale,
      soldItems,
      notSoldItems,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'An error occurred while fetching statistics' });
  }
});

app.get('/api/barChartData', async (req, res) => {
  try {
    const { month } = req.query;
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data.filter(transaction => {
      const transactionMonth = new Date(transaction.date_of_purchase).toLocaleString('default', { month: 'long' });
      return transactionMonth === month;
    });

    const priceRanges = [
      { range: '0-100', count: 0 },
      { range: '101-200', count: 0 },
      { range: '201-300', count: 0 },
      { range: '301-400', count: 0 },
      { range: '401-500', count: 0 },
      { range: '501+', count: 0 },
    ];

    transactions.forEach(transaction => {
      if (transaction.price <= 100) priceRanges[0].count++;
      else if (transaction.price <= 200) priceRanges[1].count++;
      else if (transaction.price <= 300) priceRanges[2].count++;
      else if (transaction.price <= 400) priceRanges[3].count++;
      else if (transaction.price <= 500) priceRanges[4].count++;
      else priceRanges[5].count++;
    });

    res.json(priceRanges);
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).json({ error: 'An error occurred while fetching bar chart data' });
  }
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../mern_stack/public/index.html'));
});
//sever logic
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});