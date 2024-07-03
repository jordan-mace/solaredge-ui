import { CircularProgress } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useEffect, useState, memo } from "react";
import { EnergyData } from "../interfaces/Energy";
import { API_HOST, API_PORT, canParseJSON } from "../Globals";

function Energy() {
  const [data, setData] = useState<EnergyData | null | undefined>(undefined);

  async function fetchData() {
    try {
      const x = await fetch(`http://${API_HOST}:${API_PORT}/api/energy`);
      return await x.text();
    } catch (err) {
      return null;
    }
  }

  useEffect(() => {
    if (data == undefined)
      fetchData().then((result) =>
        result && canParseJSON(result)
          ? setData(JSON.parse(result) as EnergyData)
          : null,
      );
  });

  return (
    <div data-testid="energyWidget">
      {data ? (
        <LineChart
          xAxis={[
            {
              id: "barCategories",
              data: data?.energy.values.map((x) => x.date.slice(0, 10)),
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: data?.energy.values.map((x) => x.value / 1000),
              label: "kWh",
              area: true,
              showMark: false,
            },
          ]}
          height={500}
        />
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default memo(Energy);
