import React from "react";
import { Box } from "@mui/material"; 
import Banner from "../components/Banner/Banner";
import CoinsTable from "../components/CoinsTable";

const Homepage = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Banner />
      <CoinsTable />
    </Box>
  );
};

export default Homepage;
