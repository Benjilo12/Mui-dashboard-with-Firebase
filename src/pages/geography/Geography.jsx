import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import GeoChart from "../../components/GeoChart";
import { colors } from "@mui/material";

function Line() {
  const theme = useTheme();
  const borderColor =
    theme.palette.mode === "light" ? colors.common.black : colors.grey[100];
  return (
    <Box m="20px">
      <Header title="Geography Chart" subtitle="Simple Map" />
      <Box height="75vh" border={`1px solid ${borderColor}`} borderRadius="4px">
        <GeoChart />
      </Box>
    </Box>
  );
}

export default Line;
