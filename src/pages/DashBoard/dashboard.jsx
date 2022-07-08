import * as React from "react";

import { Bar, Line, Pie } from "react-chartjs-2";

import { Chart as ChartJS } from "chart.js/auto";

export default function Dashboard({ chartData }) {
  return (
    <div style={{ width: 700 }}>
      <Bar data={chartData} />
      <Line data={chartData} />
      <Pie data={chartData} />
    </div>
  );
}
