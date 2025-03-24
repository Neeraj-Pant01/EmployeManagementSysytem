import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: "User Growth",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels,
  datasets: [
    {
      label: "Active Users",
      data: [1000, 1500, 2000, 2500, 3000, 3500],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.5)",
    },
  ],
};

const LineChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
