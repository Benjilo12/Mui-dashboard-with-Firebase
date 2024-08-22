import { useTheme } from "@mui/material/styles";
import { tokens } from "../../../theme";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function LoadingSkeleton() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div>
      <Box>
        <Skeleton
          animation="wave"
          sx={{ bgcolor: "#1f2a40" }}
          variant="rectangular"
          m="30px 0 0 0"
          height="65vh"
        />
      </Box>
    </div>
  );
}

export default LoadingSkeleton;
