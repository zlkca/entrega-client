
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { selectCart } from "../../redux/cart/cart.selector";
// import { setCart } from "../../redux/cart/cart.slice";
// import { setSnackbar } from "../../redux/ui/ui.slice";
// import { selectSignedInUser } from "redux/auth/auth.selector";

import { cartAPI } from "../../services/cartAPI";
import CartItemList from "../../components/cart/CartItemList";
import { selectProducts } from "../../redux/product/product.selector";

export default function CartFormPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
  
    const [error, setError] = useState({});
    const [data, setData] = useState();
  
    // const signedInUser = useSelector(selectSignedInUser);
    const cart = useSelector(selectCart);
    const products = useSelector(selectProducts);

    useEffect(() => {
      if (cart) {
        setData({ ...cart });
      } else {
        if (params && params.id && params.id !== "new") {
          if (!cart) {
            // refetch if page refreshed
            cartAPI.fetchCart(params.id).then((r) => {
              if (r.status === 200) {
                setData({ ...r.data });
              }
            });
          }
        }
      }
    }, [cart]);
  
    
    const validate = (d) => {
        
            if (!d.client) {
                alert(t("Client is required"));
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
            
            if (!d.total) {
                alert(t("Total is required"));
                return false;
            }
            
        return true;
    };
    
    
          const handleClientChange = (event) => {
              const a = { ...data, client: event.target.value };
              setData(a);
          };
    
          const handleItemsChange = (event) => {
              const a = { ...data, items: event.target.value };
              setData(a);
          };
    
          const handleAmountChange = (event) => {
              const a = { ...data, amount: event.target.value };
              setData(a);
          };
    
          const handleTotalChange = (event) => {
              const a = { ...data, total: event.target.value };
              setData(a);
          };
  
    // const handleSubmit = () => {
    //   const d = {
    //     ...data,
    //     creator: {
    //       _id: signedInUser._id,
    //       username: signedInUser.username,
    //     },
    //   };
  
    //   if(!validate(d)) return;
  
    //   if (d._id) {
    //     cartAPI.updateCart(d._id, d).then((r) => {
    //       if (r.status === 200) {
    //         dispatch(setCart(r.data));
    //         dispatch(
    //           setSnackbar({
    //             color: "success",
    //             icon: "check",
    //             title: "",
    //             content: t("Updated Successfully!"),
    //             open: true,
    //           })
    //         );
    //         navigate("/carts");
    //       }
    //     });
    //   } else {
    //     cartAPI
    //       .createCart({
    //         ...d
    //       })
    //       .then((r) => {
    //         if (r.status === 200) {
    //           dispatch(setCart(r.data));
    //           dispatch(
    //             setSnackbar({
    //               color: "success",
    //               icon: "check",
    //               title: "",
    //               content: t("Created Successfully!"),
    //               open: true,
    //             })
    //           );
    //           navigate("/carts");
    //         }
    //       });
    //   }
    // };
  
    return (
      <CartItemList cart={cart} products={products} />
    );
  }
