import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";

export default function IceComparisonLineChart({ locationMap }: any) {
  const locations = Object.keys(locationMap);
  const timeValues = locationMap[locations[0]].map((r: any) => new Date(r.window_end));

  const series = locations.map((loc, i) => ({
    data: locationMap[loc].map((r: any) => r.avg_ice_cm),
    label: loc,
    showMark: true,
    color: ["#1e88e5", "#d81b60", "#43a047"][i],
  }));

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Ice Thickness Comparison
        </Typography>

        <LineChart
          height={200}
          series={series}
          xAxis={[
            {
              scaleType: "time",
              data: timeValues,
              valueFormatter: (date) =>
                new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]}
          yAxis={[{ label: "cm" }]}
          tooltip={{ trigger: "item" }}
        />
      </CardContent>
    </Card>
  );
}
