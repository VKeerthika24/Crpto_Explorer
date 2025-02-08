import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Carousel from "./Carousel";

const BannerWrapper = styled(Box)({
  backgroundImage: "url(./banner2.jpg)",
});

const BannerContent = styled(Container)({
  height: 700,
  display: "flex",
  flexDirection: "column",
  paddingTop: 25,
  justifyContent: "space-around",
});

const Tagline = styled(Box)({
  display: "flex",
  height: "40%",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
});

function Banner() {
  return (
    <BannerWrapper>
      <BannerContent>
        <Tagline>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Explorer
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </Tagline>
        <Carousel />
      </BannerContent>
    </BannerWrapper>
  );
}

export default Banner;
