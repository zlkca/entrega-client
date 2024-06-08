
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import { productAPI } from "../../services/productAPI";
import PageContainer from "../../components/PageContainer";
import TopBar from "../../components/TopBar";
import { selectCart } from "../../redux/cart/cart.selector";
import { selectCategory } from "../../redux/category/category.selector";
import ProductGrid from "../../components/product/ProductGrid";
import { setProduct } from "../../redux/product/product.slice";
import { Box, Divider, Grid } from "@mui/material";


export default function ProductGridPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const cart = useSelector(selectCart);
    const category = useSelector(selectCategory);

    const [selected, setSelected] = useState();
    const [products, setProducts] = useState([]);

    function handleSelect(product) {
        setSelected(product)
        dispatch(setProduct(product))
        navigate(`/products/${product._id}`)
    }

    useEffect(() => {
        if (category) {
            productAPI.searchProducts({ 'category._id': category._id }).then((r) => {
                if (r.status == 200) {
                    setProducts(r.data);
                }
            });
        }
    }, [category]);

    return (
        <div>
            <TopBar />
            <PageContainer>
                {/* <TopBar /> */}
                <Grid container xs={12} sm={12} md={12}>
                    {category &&
                        <Grid item xs={12} px={1} style={{ fontSize: 24, fontWeight: 700 }}>
                            <Box sx={12}>{t(category.name)}</Box>
                            <Box sx={12}><Divider /></Box>
                        </Grid>
                    }
                    {
                        products &&
                        <ProductGrid data={products} onSelect={handleSelect} />
                    }
                </Grid>
            </PageContainer>
        </div>
    );
}
