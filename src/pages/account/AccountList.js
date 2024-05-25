
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGridApiRef } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { setAccount } from "../../redux/account/account.slice";
import { selectAccounts } from "../../redux/account/account.selector";
import { setAccounts } from "../../redux/account/account.slice";
import { setSignedInUser } from "redux/auth/auth.slice";
import { setSnackbar } from "redux/ui/ui.slice";
import { selectSnackbar } from "redux/ui/ui.selector";
import { selectSignedInUser } from "redux/auth/auth.selector";

import GridTable from "../../components/common/GridTable";
import CellButton from "components/common/CellButton";
import MDSnackbar from "components/MDSnackbar";
import MDBox from "components/MDBox";
import CardHead from "components/CardHead";
import MDButton from "components/MDButton";
import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/DashboardNavbar";
import Footer from "layouts/Footer";

import { accountAPI } from "../../services/accountAPI";

const GridCfg = { RowsPerPage: 20 };

export default function AccountListPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const gridApiRef = useGridApiRef();
    
    const accounts = useSelector(selectAccounts);
    const signedInUser = useSelector(selectSignedInUser);
    const [selectedRow, setSelectedRow] = useState();
    const snackbar = useSelector(selectSnackbar);

    const columns = [
        { headerName: t("Username"), field: "username", minWidth: 200, flex: 1 },
        { headerName: t("Email"), field: "email", minWidth: 200, flex: 1 },
        { headerName: t("Phone"), field: "phone", minWidth: 200, flex: 1 },
        { headerName: t("Portrait"), field: "portrait", minWidth: 200, flex: 1 },
        { headerName: t("Password"), field: "password", minWidth: 200, flex: 1 },
        { headerName: t("Role"), field: "role", minWidth: 200, flex: 1 },
        { headerName: t("Status"), field: "status", minWidth: 200, flex: 1 },
        { headerName: t("Created"), field: "created", minWidth: 200, flex: 1 },
        { headerName: t("Updated"), field: "updated", minWidth: 200, flex: 1 },
        { headerName: t("Actions"),
            field: "_id",
            minWidth: 180,
            renderCell: (params) => {
                return (
                <CellButton
                    onClick={() => {
                    dispatch(setAccount(params.row));
                    const accountId = params.row._id;
                    navigate("/accounts/" + accountId);
                    }}
                >
                    {t("View Details")}
                </CellButton>
                );
            },
        }
    ];

    const handleCreate = () => {
        dispatch(setAccount());
        navigate("/accounts/new/form");
    };

    const handleSelectRow = (row) => {
        setSelectedRow(row);
    };

    useEffect(() => {
        if (signedInUser) {
          accountAPI.searchAccounts({}).then((r) => {
            if (r.status == 200) {
              dispatch(setAccounts(r.data));
            } else if (r.status === 401) {
              dispatch(setSignedInUser());
            }
          });
        }
    }, [signedInUser]);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={1} pb={3}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                <Card>
                    <CardHead title={t("Accounts")} />
                    <MDBox pt={2} px={2} style={{ height: 1240 }}>
                        <Grid container display="flex" justifyContent={"flex-start"}>
                            <Grid item xs={2} md={9}>
                                <Grid container spacing={2} direction="row" justifyContent="flex-end">
                                    <Grid item>
                                    <MDButton color="info" variant={"outlined"} size="small" onClick={handleCreate}>
                                        {t("Create")}
                                    </MDButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <MDBox pt={0} px={0} style={{ height: 1000, marginTop: 20 }}>
                            <GridTable
                                autoPageSize
                                apiRef={gridApiRef}
                                data={accounts}
                                columns={columns}
                                onRowClick={handleSelectRow}
                                rowsPerPage={GridCfg.RowsPerPage}
                                sortModel={[{ field: "created", sort: "desc" }]}
                            />
                        </MDBox>
                    </MDBox>
                </Card>
                </Grid>
            </Grid>
            </MDBox>
            <MDSnackbar
            {...snackbar}
            title=""
            datetime=""
            icon="check"
            autoHideDuration={3000}
            close={() => dispatch(setSnackbar({ ...snackbar, open: false }))}
            onClose={() => dispatch(setSnackbar({ ...snackbar, open: false }))}
            />
            <Footer />
        </DashboardLayout>
    );
}
