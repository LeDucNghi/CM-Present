import * as React from "react";

import { Bar, Line, Pie } from "react-chartjs-2";

import { Chart as ChartJS } from "chart.js/auto";

export default function Dashboard({ mode, languages, chartData }) {
  const options = {
    responsive: true,
    color: mode === "dark" ? "#fff" : "black",
    scales: {
      y: { ticks: { color: mode === "dark" ? "#00ff00" : "black" } },
      x: { ticks: { color: mode === "dark" ? "#ff0000" : "black" } },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: "50%",
        }}
      >
        <Bar data={chartData} options={options} />
      </div>
      <div
        style={{
          width: "50%",
        }}
      >
        <Line data={chartData} options={options} />
      </div>
      <div
        style={{
          width: "50%",
        }}
      >
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
