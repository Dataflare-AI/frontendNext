"use client";

import styles from "./chart.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Seg",
    visit: 4000,
    click: 2400,
  },
  {
    name: "Ter",
    visit: 3000,
    click: 1398,
  },
  {
    name: "Qua",
    visit: 2000,
    click: 3800,
  },
  {
    name: "Qui",
    visit: 2780,
    click: 3908,
  },
  {
    name: "Sex",
    visit: 1890,
    click: 4800,
  },
  {
    name: "Sab",
    visit: 2390,
    click: 3800,
  },
  {
    name: "Dom",
    visit: 3490,
    click: 4300,
  },
];

const Chart = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Semanal</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#dfdfdf", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="visit"
            stroke="#1607fa"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="click"
            stroke="#3a7c2d"
            strokeDasharray="3 4 5 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
