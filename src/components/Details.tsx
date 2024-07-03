import { CircularProgress } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { DetailsData } from "../interfaces/Details";
import { useEffect, useState, memo } from "react";
import { API_HOST, API_HTTPS, canParseJSON } from "../Globals";
import { PieChart } from "@mui/x-charts";

function Details() {
  const [data, setData] = useState<DetailsData | null>(null);

  async function fetchData() {
    try {
      const x = await fetch(
        `${API_HTTPS ? "https" : "http"}://${API_HOST}/api/details`,
      );
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
        <PieChart
          title="Today"
          series={[
            {
              data: data?.powerDetails.meters.map((x, i) => {
                return {
                  id: i,
                  label: x.type,
                  value: x.values[0].value ? x.values[0].value / 1000 : 0,
                };
              }),
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
