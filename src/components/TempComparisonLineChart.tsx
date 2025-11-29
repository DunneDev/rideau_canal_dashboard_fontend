import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { LineChart } from "@mui/x-charts/LineChart";
import Stack from "@mui/material/Stack";

export default function TempComparisonLineChart({ locationMap }: any) {
  const [mode, setMode] = useState<"surface" | "external">("surface");

  const locations = Object.keys(locationMap);

  // assume all locations share timestamps
  const timeValues = locationMap[locations[0]].map(
    (r: any) => new Date(r.window_end)
  );

  const fieldMap = {
    surface: { field: "avg_surface_temp", label: "Surface Temperature (°C)" },
    external: { field: "avg_external_temp", label: "External Temperature (°C)" }
  };

  const colors = ["#1e88e5", "#d81b60", "#43a047"];

  const series = locations.map((loc, i) => ({
    data: locationMap[loc].map((r: any) => r[fieldMap[mode].field]),
    label: loc,
    showMark: false,
    color: colors[i],
  }));

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Temperature Comparison
        </Typography>

        <Stack direction="row" justifyContent="center" sx={{ mt: 1 }}>
          <ButtonGroup sx={{ mb: 1 }}>
            <Button
              variant={mode === "surface" ? "contained" : "outlined"}
              onClick={() => setMode("surface")}
            >
              Surface
            </Button>
            <Button
              variant={mode === "external" ? "contained" : "outlined"}
              onClick={() => setMode("external")}
            >
              External
            </Button>
          </ButtonGroup>
        </Stack>
        <LineChart
          height={220}
          series={series}
          xAxis={[
            {
              scaleType: "time",
              data: timeValues,
              valueFormatter: (date) =>
                new Date(date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
            },
          ]}
          yAxis={[{ label: "°C" }]}
          tooltip={{ trigger: "item" }}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </CardContent>
    </Card>
  );
}
