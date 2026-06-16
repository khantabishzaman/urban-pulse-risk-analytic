"use client";

export default function DistrictRanking({ data }: any) {
  const latestYear = Math.max(
    ...data.map((d: any) => d.year)
  );

  const rankings = data
    .filter((d: any) => d.year === latestYear)
    .sort(
      (a: any, b: any) =>
        b.urban_pulse_risk_score -
        a.urban_pulse_risk_score
    );

  const thStyle = {
    padding: "14px",
    textAlign: "left" as const,
    color: "#ffffff",
    borderBottom: "2px solid #3b82f6",
  };

  const tdStyle = {
    padding: "14px",
    color: "#e2e8f0",
  };

  return (
    <div
      style={{
        background: "#0f172a",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "30px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "#ffffff",
        }}
      >
        District Risk Rankings
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          overflow: "hidden",
          borderRadius: "10px",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#111827",
            }}
          >
            <th style={thStyle}>Rank</th>
            <th style={thStyle}>District</th>
            <th style={thStyle}>Risk Score</th>
          </tr>
        </thead>

        <tbody>
          {rankings.map(
            (row: any, index: number) => (
              <tr
                key={row.district}
                style={{
                  borderBottom:
                    "1px solid #334155",
                }}
              >
                <td style={tdStyle}>
                  <span
                    style={{
                      background:
                        index === 0
                          ? "#dc2626"
                          : index === 1
                          ? "#ea580c"
                          : index === 2
                          ? "#ca8a04"
                          : "#334155",
                      padding: "4px 10px",
                      borderRadius: "999px",
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                  >
                    #{index + 1}
                  </span>
                </td>

                <td style={tdStyle}>
                  {row.district}
                </td>

                <td style={tdStyle}>
                  {row.urban_pulse_risk_score.toFixed(
                    1
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}