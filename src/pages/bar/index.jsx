import Box from "@mui/material/Box";
import Header from "../../components/Header";
import BarCharts from "../../components/BarCharts";

function Bar() {
  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <BarCharts />
      </Box>
    </Box>
  );
}
export default Bar;
