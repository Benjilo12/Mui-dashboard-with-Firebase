import Box from "@mui/material/Box";
import Header from "../../components/Header";
import PieCharts from "../../components/PieCharts";

function Pie() {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <PieCharts />
      </Box>
    </Box>
  );
}
export default Pie;
