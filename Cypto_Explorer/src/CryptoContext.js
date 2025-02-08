import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    setSymbol(currency === "INR" ? "₹" : "$");
  }, [currency]);

  const value = useMemo(() => ({ currency, setCurrency, symbol }), [currency, symbol]);

  return <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>;
};

// Custom hook to use CryptoContext
export const useCrypto = () => useContext(CryptoContext);

export default CryptoContext;
