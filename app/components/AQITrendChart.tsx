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

export default function AQITrendChart({ data }: { data: any[] }) {
  const districts: string[] = [
  ...new Set(data.map((d: any) => d.district)),
];
  const years: number[] = [...new Set(data.map((d: any) => d.year))]
    .sort((a, b) => a - b);

  const chartData: any[] = years.map((year: number) => {
    const row: any = { year };

    districts.forEach((district: string) => {
      const record = data.find(
        (d: any) =>
          d.year === year &&
          d.district === district
      );

      row[district] = record ? record.avg_aqi : null;
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
      }}
    >
      <h2>AQI Trend by District</h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData}>
          <XAxis dataKey="year" />
          <YAxis domain={[150, 400]} />
          <Tooltip
  contentStyle={{
    background: "#111827",
    border: "1px solid #374151",
    borderRadius: "8px",
  }}
           />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />

          {districts.map((district: string, index: number) => (
            <Line
              key={district}
              type="monotone"
              dataKey={district}
              stroke={colors[index % colors.length]}
              strokeWidth={3}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}