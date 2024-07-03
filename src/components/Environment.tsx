import { CircularProgress, styled } from "@mui/material";
import { BarChart, LineChart } from "@mui/x-charts";
import { useEffect, useState, memo } from "react";
import { EnergyData } from "../interfaces/Energy";
import { API_HOST, API_HTTPS, canParseJSON } from "../Globals";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { EnvironmentData } from "../interfaces/Environment";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

function Environment() {
  const [data, setData] = useState<EnvironmentData | null | undefined>(
    undefined,
  );

  async function fetchData() {
    try {
      const x = await fetch(
        `${API_HTTPS ? "https" : "http"}://${API_HOST}/api/environment`,
      );
      return await x.text();
    } catch (err) {
      return null;
    }
  }

  useEffect(() => {
    if (data == undefined)
      fetchData().then((result) =>
        result && canParseJSON(result)
          ? setData(JSON.parse(result) as EnvironmentData)
          : null,
      );
  });

  return (
    <>
      {data ? (
        <div>
          <p>
            The equivalent of {Math.round(data.envBenefits.lightBulbs)} light
            bulbs and {Math.round(data.envBenefits.treesPlanted)} trees
          </p>
          <h4>Emissions Saved</h4>
          <BarChart
            xAxis={[{ scaleType: "band", data: ["CO2", "NOX", "SO2"] }]}
            series={[
              {
                data: [
                  data?.envBenefits.gasEmissionSaved.co2 / 1000,
                  data?.envBenefits.gasEmissionSaved.nox / 1000,
                  data?.envBenefits.gasEmissionSaved.so2 / 1000,
                ],
                label: data.envBenefits.gasEmissionSaved.units,
              },
            ]}
            height={500}
          />
        </div>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default memo(Environment);
