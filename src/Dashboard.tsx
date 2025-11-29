import type {} from "@mui/x-date-pickers/themeAugmentation";
import type {} from "@mui/x-charts/themeAugmentation";
import type {} from "@mui/x-data-grid-pro/themeAugmentation";
import type {} from "@mui/x-tree-view/themeAugmentation";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MainGrid from "./components/MainGrid";
import AppTheme from "./theme/AppTheme";
import { useEffect, useState } from "react";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "./theme/customizations";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_BACKEND_URL);
        const json = await res.json();
        console.log(json);
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    // fetch immediately
    fetchData();

    // fetch every 30 seconds
    const interval = setInterval(fetchData, 30000);

    // cleanup
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        {/* <SideMenu /> */}
        {/* <AppNavbar /> */}
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            {/* <Header /> */}
            <MainGrid dataProp={data} />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
