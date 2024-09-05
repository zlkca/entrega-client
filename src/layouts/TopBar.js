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
import MenuItem from "@mui/material/MenuItem";

import Logo from "../components/Logo";
import { USER_PICTURE_COOKIE, USERID_COOKIE } from "../const";
import { getFirstDateOfWeek, getLastDateOfWeek } from "../pages/utils";
import { setWeek } from "../redux/ui/ui.slice";
import { useDispatch } from "react-redux";

const styles = {
  appBar: {
    bgcolor: "white",
    color: "#ddd",
    borderBottom: "1px solid #ddd",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
};

const pages = ["Categories", "Goals", "Tasks", "Analytics"];
const settings = [
  // "Profile", "Account", "Dashboard",
  { id: "logout", text: "Logout" },
];

function TopBar() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem(USERID_COOKIE);
  const pictureUrl = localStorage.getItem(USER_PICTURE_COOKIE);
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
    const today = new Date();
    const start = getFirstDateOfWeek(today);
    const end = getLastDateOfWeek(today);
    dispatch(
      setWeek({
        start: start.getTime(),
        end: end.getTime(),
        current: today.getTime(),
      })
    );

    navigate(`/${page.toLowerCase()}`);
  };

  const handleSignin = () => {
    navigate("/signin");
    // window.location.href = `/signin`;
  };

  const handleSelectUserMenu = (item) => {
    if (item.id === "logout") {
      localStorage.removeItem(USERID_COOKIE);
      localStorage.removeItem(USER_PICTURE_COOKIE);
      navigate("/");
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static" elevation={0} sx={styles.appBar}>
      <Toolbar disableGutters>
        <Box
          sx={{ display: { xs: "none", md: "flex" }, width: 160 }}
          onClick={() => navigate("/")}
        >
          <Logo width={40} height={40} />
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
              <MenuItem key={page} onClick={() => handleClickNavMenu(page)}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
        <Box
          sx={{ display: { xs: "flex", md: "none" }, width: 160 }}
          onClick={() => navigate("/")}
        >
          <Logo />
        </Box>
        <Box sx={{ display: "flex", width: "100%", flexGrow: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
          </Box>
          <Box sx={{ width: userId ? 50 : 200, display: "flex" }}>
            {!userId && (
              <Button
                key={"signin"}
                onClick={handleSignin}
                sx={{ my: 2, color: "#333", display: "block", float: "right" }}
              >
                Sign In
              </Button>
            )}
            {/* <Button
              key={"Try Free"}
              onClick={handleSignup}
              sx={{ my: 2, color: "#333", display: "block" }}
            >
              Try Free
            </Button> */}

            {userId && (
              // <Tooltip title="Settings">
              <div style={{ width: 60, paddingTop: 0, display: "flex",
                justifyContent: "center",
                alignItems: "center",}}>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                  }}
                >
                  <Avatar
                    alt="My Profile"
                    src={
                      pictureUrl ? pictureUrl : "/static/images/avatar/2.jpg"
                    }
                  />
                </IconButton>
              </div>
            )}
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
