import { Box, styled, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { useCrypto } from "../../CryptoContext";
import { numberWithCommas } from "../CoinsTable";

// Styled Components
const CarouselContainer = styled(Box)({
  height: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center", // Center content
  position: "relative",
});

const CarouselItem = styled(Link)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  textTransform: "uppercase",
  color: "white",
  textDecoration: "none",
});

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Added Loading State
  const { currency, symbol } = useCrypto();

  // Fetch Trending Coins
  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency), {
        headers: { "Access-Control-Allow-Origin": "*" }, // ✅ Fix CORS issue
      });
      setTrending(data);
    } catch (error) {
      console.error("Error fetching trending coins:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    const profit = coin?.price_change_percentage_24h >= 0;

    return (
      <CarouselItem key={coin.id} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol.toUpperCase()} &nbsp;
          <span
            style={{
              color: profit ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </CarouselItem>
    );
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  return (
    <CarouselContainer>
      {loading ? ( // ✅ Show loading indicator while data is being fetched
        <CircularProgress style={{ color: "gold" }} />
      ) : (
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          items={items}
          autoPlay
        />
      )}
    </CarouselContainer>
  );
};

export default Carousel;
