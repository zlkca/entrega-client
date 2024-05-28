import Grid from "../common/Grid";
import Box from "../common/Box";
import Button from "../common/Button";
import QuantityInput from "../QuantityInput";

import { DefaultProductPicture } from "../../const";
import { getDiscount } from "../../pages/utils";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../redux/cart/cart.slice";
import { selectCart } from "../../redux/cart/cart.selector";
import { Divider } from "@mui/material";
const styles = {
    cartText:{
        color: '0f1111', fontSize:13, fontWeight:700, paddingTop:6,
    }
}

function CartItem({ item, quantity }) {
    const dispatch = useDispatch();
    const discount = getDiscount(item.discount, item.price);
    // const discountRate = Math.floor((discount)*100/item.price);

    const handleQuantityChange = (quantityDelta) => {
        dispatch(updateCart({quantityDelta, product:item}));
    }

    return (
        <Grid container xs={12} py={1}>
            <Grid item xs={5} px={1}>
                <img style={{ width: "100%", aspectRatio: "4/3", objectFit: "contain" }} src={item.pictures && item.pictures.length > 0 ? `${item.pictures[0].url}` : DefaultProductPicture} />
            </Grid>
            <Grid item xs={7} px={1}>
                <Box xs={12} display="flex" justifyContent="flex-start" style={{color: '0f1111', fontSize:16}}>
                    {item.name}
                </Box>

                <Box xs={12} display="flex" justifyContent="flex-start" pt={1}>
                    <QuantityInput val={quantity} onChange={handleQuantityChange}/>
                    <Box flexGrow={1} />
                    <Box xs={5} display="flex" justifyContent="flex-end" pr={2}>
                        <span style={{fontSize: 22}}>$</span>
                        <span style={{fontSize: 22, fontWeight:400}}>{item.price - discount}</span>
                    </Box>
                </Box>

            </Grid>
        </Grid>
    )
}

export default function CartItemList({cart}) {
    const getSubTotal = (cart) => {
        let sub = 0
        cart.map(it => sub += it.quantity * (it.product.price - getDiscount(it.product.discount, it.product.price)));
        return sub;
    }
    return (
        <Grid container>
            {
                cart && cart.length > 0 &&
                cart.map(it =>
                    <Grid item xs={12}>
                        <CartItem item={it.product} quantity={it.quantity}/>
                    </Grid>
                )
            }
            <Divider />
            <Grid item xs={12} display="flex" style={{fontSize: 22, fontWeight:600}}>
                <Box flexGrow={1} pl={2}>SUBTOTAL</Box>
                <Box xs={4} pr={2}>${getSubTotal(cart)}</Box>
            </Grid>
        </Grid>
    )
}

