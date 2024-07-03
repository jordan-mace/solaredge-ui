import { CircularProgress } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { DetailsData } from "../interfaces/Details";
import { useEffect, useState, memo } from "react";
import { API_HOST, API_PORT, canParseJSON } from "../Globals";

function Details() {
  const [data, setData] = useState<DetailsData | null>(null);

  async function fetchData() {
    try {
      const x = await fetch(`http://${API_HOST}:${API_PORT}/api/details`);
      return await x.text();
    } catch (err) {
      return null;
    }
  }

  useEffect(() => {
    if (data == null)
      fetchData().then((result) =>
        result && canParseJSON(result)
          ? setData(JSON.parse(result) as DetailsData)
          : null,
      );
  });

  return (
    <div data-testid="detailsWidget">
      {data ? (
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: data?.powerDetails.meters.map((x) => x.type),
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: data?.powerDetails.meters.map((x) =>
                x.values[0].value ? x.values[0].value / 1000 : null,
              ),
              label: "kWh",
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

export default memo(Details);
