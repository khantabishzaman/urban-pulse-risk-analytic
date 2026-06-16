"use client";

import { useEffect, useState } from "react";
import { loadDataset } from "../Lib/LoadData";
import dynamic from "next/dynamic";

const DelhiMap = dynamic(
  () => import("../../components/DelhiMap"),
  { ssr: false }
);

export default function MapPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    loadDataset().then((rows: any) => {
      setData(rows);
    });
  }, []);

  if (!data.length) {
    return (
      <div style={{ padding: "40px" }}>
        Loading Map...
      </div>
    );
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Delhi Risk Heat Map</h1>

      <DelhiMap data={data} />
    </main>
  );
}