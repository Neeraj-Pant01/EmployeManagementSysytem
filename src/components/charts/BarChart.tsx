import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Monthly Revenue",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels,
  datasets: [
    {
      label: "Revenue",
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Expenses",
      data: [8000, 15000, 12000, 20000, 18000, 25000],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const BarChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
