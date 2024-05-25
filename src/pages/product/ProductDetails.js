
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Grid } from "@mui/material";

import Button from "../../components/common/Button";
// import VField from "../../components/VField";

// import { selectSignedInUser } from "../../redux/auth/auth.selector";
import { selectProduct } from "../../redux/product/product.selector";
import { setProduct } from "../../redux/product/product.slice";
// import { selectSnackbar } from "../../redux/ui/ui.selector";
import { setSnackbar } from "../../redux/ui/ui.slice";

import { productAPI } from "../../services/productAPI";
import PageContainer from "../../components/PageContainer";


export default function ProductDetails() {
  const product = useSelector(selectProduct);
  // const signedInUser = useSelector(selectSignedInUser);
  // const snackbar = useSelector(selectSnackbar);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState();

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
          <div>{product.name}</div>
          <div>{product.price}</div>
          <div>{product.description}</div>
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
