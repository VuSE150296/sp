import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        height: 60,
        display: "flex",
        backgroundColor: "#1976d2",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          color: "white",
        }}
      >
        copyright @2022
      </Typography>
    </Box>
  );
}

export default Footer;
