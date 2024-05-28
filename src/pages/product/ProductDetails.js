
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Card, Grid } from "@mui/material";

import Button from "../../components/common/Button";
// import VField from "../../components/VField";

// import { selectSignedInUser } from "../../redux/auth/auth.selector";
import { selectProduct } from "../../redux/product/product.selector";
import { setProduct } from "../../redux/product/product.slice";
// import { selectSnackbar } from "../../redux/ui/ui.selector";
import { setSnackbar } from "../../redux/ui/ui.slice";

import { productAPI } from "../../services/productAPI";
import PageContainer from "../../components/PageContainer";
import HorizontalImageViewer from "../../components/HorizontalImageViewer";
import { getDiscount } from "../utils";

export default function ProductDetails() {
  const product = useSelector(selectProduct);
  // const signedInUser = useSelector(selectSignedInUser);
  // const snackbar = useSelector(selectSnackbar);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState();
  const [discount, setDiscount] = useState({amount:0, rate:0});



  useEffect(() => {
    if (product) {
      setData({ ...product });
    } else {
      if (params && params.id && params.id !== "new") {
        if (!data) {
            productAPI.fetchProduct(params.id).then((r) => {
              setData({ ...r.data });
            });
        }
      }
    }
  }, [params]);

  useEffect(() => {
    if(data){
      const amount = getDiscount(data.discount, data.price);
      const rate = Math.floor((discount)*100/data.price);
      setDiscount({amount, rate});
    }
  }, [data]);

  const handleEdit = () => {
    if (data) {
      const _id = data._id;
      productAPI.fetchProduct(_id).then((r) => {
        if (r.status === 200) {
          dispatch(setProduct(r.data));
          navigate("/products/_id/form");
        }
      });
    }
  };

  const handleDelete = () => {
    if (data) {
      const _id = data._id;
      productAPI.deleteProduct(_id).then((r) => {
        if (r.status === 200) {
          dispatch(
            setSnackbar({
              color: "success",
              icon: "check",
              title: "",
              content: "Deleted Successfully!",
              open: true,
            })
          );
          navigate("/products");
        }
      });
    }
  };

  return (
      <PageContainer>
        <Grid container>
        <Grid item xs={12} md={6}>

        <HorizontalImageViewer images={product.pictures}/>
        </Grid>
        <Grid item xs={12} md={6} px={1}>
          <div style={{fontSize:30, fontWeight:700}}>{product.name}</div>
          <div>{product.description}</div>
          <div>In stock</div>
          <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-start">
                    <span style={{fontSize: 14}}>$</span>
                    <span style={{fontSize: 24, fontWeight:400}}>{product.price - discount.amount}</span>
                    {
                        discount.amount !== 0 &&
                        <span style={{paddingTop:5, paddingLeft:5, fontSize: 13, fontWeight:400, color: '#555', textDecorationLine:'line-through'}}>&nbsp;${product.price}</span>
                    }
                    {
                        discount.rate > 30 &&
                        <span style={{paddingTop:5, paddingLeft:5, fontSize: 13, fontWeight:400, color: '#555'}}>{` (${discount.rate}% off)`}</span>
                    }
                </Box>
            </Grid>
            
            <Grid item xs={12} px={1}>
                <Box display="flex" justifyContent="flex-start">
                    <Button variant="contained" size="small" style={{fontSize:10, height:34, marginRight:5}}>Add to cart</Button>
                </Box>
            </Grid>
            <Grid item xs={12} px={1} pt={1}>
                <Box display="flex" justifyContent="flex-start">
                    <span style={{color: '0f1111', fontSize:13, fontWeight:700, paddingTop:6}}>1 in cart - </span>
                    <span style={{color: '0f1111', fontSize:13, fontWeight:700, paddingTop:6, textDecorationLine: 'underline'}}>Remove</span>
                </Box>
            </Grid>
        </Grid>
        </Grid>
            {/* <VField label={t("Name")} value={data.name} />
            
            <VField label={t("Description")} value={data.description} />
            
            <VField label={t("Sku")} value={data.SKU} />
            
            <VField label={t("Pictures")} value={data.pictures} />
            
            <VField label={t("Price")} value={data.price} />
            
            <VField label={t("Status")} value={data.status} />
            
            <VField label={t("Creator")} value={data.creator} />
            
            <VField label={t("Created")} value={data.created} />
            
            <VField label={t("Updated")} value={data.updated} /> */}

            <Grid display="flex" justifyContent="flex-end" xs={12} px={2} py={2}>
                  <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
                    {t("Back")}
                  </Button>
                </Grid>
      </PageContainer>
  )
}
