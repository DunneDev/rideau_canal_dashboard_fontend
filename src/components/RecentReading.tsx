import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Chip from "@mui/material/Chip";
import { LineChart } from "@mui/x-charts/LineChart";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export type RecentReadingProps = {
  locationData: any;
  cardTitle: string;
};

export default function RecentReading({
  locationData,
  cardTitle,
}: RecentReadingProps) {
  const [selectedMetric, setSelectedMetric] = useState<
    "ice" | "surface" | "external" | "snow"
  >("ice");

  if (!locationData || locationData.length === 0) return null;

  const current = locationData[0];
  const previous = locationData[1] ?? null;

  const trend = (metric: keyof typeof current) => {
    if (!previous) return null;
    if (current[metric] > previous[metric])
      return <ArrowDropUpIcon color="success" />;
    if (current[metric] < previous[metric])
      return <ArrowDropDownIcon color="error" />;
    return null;
  };

  const safetyColor =
    current.safety_status === "Safe"
      ? "success"
      : current.safety_status === "Caution"
        ? "warning"
        : "error";

  const metricConfig = {
    ice: {
      field: "avg_ice_cm",
      label: "Ice Thickness (cm)",
      unit: "cm",
      color: "#1e88e5",
    },
    surface: {
      field: "avg_surface_temp",
      label: "Surface Temperature (°C)",
      unit: "°C",
      color: "#d81b60",
    },
    external: {
      field: "avg_external_temp",
      label: "External Temperature (°C)",
      unit: "°C",
      color: "#43a047",
    },
    snow: {
      field: "max_snow_cm",
      label: "Snow Depth (cm)",
      unit: "cm",
      color: "#8e24aa",
    },
  };

  const metric = metricConfig[selectedMetric];
  const sparkData = locationData
    .slice(0, 6)
    .reverse()
    .map((r) => r[metric.field]);

  const timeValues = locationData
    .slice(0, 6)
    .reverse()
    .map((r) => new Date(r.window_end));

  return (
    <Card variant="outlined" sx={{ height: "100%", flexGrow: 1 }}>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <Typography component="h2" variant="subtitle2">
            {cardTitle}
          </Typography>

          <Chip
            label={current.safety_status}
            color={safetyColor}
            size="small"
            sx={{ ml: 1 }}
          />
        </Stack>

        <Stack direction="column" sx={{ gap: 1 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">
              Current Ice Thickness: {current.avg_ice_cm.toFixed(1)} cm
            </Typography>
            {trend("avg_ice_cm")}
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">
              Surface Temperature: {current.avg_surface_temp.toFixed(1)} °C
            </Typography>
            {trend("avg_surface_temp")}
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">
              External Temperature: {current.avg_external_temp.toFixed(1)} °C
            </Typography>
            {trend("avg_external_temp")}
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">
              Snow Depth: {current.max_snow_cm.toFixed(1)} cm
            </Typography>
            {trend("max_snow_cm")}
          </Stack>

          <Stack direction="row" justifyContent="center" sx={{ mt: 1 }}>
            <ButtonGroup size="small">
              <Button
                variant={selectedMetric === "ice" ? "contained" : "outlined"}
                onClick={() => setSelectedMetric("ice")}
              >
                Ice
              </Button>
              <Button
                variant={
                  selectedMetric === "surface" ? "contained" : "outlined"
                }
                onClick={() => setSelectedMetric("surface")}
              >
                Surface
              </Button>
              <Button
                variant={
                  selectedMetric === "external" ? "contained" : "outlined"
                }
                onClick={() => setSelectedMetric("external")}
              >
                External
              </Button>
              <Button
                variant={selectedMetric === "snow" ? "contained" : "outlined"}
                onClick={() => setSelectedMetric("snow")}
              >
                Snow
              </Button>
            </ButtonGroup>
          </Stack>

          <Stack sx={{ mt: 1 }}>
            <LineChart
              height={120}
              series={[
                {
                  data: sparkData,
                  label: metric.label,
                  showMark: true,
                  valueFormatter: (value) =>
                    `${value.toFixed(1)} ${metric.unit}`,
                  color: metric.color, // ← THIS MAKES IT CHANGE
                },
              ]}
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
              yAxis={[
                {
                  label: "",
                  tickFormat: () => "",
                },
              ]}
              margin={{ top: 10, bottom: 30, left: 10, right: 10 }}
              tooltip={{ trigger: "item" }}
            />
          </Stack>

          <Typography variant="caption" color="text.secondary">
            {new Date(current.window_end).toLocaleString()}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

