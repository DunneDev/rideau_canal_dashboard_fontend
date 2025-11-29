import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";

export default function CurrentIceBarChart({ locationMap }: any) {
  const locations = Object.keys(locationMap);

  const data = locations.map((loc) => ({
    label: loc,
    value: locationMap[loc][0]?.avg_ice_cm ?? 0,
  }));

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Current Ice Thickness
        </Typography>

        <BarChart
          height={200}
          series={[{ data: data.map((d) => d.value), label: "Ice Thickness (cm)" }]}
          xAxis={[{ data: data.map((d) => d.label) }]}
          yAxis={[{ label: "cm" }]}
          tooltip={{ trigger: "item" }}
        />
      </CardContent>
    </Card>
  );
}
