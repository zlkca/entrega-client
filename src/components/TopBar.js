import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import MuiAppBar from "@mui/material/AppBar";
// import Cookies from "js-cookie";

// import { JWT_COOKIE, LANGUAGE_COOKIE } from "../const";

// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import theme from "../theme";
// import LanguageMenu from "./LanguageMenu";
// import { Menu, MenuItem } from "@mui/material";
// import { selectSignedInUser } from "../redux/account/account.selector";
// import { setLanguage } from "../redux/layout/layout.slice";

const drawerWidth = 240;
const styles = {
  expanded: {
    // zIndex: theme.zIndex.drawer + 1,
    // transition: theme.transitions.create(['width', 'margin'], {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
    marginLeft: 0,
    // backgroundColor: theme.palette.grey[800],
  },
  collapsed: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    // backgroundColor: theme.palette.grey[800],
    // transition: theme.transitions.create(['width', 'margin'], {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
  },
  rightSide: {
    display: "flex",
  },
};
const languageMenus = [
  { name: "en", text: "English" },
  { name: "zh", text: "中文" },
];

export const TopBar = ({ isNavExpanded, title, children, onCollapse }) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

//   const signedInUser = useSelector(selectSignedInUser);

//   const handleLanguageSelect = (menu) => {
//     Cookies.set(LANGUAGE_COOKIE, menu.name);
//     i18n.changeLanguage(menu.name);
//     dispatch(setLanguage(menu.name));
//   };

//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     Cookies.set(JWT_COOKIE, "");
//     setAnchorEl(null);
//     window.location.href = "/login";
//   };

//   const handleChangePassword = () => {
//     setAnchorEl(null);
//     window.location.href = "/change-password";
//   };

  return (
    <MuiAppBar
      position="fixed"
      open={isNavExpanded}
      sx={isNavExpanded ? styles.collapsed : styles.expanded}
    >
      {/* <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onCollapse}
          edge="start"
          sx={{
            marginRight: 5,
            ...(isNavExpanded && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {title}
        </Typography>
        {children}
        <LanguageMenu menus={languageMenus} onSelect={handleLanguageSelect} />

        <div style={styles.rightSide}>
          <IconButton
            edge="end"
            aria-label="account of current user"
            // aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
          {signedInUser && <div style={{marginLeft: 15, paddingTop: 10}}>{signedInUser.username}</div>}
        </div>
      </Toolbar>


      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        // id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={anchorEl ? true : false}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu> */}
    </MuiAppBar>
  );
};
