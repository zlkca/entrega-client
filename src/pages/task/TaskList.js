
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGridApiRef } from "@mui/x-data-grid";
import { Box, Button, Grid, Card } from "@mui/material";

import { setTask } from "../../redux/task/task.slice";
import { selectTasks } from "../../redux/task/task.selector";
import { setTasks } from "../../redux/task/task.slice";
import { setSignedInUser } from "../../redux/auth/auth.slice";
// import { setSnackbar } from "../../redux/ui/ui.slice";
import { selectSnackbar } from "../../redux/ui/ui.selector";
import { selectSignedInUser } from "../../redux/auth/auth.selector";

import Footer from "../../layouts/Footer";

import { taskAPI } from "../../services/taskAPI";
import PageContainer from "../../layouts/PageContainer";
import GridTable from "../../components/common/GridTable";

const GridCfg = { RowsPerPage: 20 };

export default function TaskListPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const gridApiRef = useGridApiRef();
    
    const tasks = useSelector(selectTasks);
    const signedInUser = useSelector(selectSignedInUser);
    const [selectedRow, setSelectedRow] = useState();
    const snackbar = useSelector(selectSnackbar);

    const columns = [
        { headerName: t("Name"), field: "name", minWidth: 200, flex: 1 },
        { headerName: t("Notes"), field: "notes", minWidth: 200, flex: 1 },
        { headerName: t("Status"), field: "status", minWidth: 200, flex: 1 },
        { headerName: t("PlanStartAt"), field: "planStartAt", minWidth: 200, flex: 1 },
        { headerName: t("PlanEndAt"), field: "planEndAt", minWidth: 200, flex: 1 },
        { headerName: t("StartAt"), field: "startAt", minWidth: 200, flex: 1 },
        { headerName: t("EndAt"), field: "endAt", minWidth: 200, flex: 1 },
        { headerName: t("CreatedAt"), field: "createdAt", minWidth: 200, flex: 1 },
        { headerName: t("UpdatedAt"), field: "updatedAt", minWidth: 200, flex: 1 },
        // { headerName: t("Actions"),
        //     field: "_id",
        //     minWidth: 180,
        //     renderCell: (params) => {
        //         return (
        //         <CellButton
        //             onClick={() => {
        //             dispatch(setTask(params.row));
        //             const taskId = params.row._id;
        //             navigate("/tasks/" + taskId);
        //             }}
        //         >
        //             {t("View Details")}
        //         </CellButton>
        //         );
        //     },
        // }
    ];

    const handleCreate = () => {
        dispatch(setTask());
        navigate("/tasks/new/form");
    };

    const handleSelectRow = (row) => {
        setSelectedRow(row);
    };

    useEffect(() => {
        if (signedInUser) {
          taskAPI.searchTasks({}).then((r) => {
            if (r.status == 200) {
              dispatch(setTasks(r.data));
            } else if (r.status === 401) {
              dispatch(setSignedInUser());
            }
          });
        }
    }, [signedInUser]);

    return (
        <PageContainer>
            <Box pt={1} pb={3}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                <Card>
                    {/* <CardHead title={t("Tasks")} /> */}
                    <Box pt={2} px={2} style={{ height: 1240 }}>
                        <Grid container display="flex" justifyContent={"flex-start"}>
                            <Grid item xs={2} md={9}>
                                <Grid container spacing={2} direction="row" justifyContent="flex-end">
                                    <Grid item>
                                    <Button color="info" variant={"outlined"} size="small" onClick={handleCreate}>
                                        {t("Create")}
                                    </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box pt={0} px={0} style={{ height: 1000, marginTop: 20 }}>
                            <GridTable
                                autoPageSize
                                apiRef={gridApiRef}
                                data={tasks}
                                columns={columns}
                                onRowClick={handleSelectRow}
                                rowsPerPage={GridCfg.RowsPerPage}
                                sortModel={[{ field: "created", sort: "desc" }]}
                            />
                        </Box>
                    </Box>
                </Card>
                </Grid>
            </Grid>
            </Box>
            {/* <MDSnackbar
            {...snackbar}
            title=""
            datetime=""
            icon="check"
            autoHideDuration={3000}
            close={() => dispatch(setSnackbar({ ...snackbar, open: false }))}
            onClose={() => dispatch(setSnackbar({ ...snackbar, open: false }))}
            /> */}
            <Footer />
        </PageContainer>
    );
}
