import { styled } from "@mui/system";
import { Box } from "@mui/material";

const SelectButtonStyled = styled(Box)(({ selected }) => ({
  border: "1px solid gold",
  borderRadius: 5,
  padding: "10px 20px",
  fontFamily: "Montserrat",
  cursor: "pointer",
  backgroundColor: selected ? "gold" : "transparent",
  color: selected ? "black" : "white",
  fontWeight: selected ? 700 : 500,
  "&:hover": {
    backgroundColor: "gold",
    color: "black",
  },
  width: "22%",
  textAlign: "center",
}));

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <SelectButtonStyled onClick={onClick} selected={selected}>
      {children}
    </SelectButtonStyled>
  );
};

export default SelectButton;
