import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import { CircularProgress, ThemeProvider, createTheme, Box } from "@mui/material";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { useCrypto } from "../CryptoContext";  
import { styled } from "@mui/system";
import { Typography } from "@mui/material";


import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

// Styled Components
const Container = styled(Box)(({ theme }) => ({
  width: "75%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 25,
  padding: 40,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginTop: 0,
    padding: 20,
    paddingTop: 0,
  },
}));

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = useCrypto();  
  const [loading, setLoading] = useState(true);

  const fetchHistoricData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setHistoricData(data.prices || []); 
    } catch (error) {
      console.error("Error fetching historical data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#fff" },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        {loading ? (
          <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
        ) : (
          <>
            {historicData.length > 0 ? (
              <Line
                data={{
                  labels: historicData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),
                  datasets: [
                    {
                      data: historicData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#EEBC1D",
                      tension: 0.1, 
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true },
                  },
                  elements: {
                    point: { radius: 1 },
                  },
                }}
              />
            ) : (
              <Typography color="error">No historical data available.</Typography>
            )}
            <Box
              sx={{
                display: "flex",
                marginTop: 2,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </Box>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default CoinInfo;
