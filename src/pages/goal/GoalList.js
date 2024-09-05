import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";

import { setGoal } from "../../redux/goal/goal.slice";
import { selectGoals } from "../../redux/goal/goal.selector";
import { setGoals } from "../../redux/goal/goal.slice";
import Footer from "../../layouts/Footer";

import { goalAPI } from "../../services/goalAPI";
import PageContainer from "../../layouts/PageContainer";
import AlertDialog from "../../components/common/AlertDialog";
import { USERID_COOKIE } from "../../const";
import {
  DeleteIconButton,
  EditIconButton,
} from "../../components/common/IconButton";

const styles = {
  row: {
    padding: "20px",
    borderBottom: "1px solid #666",
  },
};
export default function GoalListPage() {
  const userId = localStorage.getItem(USERID_COOKIE);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  // const {categoryId} = useParams();

  const goals = useSelector(selectGoals);
  // const signedInUser = useSelector(selectSignedInUser);
  const [selectedRow, setSelectedRow] = useState();
  const [delDialogOpen, setDelDialogOpen] = useState(false);
  // const snackbar = useSelector(selectSnackbar);

  const handleCreate = () => {
    dispatch(setGoal());
    navigate("/goals/new/form");
  };

  // const handleSelectRow = (row) => {
  //     setSelectedRow(row);
  // };

  useEffect(() => {
    if (userId) {
      goalAPI.fetchGoals().then((r) => {
        console.log(r);
        if (r && r.data && r.data.length > 0) {
          dispatch(setGoals(r.data));
        }
      });
    } else {
      navigate("/signin");
    }
  }, [userId, dispatch]);

  // useEffect(() => {
  //     if (categoryId) {
  //       goals.filter(it => it.category === categoryId)
  //     }
  // }, [categoryId]);

  const handleEdit = (row) => {
    dispatch(setGoal(row));
    const id = `${row.userId}-${row.createdAt}`;
    navigate("/goals/" + id + "/form");
  };

  const handleDelete = (it) => {
    setSelectedRow(it);
    setDelDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setDelDialogOpen(false);
    const id = `${selectedRow.userId}-${selectedRow.createdAt}`;
    goalAPI.deleteGoal(id).then((r) => {
      console.log(r);
      dispatch(
        setGoals(
          goals.filter(
            (it) =>
              !(
                it.userId === selectedRow.userId &&
                it.createdAt === selectedRow.createdAt
              )
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

  return (
    <PageContainer>
      <Box pt={1} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            {/* <CardHead title={t("Goals")} /> */}
            {userId ? (
              <Box pt={2} px={2} style={{ height: 1240 }}>
                <Grid container display="flex" justifyContent={"flex-start"}>
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
                  {/* <GridTable
                                autoPageSize
                                apiRef={gridApiRef}
                                data={goals}
                                columns={columns}
                                onRowClick={handleSelectRow}
                                rowsPerPage={GridCfg.RowsPerPage}
                                sortModel={[{ field: "created", sort: "desc" }]}
                            /> */}
                  {goals.map((it) => {
                    return (
                      <Grid
                        style={styles.row}
                        key={it.name}
                        container
                        display="flex"
                        justifyContent="flex-start"
                      >
                        <Grid item xs={8} md={8}>
                          {it.name}
                        </Grid>
                        <Grid item xs={2} md={2}>
                          <EditIconButton onClick={() => handleEdit(it)} />
                        </Grid>
                        <Grid item xs={2} md={2}>
                          <DeleteIconButton onClick={() => handleDelete(it)} />
                        </Grid>
                      </Grid>
                    );
                  })}
                </Box>
              </Box>
            ) : (
              <Box pt={2} px={2} style={{ height: 1240 }}>
                Please <Link to={"/signin"}>login</Link> to create your goals
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
      {delDialogOpen && (
        <AlertDialog
          title="Delete Goal"
          description={`Are you sure to delete the goal ${selectedRow.name}`}
          open={delDialogOpen}
          onCancel={() => setDelDialogOpen(false)}
          onOk={handleDeleteConfirm}
        />
      )}
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
