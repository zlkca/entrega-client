import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LogoImage from "../assets/images/logo192.png";

export default function Logo({width=32, height=32}){
    return (
        <Box className="logo" style={{display: "flex"}}>
          <IconButton>
            <img src={LogoImage} alt="logo" width={width} height={height} />
          </IconButton>
          <Typography
            sx={{
              mr: 2,
              flexGrow: 1,
              fontSize: 24,
              fontWeight: 600,
              color: "#666",
              textDecoration: "none",
              paddingTop: '10px'
            }}
          >
            Podtree
          </Typography>
        </Box>
    )
}
