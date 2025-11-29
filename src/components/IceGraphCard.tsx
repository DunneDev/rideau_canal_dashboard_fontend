import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { LineChart } from "@mui/x-charts/LineChart";
import { useState } from "react";
import Stack from "@mui/material/Stack";

export default function IceGraphCard({ locationMap, locationNames }: any) {
  const [selectedLocation, setSelectedLocation] = useState(locationNames[0]);
  const data = locationMap[selectedLocation];

  if (!data || data.length === 0) return null;

  const timeValues = data.map((r: any) => new Date(r.window_end));

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Ice Thickness - {selectedLocation}
        </Typography>

        <Stack direction="row" justifyContent="center" sx={{ mt: 1 }}>
          <ButtonGroup size="small" sx={{ mb: 1 }}>
            {locationNames.map((name) => (
              <Button
                key={name}
                variant={selectedLocation === name ? "contained" : "outlined"}
                onClick={() => setSelectedLocation(name)}
              >
                {name}
              </Button>
            ))}
          </ButtonGroup>
        </Stack>

        <LineChart
          height={200}
          series={[
            {
              data: data.map((r: any) => r.min_ice_cm),
              label: "Min Ice (cm)",
              showMark: true,
              color: "#d81b60",
            },
            {
              data: data.map((r: any) => r.avg_ice_cm),
              label: "Avg Ice (cm)",
              showMark: true,
              color: "#2196f3",
            },
            {
              data: data.map((r: any) => r.max_ice_cm),
              label: "Max Ice (cm)",
              showMark: true,
              color: "#4caf50",
            },
          ]}
          xAxis={[
            {
              scaleType: "time",
              data: timeValues,
              valueFormatter: (date) =>
                new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]}
          yAxis={[{ label: "cm" }]}
          margin={{ top: 10, bottom: 30, left: 10, right: 10 }}
          tooltip={{ trigger: "item" }}
        />
      </CardContent>
    </Card>
  );
}
