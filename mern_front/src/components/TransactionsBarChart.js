import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';

const TransactionsBarChart = ({ barChartData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy the previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create the new chart instance
    chartInstance.current = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: barChartData.map(data => data.range),
        datasets: [{
          label: 'Number of Items',
          data: barChartData.map(data => data.count),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Clean up the chart instance when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [barChartData]);

  return (
    <div className="card">
      <div className="card-header">
      Bar Chart Stats
      </div>
      <div className="card-body">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default TransactionsBarChart;
