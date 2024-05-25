
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGridApiRef } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { setCart } from "../../redux/cart/cart.slice";
import { selectCarts } from "../../redux/cart/cart.selector";
import { setCarts } from "../../redux/cart/cart.slice";
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

import { cartAPI } from "../../services/cartAPI";

const GridCfg = { RowsPerPage: 20 };

export default function CartListPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const gridApiRef = useGridApiRef();
    
    const carts = useSelector(selectCarts);
    const signedInUser = useSelector(selectSignedInUser);
    const [selectedRow, setSelectedRow] = useState();
    const snackbar = useSelector(selectSnackbar);

    const columns = [
        { headerName: t("Client"), field: "client", minWidth: 200, flex: 1 },
        { headerName: t("Items"), field: "items", minWidth: 200, flex: 1 },
        { headerName: t("Amount"), field: "amount", minWidth: 200, flex: 1 },
        { headerName: t("Total"), field: "total", minWidth: 200, flex: 1 },
        { headerName: t("Created"), field: "created", minWidth: 200, flex: 1 },
        { headerName: t("Updated"), field: "updated", minWidth: 200, flex: 1 },
        { headerName: t("Actions"),
            field: "_id",
            minWidth: 180,
            renderCell: (params) => {
                return (
                <CellButton
                    onClick={() => {
                    dispatch(setCart(params.row));
                    const cartId = params.row._id;
                    navigate("/carts/" + cartId);
                    }}
                >
                    {t("View Details")}
                </CellButton>
                );
            },
        }
    ];

    const handleCreate = () => {
        dispatch(setCart());
        navigate("/carts/new/form");
    };

    const handleSelectRow = (row) => {
        setSelectedRow(row);
    };

    useEffect(() => {
        if (signedInUser) {
          cartAPI.searchCarts({}).then((r) => {
            if (r.status == 200) {
              dispatch(setCarts(r.data));
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
                    <CardHead title={t("Carts")} />
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
                                data={carts}
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
