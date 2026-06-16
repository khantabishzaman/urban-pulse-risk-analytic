"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

export default function DelhiMap({ data }: any) {
  const [geoData, setGeoData] = useState<any>(null);

const [selectedDistrict, setSelectedDistrict] =
  useState<any>(null);

const [selectedLayer, setSelectedLayer] =
  useState<any>(null);

  useEffect(() => {
    fetch("/maps/delhi_districts.geojson")
      .then((res) => res.json())
      .then((json) => setGeoData(json));
  }, []);

  if (!geoData || !data?.length) {
    return (
      <div style={{ padding: "20px" }}>
        Loading Map...
      </div>
    );
  }

  // Latest Year Data
  const latestYear = Math.max(
    ...data.map((d: any) => d.year)
  );

  const latestData = data.filter(
    (d: any) => d.year === latestYear
  );

  // Mapping GeoJSON districts to available CSV districts
  const districtMapping: Record<string, string> = {
    // Original districts
    Central: "Central",
    East: "East",
    West: "West",
    "North West": "North West",
    "South West": "South West",

    // Synthetic mappings for missing districts
    "New Delhi": "Central",
    North: "North West",
    "North East": "East",
    Shahdara: "East",
    South: "South West",
    "South East": "South West",
    "South Delhi": "South West",
    "North Delhi": "North West",
    "West Delhi": "West",
    "East Delhi": "East",
  };

  const getColor = (risk: number) => {
    if (risk > 60) return "#ef4444"; // Red
    if (risk > 40) return "#f97316"; // Orange
    if (risk > 20) return "#eab308"; // Yellow
    return "#22c55e"; // Green
  };

  const styleFeature = (feature: any) => {
  const geoDistrict =
    feature.properties.DISTRICT;

  const csvDistrict =
    districtMapping[geoDistrict] ||
    geoDistrict;

  const districtData = latestData.find(
    (d: any) => d.district === csvDistrict
  );

  // No data → grey
  if (!districtData) {
    return {
      fillColor: "#6b7280",
      weight: 2,
      color: "#ffffff",
      fillOpacity: 0.25,
    };
  }

  return {
    fillColor: getColor(
      districtData.urban_pulse_risk_score
    ),
    weight: 2,
    color: "#ffffff",
    fillOpacity: 0.75,
  };
};

const onEachFeature = (
  feature: any,
  layer: any
) => {
  const geoDistrict =
    feature.properties.DISTRICT;

  const csvDistrict =
    districtMapping[geoDistrict] ||
    geoDistrict;

  const districtData = latestData.find(
    (d: any) => d.district === csvDistrict
  );

  layer.on({
    mouseover: (e: any) => {
      e.target.setStyle({
        weight: 4,
        fillOpacity: districtData
          ? 0.9
          : 0.25,
      });
    },

    mouseout: (e: any) => {
      if (
        selectedDistrict?.district ===
        geoDistrict
      ) {
        return;
      }

      e.target.setStyle(
        styleFeature(feature)
      );
    },

    click: (e: any) => {
      if (selectedLayer) {
        selectedLayer.setStyle(
          styleFeature(
            selectedLayer.feature
          )
        );
      }

      e.target.setStyle({
        weight: 5,
        color: "#ffffff",
        fillOpacity: districtData
          ? 1
          : 0.25,
      });

      setSelectedLayer(e.target);

      if (districtData) {
        setSelectedDistrict({
          district: geoDistrict,
          ...districtData,
        });
      } else {
        setSelectedDistrict({
          district: geoDistrict,
          noData: true,
        });
      }
    },
  });

  if (districtData) {
    layer.bindTooltip(`
      <div>
        <strong>${geoDistrict}</strong><br/>
        AQI: ${districtData.avg_aqi.toFixed(
          1
        )}<br/>
        Risk Score:
        ${districtData.urban_pulse_risk_score.toFixed(
          1
        )}
      </div>
    `);
  } else {
    layer.bindTooltip(`
      <div>
        <strong>${geoDistrict}</strong><br/>
        No Data Available
      </div>
    `);
  }
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
          color: "white",
          marginBottom: "20px",
        }}
      >
        Delhi Risk Heat Map
      </h2>

      <div
        style={{
          height: "700px",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <MapContainer
          center={[28.6139, 77.209]}
          zoom={10}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <GeoJSON
            data={geoData}
            style={styleFeature}
            onEachFeature={onEachFeature}
          />
        </MapContainer>
      </div>
      
{
  selectedDistrict && (
    <div
      style={{
        marginTop: "20px",
        background:
          "linear-gradient(135deg,#111827,#1f2937)",
        border:
          "1px solid rgba(255,255,255,0.15)",
        borderRadius: "12px",
        padding: "20px",
        color: "white",
        boxShadow:
          "0 8px 20px rgba(0,0,0,0.3)",
      }}
    >
      <h3
        style={{
          marginBottom: "15px",
        }}
      >
        District Details
      </h3>

      {selectedDistrict.noData ? (
        <div>
          No dataset available for{" "}
          <strong>
            {
              selectedDistrict.district
            }
          </strong>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "14px",
          }}
        >
          <div>
            <strong>District</strong>
            <br />
            {
              selectedDistrict.district
            }
          </div>

          <div>
            <strong>AQI</strong>
            <br />
            {selectedDistrict.avg_aqi?.toFixed(
              1
            )}
          </div>

          <div>
            <strong>
              Population
            </strong>
            <br />
            {selectedDistrict.population?.toLocaleString()}
          </div>

          <div>
            <strong>Density</strong>
            <br />
            {selectedDistrict.density?.toLocaleString()}
          </div>

          <div>
            <strong>Literacy</strong>
            <br />
            {selectedDistrict.literacy?.toFixed(
              1
            )}
            %
          </div>

          <div>
            <strong>
              Healthcare Facilities
            </strong>
            <br />
            {
              selectedDistrict.healthcare_facilities
            }
          </div>

          <div>
            <strong>
              Risk Score
            </strong>
            <br />
            {selectedDistrict.urban_pulse_risk_score?.toFixed(
              1
            )}
          </div>
        </div>
      )}
    </div>
  )
}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
          color: "white",
          fontWeight: 500,
        }}
      >
        <span>🟢 Low Risk (0–20)</span>
        <span>🟡 Medium Risk (21–40)</span>
        <span>🟠 High Risk (41–60)</span>
        <span>🔴 Critical Risk (60+)</span>
      </div>
    </div>
  );
}