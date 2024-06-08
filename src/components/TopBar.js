import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled, alpha } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../redux/cart/cart.selector';
import { useNavigate } from 'react-router-dom';
import { categoryAPI } from '../services/categoryAPI';
import { selectCategories, selectCategory } from '../redux/category/category.selector';
import { setCategories, setCategory } from '../redux/category/category.slice';
import NavMenu from './NavMenu';
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function DrawerAppBar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const cart = useSelector(selectCart);
  const categories = useSelector(selectCategories);
  const category = useSelector(selectCategory)
  React.useEffect(() => {
    categoryAPI.fetchCategories().then(r => {
      dispatch(setCategories(r.data));
      if (!category) {
        dispatch(setCategory(r.data[0]));
      }
    });
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleCart = () => {
    navigate("/cart")
  }

  const handleCategory = (c) => {
    dispatch(setCategory(c))
    navigate("/products")
  }

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" elevation={0}>
        <Toolbar>
          <Grid container>
            <Grid item xs={12} display="flex">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                MyShop
              </Typography>
              <Grid container sx={{ flexGrow: 1 }} display="flex" justifyContent="flex-end">
                <Grid item xs={12} sm={8} lg={4} pt={1} pr={1}>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search>
                </Grid>
              </Grid>
              <Box style={{width: 36, paddingTop:16}}>
                <Badge badgeContent={cart ? cart.reduce((sum, it) => sum + it.quantity, 0) : 0} color="secondary" onClick={handleCart}>
                  <ShoppingCartIcon color="action" />
                </Badge>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12} sm={8} lg={4} pt={0} pb={0.2}>
                {
                  categories && categories.length > 0 &&
                  categories.map(c =>
                    <Button
                      size="small"
                      variant="text"
                      key={c.name}
                      style={{ color: "white", borderRadius: 0, borderBottom: c._id == category._id ? "1px solid white" : "none" }}
                      onClick={() => handleCategory(c)}
                    >
                      {t(c.name)}
                    </Button>
                  )
                }
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <NavMenu onToggle={handleDrawerToggle} />
        </Drawer>
      </nav>
      {/* <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
        </Typography>
      </Box> */}
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;

// import * as React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";
// import MuiAppBar from "@mui/material/AppBar";
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

// const drawerWidth = 240;
// const styles = {
//   expanded: {
//     // zIndex: theme.zIndex.drawer + 1,
//     // transition: theme.transitions.create(['width', 'margin'], {
//     //   easing: theme.transitions.easing.sharp,
//     //   duration: theme.transitions.duration.leavingScreen,
//     // }),
//     marginLeft: 0,
//     // backgroundColor: theme.palette.grey[800],
//   },
//   collapsed: {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     // backgroundColor: theme.palette.grey[800],
//     // transition: theme.transitions.create(['width', 'margin'], {
//     //   easing: theme.transitions.easing.sharp,
//     //   duration: theme.transitions.duration.enteringScreen,
//     // }),
//   },
//   rightSide: {
//     display: "flex",
//   },
// };
// const languageMenus = [
//   { name: "en", text: "English" },
//   { name: "zh", text: "中文" },
// ];

// export const TopBar = ({ isNavExpanded, title, children, onCollapse }) => {
//   const { i18n } = useTranslation();
//   const dispatch = useDispatch();

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

//   return (
//     <MuiAppBar
//       position="fixed"
//       open={isNavExpanded}
//       sx={isNavExpanded ? styles.collapsed : styles.expanded}
//     >
//         <TopBar />
//       <Toolbar>
//         <IconButton
//           color="inherit"
//           aria-label="open drawer"
//           onClick={onCollapse}
//           edge="start"
//           sx={{
//             marginRight: 5,
//             ...(isNavExpanded && { display: "none" }),
//           }}
//         >
//           <MenuIcon />
//         </IconButton>
//         <Typography variant="h6" noWrap component="div">
//           {title}
//         </Typography>
//         {children}
//         <LanguageMenu menus={languageMenus} onSelect={handleLanguageSelect} />

//         <div style={styles.rightSide}>
//           <IconButton
//             edge="end"
//             aria-label="account of current user"
//             // aria-controls={menuId}
//             aria-haspopup="true"
//             onClick={handleProfileMenuOpen}
//             color="inherit"
//           >
//             <AccountCircleIcon />
//           </IconButton>
//           {signedInUser && <div style={{marginLeft: 15, paddingTop: 10}}>{signedInUser.username}</div>}
//         </div>
//       </Toolbar>


//       <Menu
//         anchorEl={anchorEl}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         // id={menuId}
//         keepMounted
//         transformOrigin={{ vertical: "top", horizontal: "right" }}
//         open={anchorEl ? true : false}
//         onClose={handleMenuClose}
//       >
//         <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
//         <MenuItem onClick={handleLogout}>Logout</MenuItem>
//       </Menu>
//     </MuiAppBar>
//   );
// };
