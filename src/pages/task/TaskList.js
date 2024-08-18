import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";

import { setTask } from "../../redux/task/task.slice";
import { taskAPI } from "../../services/taskAPI";
import Footer from "../../layouts/Footer";
import PageContainer from "../../layouts/PageContainer";
import { getDisplayTime } from "../utils";
import AlertDialog from "../../components/common/AlertDialog";
import CompleteCheck from "../../components/CompleteCheck";
import { USERID_SESSION } from "../../const";

const styles = {
  row: {
    padding: "20px",
    borderBottom: "1px solid #666",
  },
  col: {
    width: 250,
    height: "100%",
  },
};
export default function TaskListPage() {
  const userId = sessionStorage.getItem(USERID_SESSION);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  // const gridApiRef = useGridApiRef();
  const [tasks, setTasks] = useState([]);
  const [delDialogOpen, setDelDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  // const tasks = useSelector(selectTasks);
  // const signedInUser = useSelector(selectSignedInUser);
  // const snackbar = useSelector(selectSnackbar);

  // const columns = [
  //     { headerName: t("Name"), field: "name", minWidth: 200, flex: 1 },
  //     { headerName: t("Notes"), field: "notes", minWidth: 200, flex: 1 },
  //     { headerName: t("Status"), field: "status", minWidth: 200, flex: 1 },
  //     { headerName: t("PlanStartAt"), field: "planStartAt", minWidth: 200, flex: 1 },
  //     { headerName: t("PlanEndAt"), field: "planEndAt", minWidth: 200, flex: 1 },
  //     { headerName: t("StartAt"), field: "startAt", minWidth: 200, flex: 1 },
  //     { headerName: t("EndAt"), field: "endAt", minWidth: 200, flex: 1 },
  //     { headerName: t("CreatedAt"), field: "createdAt", minWidth: 200, flex: 1 },
  //     { headerName: t("UpdatedAt"), field: "updatedAt", minWidth: 200, flex: 1 },
  //     // { headerName: t("Actions"),
  //     //     field: "_id",
  //     //     minWidth: 180,
  //     //     renderCell: (params) => {
  //     //         return (
  //     //         <CellButton
  //     //             onClick={() => {
  //     //             dispatch(setTask(params.row));
  //     //             const taskId = params.row._id;
  //     //             navigate("/tasks/" + taskId);
  //     //             }}
  //     //         >
  //     //             {t("View Details")}
  //     //         </CellButton>
  //     //         );
  //     //     },
  //     // }
  // ];

  const handleCreate = () => {
    dispatch(setTask());
    navigate("/tasks/new/form");
  };

  const handleEdit = (row) => {
    dispatch(setTask(row));
    const id = `${row.userId}-${row.createdAt}`;
    navigate("/tasks/" + id + "/form");
  };

  const handleDelete = (it) => {
    setSelectedRow(it);
    setDelDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setDelDialogOpen(false);
    const id = `${selectedRow.userId}-${selectedRow.createdAt}`;
    taskAPI.deleteTask(id).then((r) => {
      console.log(r);
      setTasks(
        tasks.filter(
          (it) =>
            !(
              it.userId === selectedRow.userId &&
              it.createdAt === selectedRow.createdAt
            )
        )
      );
      // if (r.status === 200) {
      //   dispatch(
      //     setSnackbar({
      //       color: "success",
      //       icon: "check",
      //       title: "",
      //       content: t("Updated Successfully!"),
      //       open: true,
      //     })
      //   );
      //   navigate("/tasks");
      // }
    });
  };
  // const handleSelectRow = (row) => {
  //     setSelectedRow(row);
  // };
  const handleComplete = (item, e) => {
    const id = `${item.userId}-${item.createdAt}`;
    const d = {
      ...item,
      completed: e.target.checked,
      endAt: new Date().getTime(),
    };
    taskAPI.updateTask(id, d).then((r) => {
      if (r.status === 200) {
        setTasks(
          tasks.map((it) => {
            if (it.userId === item.userId && it.createdAt === item.createdAt) {
              return { ...it, completed: !e.target.checked };
            } else {
              return it;
            }
          })
        );
      }
    });
  };
  useEffect(() => {
    if (userId) {
      taskAPI.fetchTasks().then((r) => {
        console.log(r);
        if (r && r.data && r.data.length > 0) {
          setTasks(r.data);
        }
      });
    } else {
      navigate("/signin");
    }
  }, []);

  return (
    <PageContainer>
      <Box pt={1} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            {userId ? (
              <Box pt={2} px={2} style={{ height: 1240 }}>
                <Grid container display="flex" justifyContent="flex-start">
                  <Grid item xs={2} md={9}>
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      justifyContent="flex-end"
                    >
                      <Grid item>
                        <Button
                          color="info"
                          variant={"outlined"}
                          size="small"
                          onClick={handleCreate}
                        >
                          {t("Create")}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Box
                  pt={0}
                  px={0}
                  style={{
                    height: 1000,
                    marginTop: 20,
                    borderTop: "1px solid #666",
                  }}
                >
                  {tasks.map((it) => {
                    return (
                      <Grid
                        style={styles.row}
                        key={it.name}
                        container
                        display="flex"
                        justifyContent="flex-start"
                      >
                        <Grid item xs={2} md={4}>
                          {it.name}
                        </Grid>
                        <Grid item xs={2} md={4}>
                          {getDisplayTime(it.planStartAt)}
                        </Grid>
                        <Grid item xs={2} md={2} onClick={() => handleEdit(it)}>
                          Edit
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          md={2}
                          onClick={() => handleDelete(it)}
                        >
                          Delete
                        </Grid>
                        <CompleteCheck
                          checked={it.completed}
                          onChange={(e) => handleComplete(it, e)}
                        />
                      </Grid>
                    );
                  })}
                </Box>
              </Box>
            ) : (
              <Box pt={2} px={2} style={{ height: 1240 }}>
                Please <Link to={"/signin"}>login</Link> to create your tasks
              </Box>
            )}
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
      {delDialogOpen && (
        <AlertDialog
          title="Delete Task"
          description={`Are you sure to delete the task ${selectedRow.name}`}
          open={delDialogOpen}
          onCancel={() => setDelDialogOpen(false)}
          onOk={handleDeleteConfirm}
        />
      )}
      <Footer />
    </PageContainer>
  );
}
