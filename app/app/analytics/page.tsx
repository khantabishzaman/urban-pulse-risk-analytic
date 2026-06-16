"use client";

import AQITrendChart from "../../components/AQITrendChart";
import { useEffect, useState } from "react";
import KPICards from "../../components/KPICards";
import { loadDataset } from "../Lib/LoadData";
import RiskTrendChart from "../../components/RiskTrendChart";
import DistrictRanking from "../../components/DistrictRanking";

export default function AnalyticsPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    loadDataset().then((rows: any) => {
      setData(rows);
    });
  }, []);

  if (!data.length) {
    return <div style={{ padding: "40px" }}>Loading...</div>;
  }

  const avgAQI =
    data.reduce((a, b) => a + b.avg_aqi, 0) / data.length;

  const avgRisk =
    data.reduce((a, b) => a + b.urban_pulse_risk_score, 0) /
    data.length;

  const districtCount = new Set(
    data.map((d) => d.district)
  ).size;

  const highestRiskDistrict =
    [...data].sort(
      (a, b) =>
        b.urban_pulse_risk_score -
        a.urban_pulse_risk_score
    )[0].district;



  return (
  <main style={{ padding: "40px" }}>
    <h1>Urban Pulse Analytics Dashboard</h1>

    <KPICards
      highestRisk={highestRiskDistrict}
      avgAQI={Math.round(avgAQI)}
      districtCount={districtCount}
      avgRisk={Math.round(avgRisk)}
    />

    <div
      style={{
        background: "#111",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <AQITrendChart data={data} />
      <RiskTrendChart data={data} />
      <DistrictRanking data={data} />
    </div>
  </main>
);
}