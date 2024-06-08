
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Button } from "@mui/material";
import Grid from "../../components/common/Grid";
import TopBar from "../../components/TopBar";

import { selectCart } from "../../redux/cart/cart.selector";
// import { setCart } from "../../redux/cart/cart.slice";
// import { setSnackbar } from "../../redux/ui/ui.slice";
// import { selectSignedInUser } from "redux/auth/auth.selector";

import { cartAPI } from "../../services/cartAPI";
import { orderAPI } from "../../services/orderAPI";
import CartItemList from "../../components/cart/CartItemList";
import { selectProducts } from "../../redux/product/product.selector";

import { genOrderNumber, getCartSubTotal } from "../utils";
import { setSnackbar } from "../../redux/ui/ui.slice";
import { setCart } from "../../redux/cart/cart.slice";
import { selectSignedInUser } from "../../redux/auth/auth.selector";

export default function CartFormPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [error, setError] = useState({});
  const [data, setData] = useState();

  const signedInUser = useSelector(selectSignedInUser);
  const cart = useSelector(selectCart);
  const products = useSelector(selectProducts);

  useEffect(() => {
    if (cart) {
      setData([...cart]);
    } else {
      if (params && params.id && params.id !== "new") {
        if (!cart) {
          // refetch if page refreshed
          cartAPI.fetchCart(params.id).then((r) => {
            if (r.status === 200) {
              setData([...r.data]);
            }
          });
        }
      }
    }
  }, [cart]);


  const validate = (d) => {

    if (!d.client) {
      // alert(t("Client is required"));
      navigate("/login")
      return false;
    }

    if (!d.items) {
      alert(t("Items is required"));
      return false;
    }

    if (!d.amount) {
      alert(t("Amount is required"));
      return false;
    }

    return true;
  };



  const toOrderPayload = (data) => {
    // const { id, notes, client, sales, creator, amount, taxOpt, items } = req.body;
    const amount = getCartSubTotal(cart);
    return {
      id: genOrderNumber(),
      amount,
      taxOpt: 'excluded',
      notes: '',
      client: signedInUser,
      creator: signedInUser,
      items: data
    }
  }

  const handleSubmit = () => {
    const d = toOrderPayload(data)

    if (!validate(d)) return;

    if (data._id) {
      orderAPI.updateOrder(data._id, d).then((r) => {
        if (r.status === 200) {
          dispatch(setCart());
          dispatch(
            setSnackbar({
              color: "success",
              icon: "check",
              title: "",
              content: t("Updated Order Successfully!"),
              open: true,
            })
          );
          navigate("/products");
        }
      });
    } else {
      orderAPI
        .createOrder(d)
        .then((r) => {
          if (r.status === 200) {
            dispatch(setCart());
            dispatch(
              setSnackbar({
                color: "success",
                icon: "check",
                title: "",
                content: t("Created Order Successfully!"),
                open: true,
              })
            );
            navigate("/products");
          }
        });
    }
  };

  return (
    <div>
      <TopBar />
      <Grid container pt={12}>
        {
          cart && cart.length > 0 ?
            <Grid px={1}>
              <CartItemList cart={cart} products={products} />
              <Button fullWidth variant={"contained"} onClick={handleSubmit}>{t("Submit")}</Button>
            </Grid>
            :
            <Grid px={1}>
              <Box xs={12} style={{fontSize:24}} pt={10}>{t("Your cart is empty")}</Box>
              <Button variant={"contained"} onClick={() => navigate("/products")}>{t("Continue Shopping")}</Button>
            </Grid>
        }
      </Grid>
    </div>
  );
}
