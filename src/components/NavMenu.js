import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories, selectCategory } from "../redux/category/category.selector";
import { setCategory } from "../redux/category/category.slice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { setLanguage } from "../redux/ui/ui.slice";
import { useTranslation } from "react-i18next";
import { ACCOUNT_COOKIE, JWT_COOKIE, LANGUAGE_COOKIE } from "../const";
import { googleLogout } from '@react-oauth/google';
import { setCart } from "../redux/cart/cart.slice";
import { setSignedInUser } from "../redux/auth/auth.slice";
import { selectLanguage } from "../redux/ui/ui.selector";

export default function NavMenu({onToggle}){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const [menus, setMenus] = useState()
    const categories = useSelector(selectCategories);
    const category = useSelector(selectCategory);
    const lang = useSelector(selectLanguage);
    // lang -- en, zh
    const handleLanguageSelect = (lang) => {
        Cookies.set(LANGUAGE_COOKIE, lang);
        i18n.changeLanguage(lang);
        dispatch(setLanguage(lang));
    };

    useEffect(() => {
        if(categories && categories.length >0){
            const ms = []; // {name: 'Home', onClick: () => {navigate("/products");}}];
            categories.map(it => {
                ms.push({
                    name: it.name, 
                    onClick: ()=> {
                        dispatch(setCategory(it));
                        navigate("/products");
                    }
                })
            })
            ms.push({id: 'en', name: 'English', onClick: () => {handleLanguageSelect('en')}})
            ms.push({id: 'zh', name: '中文', onClick: () => {handleLanguageSelect('zh')}})
            ms.push({name: 'Logout', onClick: () => {
                googleLogout();
                Cookies.set(JWT_COOKIE, "");
                Cookies.set(ACCOUNT_COOKIE, "");
                dispatch(setSignedInUser());
                dispatch(setCart())
                navigate("/")
            }})
            setMenus(ms);
        }
    }, [categories])

    return <Box onClick={onToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Logo
      </Typography>
      <Divider />
      <List>
        {menus && menus.map((item) => (
            <ListItemButton sx={{ textAlign: 'left' }} key={item.name} disablePadding onClick={item.onClick}
                selected={item.name == category.name || item.id == lang}
            >
              <ListItemText primary={t(item.name)} />
            </ListItemButton>
        ))}
      </List>
    </Box>
}