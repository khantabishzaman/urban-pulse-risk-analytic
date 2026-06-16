type Props = {
  highestRisk: string;
  avgAQI: number;
  districtCount: number;
  avgRisk: number;
};

export default function KPICards({
  highestRisk,
  avgAQI,
  districtCount,
  avgRisk,
}: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "20px",
        marginBottom: "40px",
      }}
    >
      <div className="card">
        <h3>Highest Risk</h3>
        <p>{highestRisk}</p>
      </div>

      <div className="card">
        <h3>Average AQI</h3>
        <p>{avgAQI}</p>
      </div>

      <div className="card">
        <h3>Districts</h3>
        <p>{districtCount}</p>
      </div>

      <div className="card">
        <h3>Average Risk</h3>
        <p>{avgRisk}</p>
      </div>
    </div>
  );
}