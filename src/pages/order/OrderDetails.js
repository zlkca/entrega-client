
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Grid } from "@mui/material";

import CardHead from "components/CardHead";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDSection from "components/MDSection";
import MDSnackbar from "components/MDSnackbar";
import VField from "components/VField";

import { ActionButton } from "components/common/Button";

import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/DashboardNavbar";
import Footer from "layouts/Footer";

import { selectSignedInUser } from "redux/auth/auth.selector";
import { setSignedInUser } from "redux/auth/auth.slice";
import { selectOrder } from "../../redux/order/order.selector";
import { setOrder } from "../../redux/order/order.slice";
import { selectSnackbar } from "redux/ui/ui.selector";
import { setSnackbar } from "redux/ui/ui.slice";

import { orderAPI } from "../../services/orderAPI";


export default function OrderDetails() {
  const order = useSelector(selectOrder);
  const signedInUser = useSelector(selectSignedInUser);
  const snackbar = useSelector(selectSnackbar);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    if (order) {
      setData({ ...order });
    } else {
      if (params && params.id && params.id !== "new") {
        if (!data) {
            orderAPI.fetchOrder(params.id).then((r) => {
              setData({ ...r.data });
            });
        }
      }
    }
  }, [params]);

  const handleEdit = () => {
    if (data) {
      const _id = data._id;
      orderAPI.fetchOrder(_id).then((r) => {
        if (r.status === 200) {
          dispatch(setOrder(r.data));
          navigate("/orders/_id/form");
        }
      });
    }
  };

  const handleDelete = () => {
    if (data) {
      const _id = data._id;
      orderAPI.deleteOrder(_id).then((r) => {
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
          navigate("/orders");
        }
      });
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={1} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            {order && (
              <Card>
                <CardHead title={t("Order")} />
                <Grid container spacing={2} direction="row" justifyContent="flex-end" px={2} pt={2}>
                    <Grid item>
                      <ActionButton onClick={handleEdit}>
                        {t("Edit")}
                      </ActionButton>
                    </Grid>
                    <Grid item>
                      <ActionButton onClick={handleDelete}>
                        {t("Delete")}
                      </ActionButton>
                    </Grid>
                </Grid>

                <MDSection title={t("Orders")}>
                  <Grid display="flex">
                    
            <VField label={t("Client")} value={data.client} />
            
            <VField label={t("Items")} value={data.items} />
            
            <VField label={t("Amount")} value={data.amount} />
            
            <VField label={t("Total")} value={data.total} />
            
            <VField label={t("Notes")} value={data.notes} />
            
            <VField label={t("Created")} value={data.created} />
            
            <VField label={t("Updated")} value={data.updated} />
            
                  </Grid>
                </MDSection>

                <Grid display="flex" justifyContent="flex-end" xs={12} px={2} py={2}>
                  <MDButton variant="outlined" color="secondary" onClick={() => navigate(-1)}>
                    {t("Back")}
                  </MDButton>
                </Grid>
              </Card>
            )}
          </Grid>
        </Grid>
      </MDBox>
      {snackbar && (
        <MDSnackbar
          {...snackbar}
          title=""
          datetime=""
          icon="check"
          autoHideDuration={3000}
          close={() => dispatch(setSnackbar({ ...snackbar, open: false }))}
          onClose={() => dispatch(setSnackbar({ ...snackbar, open: false }))}
        />
      )}
      <Footer />
    </DashboardLayout>
  );
}
    