import { Box, Typography } from "@mui/material";

export default function XCardHeader({ title, children }) {
  return (
    <Box
      p={2}
      variant="contained"
      bgColor="secondary"
      borderRadius="md"
      coloredShadow="none"
    >
      <Typography variant="h6" color="#333">
        {title}
      </Typography>
      {children}
    </Box>
  );
}
