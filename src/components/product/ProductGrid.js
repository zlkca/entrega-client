import Grid from "../common/Grid";
import Box from "../common/Box";
import Button from "../common/Button";
import { FixedSizeList as List } from 'react-window';
import { useTranslation } from "react-i18next";
import useMediaQuery from '@mui/material/useMediaQuery';

import { DefaultProductPicture } from "../../const";
import { getDiscount } from "../../pages/utils";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../redux/cart/cart.slice";
import { selectCart } from "../../redux/cart/cart.selector";

const styles = {
    cartText: {
        color: '0f1111', fontSize: 13, fontWeight: 700, paddingTop: 6,
    }
}
function ProductGridItem({ data, cartQuantity, onSelect }) {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const discount = getDiscount(data.discount, data.price);
    const discountRate = Math.floor((discount) * 100 / data.price);

    return (
        <Grid container xs={12} py={1}>
            <div onClick={() => onSelect(data)}>
                <Grid item xs={12} px={1}>
                    <img style={{ width: "100%", aspectRatio: "4/3", objectFit: "contain" }} src={data.pictures && data.pictures.length > 0 ? `${data.pictures[0].url}` : DefaultProductPicture} />
                </Grid>
                <Grid item xs={12} px={1}>
                    <Box display="flex" justifyContent="flex-start" style={{ color: '0f1111', fontSize: 16 }}>
                        {data.name}
                    </Box>
                </Grid>
                <Grid item xs={12} px={1}>
                    <Box display="flex" justifyContent="flex-start">
                        <span style={{ fontSize: 14 }}>$</span>
                        <span style={{ fontSize: 24, fontWeight: 400 }}>{data.price - discount}</span>
                        {
                            discount !== 0 &&
                            <span style={{ paddingTop: 5, paddingLeft: 5, fontSize: 13, fontWeight: 400, color: '#555', textDecorationLine: 'line-through' }}>&nbsp;${data.price}</span>
                        }
                        {
                            discountRate > 30 &&
                            <span style={{ paddingTop: 5, paddingLeft: 5, fontSize: 13, fontWeight: 400, color: '#555' }}>{` (${discountRate}% off)`}</span>
                        }
                    </Box>
                </Grid>
            </div>
            <Grid item xs={12} px={1}>
                <Box display="flex" justifyContent="flex-start">
                    <Button
                        variant="contained"
                        size="small"
                        style={{ fontSize: 10, height: 34, marginRight: 5 }}
                        onClick={() => dispatch(updateCart({ quantityDelta: 1, product: data }))}
                    >
                        {t("Add to cart")}
                    </Button>
                </Box>
            </Grid>
            {
                cartQuantity > 0 &&
                <Grid item xs={12} px={1} pt={1}>
                    <Box display="flex" justifyContent="flex-start">
                        <span style={styles.cartText}>{`${cartQuantity} in cart - `}</span>
                        <span style={{ ...styles.cartText, textDecorationLine: 'underline' }} onClick={() => dispatch(updateCart({ quantityDelta: -cartQuantity, product: data }))}>Remove</span>
                    </Box>
                </Grid>
            }
        </Grid>
    )
}


export default function ProductGrid({ data, onSelect }) {
    const cart = useSelector(selectCart);
    const isMobile = useMediaQuery('(max-width:600px)');
    const len = data.length;
    const nMaxCols = isMobile ? 2 : 4;
    // index -- Row index
    function ProductRow({ index }) {
        console.log(index)
        
        const iStart = (index) * nMaxCols;
        const nRemain = len > iStart ? len - iStart : 0;
        const nCols = nRemain >= nMaxCols ? nMaxCols : nRemain;
        const cols = [...Array(nCols)]
        return <Grid container xs={12} key={index}>
            {
                cols.map((it, i) =>
                    <Grid item xs={6} sm={3} key={iStart + i}>
                        <ProductGridItem data={data[iStart+i]} cartQuantity={getCartQuantity(cart, data[iStart+i]._id)} onSelect={onSelect} />
                    </Grid>
                )
            }
        </Grid>

    }

    const getCartQuantity = (cart, productId) => {
        if (cart) {
            const item = cart.find(it => it.product._id == productId);
            if (item) {
                return item.quantity;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    return (
        <Grid container>
            <List
                height={850}
                width={"100%"}
                itemCount={Math.ceil(len / nMaxCols)}
                itemSize={266}
            >
                {ProductRow}
            </List>
        </Grid>
    )
}

