import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import Logo from "../assets/images/logo192.png";
import { USER_PICTURE_SESSION, USERID_SESSION } from "../const";

const styles = {
  appBar: {
    bgcolor: "white",
    color: "#ddd",
    borderBottom: "1px solid #ddd",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
};

const pages = ["Goals", "Tasks"];
const settings = [
  // "Profile", "Account", "Dashboard",
  {id: "logout", text: "Logout"}
];

function TopBar() {
  const userId = sessionStorage.getItem(USERID_SESSION);
  const pictureUrl = sessionStorage.getItem(USER_PICTURE_SESSION);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickNavMenu = (page) => {
    handleCloseNavMenu();
    navigate(`/${page.toLowerCase()}`);
  };

  const handleSignin = () => {
    navigate("/signin");
    // window.location.href = `/signin`;
  };

  const handleSelectUserMenu = (item) => {
    if(item.id === 'logout'){
      sessionStorage.removeItem(USERID_SESSION);
      sessionStorage.removeItem(USER_PICTURE_SESSION);
      navigate("/");
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static" elevation={0} sx={styles.appBar}>
      <Toolbar disableGutters>
        <Box sx={{ display: { xs: "none", md: "flex" } }} onClick={() => navigate('/')}>
          <IconButton>
            <img src={Logo} alt="logo" width={40} height={40} />
          </IconButton>
          <Typography
            sx={{
              mr: 2,
              flexGrow: 1,
              fontSize: 24,
              fontWeight: 600,
              color: "#666",
              textDecoration: "none",
            }}
          >
            Podtree
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
        <Box sx={{ display: { xs: "flex", md: "none" } }} onClick={() => navigate('/')}>
          <IconButton>
            <img src={Logo} alt="logo" width={32} height={32} />
          </IconButton>
          <Typography
            sx={{
              mr: 2,
              flexGrow: 1,
              fontSize: 24,
              fontWeight: 600,
              color: "#666",
              textDecoration: "none",
            }}
          >
            Podtree
          </Typography>
        </Box>
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleClickNavMenu(page)}
                sx={{ my: 2, color: "#333", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexBasis: 200, display: { xs: "none", md: "flex" } }}>
            <Button
              key={"signin"}
              onClick={handleSignin}
              sx={{ my: 2, color: "#333", display: "block" }}
            >
              Sign In
            </Button>
            {/* <Button
              key={"Try Free"}
              onClick={handleSignup}
              sx={{ my: 2, color: "#333", display: "block" }}
            >
              Try Free
            </Button> */}

            {
              userId &&
              <Tooltip title="Settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="My Profile" src={pictureUrl ? pictureUrl : "/static/images/avatar/2.jpg"} />
                </IconButton>
              </Tooltip>
            }
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((it) => (
                <MenuItem key={it.id} onClick={() => handleSelectUserMenu(it)}>
                  <Typography textAlign="center">{it.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default TopBar;
