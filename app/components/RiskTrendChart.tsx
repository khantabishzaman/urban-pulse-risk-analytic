"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

export default function RiskTrendChart({ data }: any) {
  const districts = [...new Set(data.map((d: any) => d.district))];

  const years = [...new Set(data.map((d: any) => d.year))]
    .sort();

  const chartData = years.map((year) => {
    const row: any = { year };

    districts.forEach((district) => {
      const found = data.find(
        (d: any) =>
          d.year === year &&
          d.district === district
      );

      row[district] =
        found?.urban_pulse_risk_score || null;
    });

    return row;
  });

  const colors = [
    "#3b82f6",
    "#ef4444",
    "#22c55e",
    "#f59e0b",
    "#a855f7",
  ];

  return (
    <div
      style={{
        height: "500px",
        background: "#0f172a",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "30px",
      }}
    >
      <h2>Urban Pulse Risk Trend</h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="year" />

          <YAxis domain={[0, 100]} />

          <Tooltip />

          <Legend />

          {districts.map(
            (district: string, index: number) => (
              <Line
                key={district}
                type="monotone"
                dataKey={district}
                stroke={
                  colors[index % colors.length]
                }
                strokeWidth={3}
              />
            )
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}