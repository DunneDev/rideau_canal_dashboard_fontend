import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RecentReading from "./RecentReading";
import IceGraphCard from "./IceGraphCard";
import TempGraphCard from "./TempGraphCard";
import CurrentIceBarChart from "./CurrentIceBarChart";
import IceComparisonLineChart from "./IceComparisonLineChart";
import TempComparisonLineChart from "./TempComparisonLineChart";

export default function MainGrid({dataProp}: any) {
  const dow = dataProp.filter((item: any) => item.location === "Dows Lake");
  const fifth = dataProp.filter((item: any) => item.location === "Fifth Ave");
  const nac = dataProp.filter((item: any) => item.location === "NAC");

  const locationMap = { "Dow's Lake": dow, "Fifth Ave": fifth, NAC: nac };
  const locationNames = Object.keys(locationMap);

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ m: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ sm: 12, md: 4 }}>
          <RecentReading locationData={dow} cardTitle="Dow's Lake" />
        </Grid>
        <Grid size={{ sm: 12, md: 4 }}>
          <RecentReading locationData={fifth} cardTitle="Fifth Ave." />
        </Grid>
        <Grid size={{ sm: 12, md: 4 }}>
          <RecentReading locationData={nac} cardTitle="NAC" />
        </Grid>
      </Grid>

      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Trends
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid item size={{ sm: 12, md: 6 }}>
          <IceGraphCard locationMap={locationMap} locationNames={locationNames} />
        </Grid>
        <Grid item size={{ sm: 12, md: 6}}>
          <TempGraphCard locationMap={locationMap} locationNames={locationNames} />
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12} sx={{ mt: 2 }}>
        <Grid item size={{ sm: 12, md: 12 }}>
          <TempComparisonLineChart locationMap={locationMap} />
        </Grid>
        <Grid item size={{ sm: 12, md: 6 }}>
          <CurrentIceBarChart locationMap={locationMap} />
        </Grid>
        <Grid item size={{ sm: 12, md: 6 }}>
          <IceComparisonLineChart locationMap={locationMap} />
        </Grid>
      </Grid>
    </Box>
  );
}
