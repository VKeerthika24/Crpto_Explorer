import { LinearProgress, Typography, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import parse from "html-react-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { styled } from "@mui/system";
import { useCrypto } from "../CryptoContext"; 

// Styled Components
const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
}));

const MarketData = styled(Box)(({ theme }) => ({
  alignSelf: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 10,
  [theme.breakpoints.down("md")]: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currency, symbol } = useCrypto(); 

  const fetchCoin = async () => {
    try {
      setLoading(true);
      const url = SingleCoin(id);
      console.log("Fetching Coin Data from:", url);
      const { data } = await axios.get(url, {
        headers: { "Access-Control-Allow-Origin": "*" }, 
      });
      setCoin(data);
    } catch (error) {
      console.error("Error fetching coin data:", error.message);
      alert("Failed to load data. Please check your internet or try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, [id]); 

  if (loading) return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  return (
    <Container>
      <Sidebar>
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 2, fontFamily: "Montserrat" }}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ width: "100%", fontFamily: "Montserrat", padding: 3, textAlign: "justify" }}>
          {coin?.description?.en ? parse(coin.description.en.split(". ")[0]) : "No description available."}
        </Typography>
        <MarketData>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Rank:
            </Typography>
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank ? numberWithCommas(coin.market_cap_rank) : "N/A"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Current Price:
            </Typography>
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol} {coin?.market_data?.current_price ? numberWithCommas(coin.market_data.current_price[currency.toLowerCase()]) : "N/A"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Market Cap:
            </Typography>
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol} {coin?.market_data?.market_cap ? numberWithCommas(coin.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6)) : "N/A"}M
            </Typography>
          </Box>
        </MarketData>
      </Sidebar>
      <CoinInfo coin={coin} />
    </Container>
  );
};

export default CoinPage;
