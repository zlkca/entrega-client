
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";


import { selectAccount } from "../../redux/account/account.selector";
import { setAccount } from "../../redux/account/account.slice";
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
import { accountAPI } from "../../services/accountAPI";

export default function AccountFormPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
  
    const [error, setError] = useState({});
    const [data, setData] = useState();
  
    const signedInUser = useSelector(selectSignedInUser);
    const account = useSelector(selectAccount);
  
    useEffect(() => {
      if (account) {
        setData({ ...account });
      } else {
        if (params && params.id && params.id !== "new") {
          if (!account) {
            // refetch if page refreshed
            accountAPI.fetchAccount(params.id).then((r) => {
              if (r.status === 200) {
                setData({ ...r.data });
              }
            });
          }
        }
      }
    }, [account]);
  
    
    const validate = (d) => {
        
            if (!d.username) {
                alert(t("Username is required"));
                return false;
            }
            
            if (!d.email) {
                alert(t("Email is required"));
                return false;
            }
            
            if (!d.phone) {
                alert(t("Phone is required"));
                return false;
            }
            
            if (!d.portrait) {
                alert(t("Portrait is required"));
                return false;
            }
            
            if (!d.password) {
                alert(t("Password is required"));
                return false;
            }
            
            if (!d.role) {
                alert(t("Role is required"));
                return false;
            }
            
            if (!d.status) {
                alert(t("Status is required"));
                return false;
            }
            
        return true;
    };
    
    
          const handleUsernameChange = (event) => {
              const a = { ...data, username: event.target.value };
              setData(a);
          };
    
          const handleEmailChange = (event) => {
              const a = { ...data, email: event.target.value };
              setData(a);
          };
    
          const handlePhoneChange = (event) => {
              const a = { ...data, phone: event.target.value };
              setData(a);
          };
    
          const handlePortraitChange = (event) => {
              const a = { ...data, portrait: event.target.value };
              setData(a);
          };
    
          const handlePasswordChange = (event) => {
              const a = { ...data, password: event.target.value };
              setData(a);
          };
    
          const handleRoleChange = (event) => {
              const a = { ...data, role: event.target.value };
              setData(a);
          };
    
          const handleStatusChange = (event) => {
              const a = { ...data, status: event.target.value };
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
        accountAPI.updateAccount(d._id, d).then((r) => {
          if (r.status === 200) {
            dispatch(setAccount(r.data));
            dispatch(
              setSnackbar({
                color: "success",
                icon: "check",
                title: "",
                content: t("Updated Successfully!"),
                open: true,
              })
            );
            navigate("/accounts");
          }
        });
      } else {
        accountAPI
          .createAccount({
            ...d
          })
          .then((r) => {
            if (r.status === 200) {
              dispatch(setAccount(r.data));
              dispatch(
                setSnackbar({
                  color: "success",
                  icon: "check",
                  title: "",
                  content: t("Created Successfully!"),
                  open: true,
                })
              );
              navigate("/accounts");
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
                        label={t("username")}
                        value={data && data.username ? data.username : ""}
                        onChange={handleUsernameChange}
                        helperText={error && error.username ? error.username : ""}
                    />
                </Grid>
            </Grid>
            
            <Grid container xs={12} display="flex" pt={2} spacing={2}>
                <Grid item xs={6} sm={3}>
                    <MDInput
                        label={t("email")}
                        value={data && data.email ? data.email : ""}
                        onChange={handleEmailChange}
                        helperText={error && error.email ? error.email : ""}
                    />
                </Grid>
            </Grid>
            
            <Grid container xs={12} display="flex" pt={2} spacing={2}>
                <Grid item xs={6} sm={3}>
                    <MDInput
                        label={t("phone")}
                        value={data && data.phone ? data.phone : ""}
                        onChange={handlePhoneChange}
                        helperText={error && error.phone ? error.phone : ""}
                    />
                </Grid>
            </Grid>
            
            <Grid container xs={12} display="flex" pt={2} spacing={2}>
                <Grid item xs={6} sm={3}>
                    <MDInput
                        label={t("portrait")}
                        value={data && data.portrait ? data.portrait : ""}
                        onChange={handlePortraitChange}
                        helperText={error && error.portrait ? error.portrait : ""}
                    />
                </Grid>
            </Grid>
            
            <Grid container xs={12} display="flex" pt={2} spacing={2}>
                <Grid item xs={6} sm={3}>
                    <MDInput
                        label={t("password")}
                        value={data && data.password ? data.password : ""}
                        onChange={handlePasswordChange}
                        helperText={error && error.password ? error.password : ""}
                    />
                </Grid>
            </Grid>
            
            <Grid container xs={12} display="flex" pt={2} spacing={2}>
                <Grid item xs={6} sm={3}>
                    <MDInput
                        label={t("role")}
                        value={data && data.role ? data.role : ""}
                        onChange={handleRoleChange}
                        helperText={error && error.role ? error.role : ""}
                    />
                </Grid>
            </Grid>
            
            <Grid container xs={12} display="flex" pt={2} spacing={2}>
                <Grid item xs={6} sm={3}>
                    <MDInput
                        label={t("status")}
                        value={data && data.status ? data.status : ""}
                        onChange={handleStatusChange}
                        helperText={error && error.status ? error.status : ""}
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
