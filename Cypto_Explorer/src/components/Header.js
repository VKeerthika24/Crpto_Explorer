import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useCrypto } from "../CryptoContext"; // ✅ Fixed Import

// Styled Components
const Title = styled(Typography)({
  flex: 1,
  color: "gold",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  cursor: "pointer",
});

// Theme Configuration
const darkTheme = createTheme({
  palette: {
    mode: "dark", 
    primary: { main: "#fff" },
  },
});

function Header() {
  const { currency, setCurrency } = useCrypto(); // ✅ Hook inside function
  const navigate = useNavigate(); 

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Title onClick={() => navigate(`/`)} variant="h6">
            Crypto Explorer
            </Title>
            <Select
              variant="outlined"
              value={currency}
              sx={{ width: 100, height: 40, marginLeft: 2 }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
