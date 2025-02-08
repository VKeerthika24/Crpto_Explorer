import { BrowserRouter, Routes, Route } from "react-router-dom";
import { styled } from "@mui/system";
import Homepage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";
import { CryptoProvider } from "./CryptoContext";
import "./App.css";

// Styled Components
const AppContainer = styled("div")({
  backgroundColor: "#14161a",
  color: "white",
  minHeight: "100vh",
});

function App() {
  return (
    <CryptoProvider>
      <BrowserRouter> {/* FIXED - Use BrowserRouter directly */}
        <AppContainer>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/coins/:id" element={<CoinPage />} />
          </Routes>
        </AppContainer>
      </BrowserRouter>
    </CryptoProvider>
  );
}

export default App;
