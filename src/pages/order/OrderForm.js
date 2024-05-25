
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";


import { selectOrder } from "../../redux/order/order.selector";
import { setOrder } from "../../redux/order/order.slice";
import { setSignedInUser } from "../../redux/auth/auth.slice";
import { setSnackbar } from "../../redux/ui/ui.slice";
import { selectSignedInUser } from "redux/auth/auth.selector";

import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/DashboardNavbar";
import MDBox from "components/MDBox";
import CardHead from "components/CardHead";
import MDButton from "components/MDButton";
import MDSection from "components/MDSection";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import Footer from "layouts/Footer";
import { orderAPI } from "../../services/orderAPI";

export default function OrderFormPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
  
    const [error, setError] = useState({});
    const [data, setData] = useState();
  
    const signedInUser = useSelector(selectSignedInUser);
    const order = useSelector(selectOrder);
  
    useEffect(() => {
      if (order) {
        setData({ ...order });
      } else {
        if (params && params.id && params.id !== "new") {
          if (!order) {
            // refetch if page refreshed
            orderAPI.fetchOrder(params.id).then((r) => {
              if (r.status === 200) {
                setData({ ...r.data });
              }
            });
          }
        }
      }
    }, [order]);
  
    
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
            
            if (!d.notes) {
                alert(t("Notes is required"));
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
    
          const handleNotesChange = (event) => {
              const a = { ...data, notes: event.target.value };
              setData(a);
          };
  
    const handleSubmit = () => {
      const d = {
        ...data,
        creator: {
          _id: signedInUser._id,
          username: signedInUser.username,
        },
      };
  
      if(!validate(d)) return;
  
      if (d._id) {
        orderAPI.updateOrder(d._id, d).then((r) => {
          if (r.status === 200) {
            dispatch(setOrder(r.data));
            dispatch(
              setSnackbar({
                color: "success",
                icon: "check",
                title: "",
                content: t("Updated Successfully!"),
                open: true,
              })
            );
            navigate("/orders");
          }
        });
      } else {
        orderAPI
          .createOrder({
            ...d
          })
          .then((r) => {
            if (r.status === 200) {
              dispatch(setOrder(r.data));
              dispatch(
                setSnackbar({
                  color: "success",
                  icon: "check",
                  title: "",
                  content: t("Created Successfully!"),
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
              <Card>
                <CardHead title={data && data._id ? t("Edit Project") : t("Create Project")} />
  
                <MDSection title={t("Basic Info")}>
                  <Grid container xs={12} display="flex" pt={1} spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <MDTypography variant="button" fontWeight="regular" color="text">
                      </MDTypography>
                    </Grid>
                  </Grid>
                  
            <Grid container xs={12} display="flex" pt={2} spacing={2}>
                <Grid item xs={6} sm={3}>
                    <MDInput
                        label={t("client")}
                        value={data && data.client ? data.client : ""}
                        onChange={handleClientChange}
                        helperText={error && error.client ? error.client : ""}
                    />
                </Grid>
            </Grid>
            
            <Grid container xs={12} display="flex" pt={2} spacing={2}>
                <Grid item xs={6} sm={3}>
                    <MDInput
                        label={t("items")}
                        value={data && data.items ? data.items : ""}
                        onChange={handleItemsChange}
                        helperText={error && error.items ? error.items : ""}
                    />
                </Grid>
            </Grid>
            
            <Grid container xs={12} display="flex" pt={2} spacing={2}>
                <Grid item xs={6} sm={3}>
                    <MDInput
                        label={t("amount")}
                        value={data && data.amount ? data.amount : ""}
                        onChange={handleAmountChange}
                        helperText={error && error.amount ? error.amount : ""}
                    />
                </Grid>
            </Grid>
            
            <Grid container xs={12} display="flex" pt={2} spacing={2}>
                <Grid item xs={6} sm={3}>
                    <MDInput
                        label={t("total")}
                        value={data && data.total ? data.total : ""}
                        onChange={handleTotalChange}
                        helperText={error && error.total ? error.total : ""}
                    />
                </Grid>
            </Grid>
            
            <Grid container xs={12} display="flex" pt={2} spacing={2}>
                <Grid item xs={6} sm={3}>
                    <MDInput
                        label={t("notes")}
                        value={data && data.notes ? data.notes : ""}
                        onChange={handleNotesChange}
                        helperText={error && error.notes ? error.notes : ""}
                    />
                </Grid>
            </Grid>
            
                </MDSection>
  
                <Grid display="flex" justifyContent="flex-end" xs={12} px={2} py={2}>
                  <MDButton
                    color="secondary"
                    variant="outlined"
                    style={{ marginRight: 20 + "px" }}
                    onClick={() => navigate(-1)}
                  >
                    {t("Cancel")}
                  </MDButton>
                  <MDButton variant="gradient" color="info" onClick={handleSubmit}>
                    {t("Save")}
                  </MDButton>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }
