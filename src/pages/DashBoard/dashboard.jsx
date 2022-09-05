import * as React from "react";

import { Bar, Line, Pie } from "react-chartjs-2";

import { Chart as ChartJS } from "chart.js/auto";
import { selectMode } from "features/drawer/drawerSlice";
import { useSelector } from "react-redux";
import { userData } from "mock/user";

export default function Dashboard() {
  const mode = useSelector(selectMode);
  // const languages = useSelector(selectLanguage);

  const options = {
    responsive: true,
    color: mode === "dark" ? "#fff" : "black",
    scales: {
      y: { ticks: { color: mode === "dark" ? "#00ff00" : "black" } },
      x: { ticks: { color: mode === "dark" ? "#8a3ffc" : "black" } },
    },
  };

  const chartData = {
    labels: userData.map((data) => data.year),
    datasets: [
      {
        label: "User Register",
        data: userData.map((data) => data.userRegister),
        backgroundColor: [
          "#8a3ffc",
          "#33b1ff",
          "#007d79",
          "#ff7eb6",
          "#fa4d56",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
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
