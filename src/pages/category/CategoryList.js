import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";

import { setCategory } from "../../redux/category/category.slice";
import { selectCategories } from "../../redux/category/category.selector";
import { setCategories } from "../../redux/category/category.slice";
import Footer from "../../layouts/Footer";

import { categoryAPI } from "../../services/categoryAPI";
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
export default function CategoryListPage() {
  const userId = localStorage.getItem(USERID_COOKIE);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const categories = useSelector(selectCategories);
  // const signedInUser = useSelector(selectSignedInUser);
  const [selectedRow, setSelectedRow] = useState();
  const [delDialogOpen, setDelDialogOpen] = useState(false);
  // const snackbar = useSelector(selectSnackbar);

  const handleCreate = () => {
    dispatch(setCategory());
    navigate("/categories/new/form");
  };

  // const handleSelectRow = (row) => {
  //     setSelectedRow(row);
  // };

  useEffect(() => {
    if (userId) {
      categoryAPI.fetchCategories().then((r) => {
        console.log(r);
        if (r && r.data && r.data.length > 0) {
          dispatch(setCategories(r.data));
        }
        // else{
        //     navigate("/categories/new/form");
        // }
      });
    } else {
      navigate("/signin");
    }
  }, [userId, dispatch]);

  const handleEdit = (row) => {
    dispatch(setCategory(row));
    const id = `${row.userId}-${row.createdAt}`;
    navigate("/categories/" + id + "/form");
  };

  const handleDelete = (it) => {
    setSelectedRow(it);
    setDelDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setDelDialogOpen(false);
    const id = `${selectedRow.userId}-${selectedRow.createdAt}`;
    categoryAPI.deleteCategory(id).then((r) => {
      console.log(r);
      dispatch(
        setCategories(
          categories.filter(
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
            {/* <CardHead title={t("Categories")} /> */}
            {userId ? (
              <Box pt={2} px={2} style={{ height: 1240 }}>
                {/* <Grid container display="flex" justifyContent={"flex-start"}>
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
                </Grid> */}
                <Box
                  pt={0}
                  px={0}
                  style={{
                    height: 1000,
                    marginTop: 20,
                  }}
                >
                  <Grid xs={12} pt={2} pb={4} style={{borderBottom: "1px solid #666",}}>
                  We offer these 11 goals as examples; you can choose the ones that resonate with you. By focusing on them, you create a balanced and meaningful life. You build resilience, strengthen relationships, enhance well-being, and achieve a sense of accomplishment. Ultimately, these goals help you live a happier, more purposeful life, aligning your actions with your values and reaching your full potential.
                  </Grid>
                  {categories.map((it) => {
                    return (
                      <Grid
                        style={styles.row}
                        key={it.name}
                        container
                        display="flex"
                        justifyContent="flex-start"
                      >
                        <Grid item xs={8} md={8} style={{fontSize: 24, fontWeight: "500"}}>
                          {it.name}
                        </Grid>
                        <Grid item xs={12} md={12} style={{color: '#666'}}>
                          {it.notes}
                        </Grid>
                        {/* <Grid item xs={2} md={2}>
                          <EditIconButton onClick={() => handleEdit(it)} />
                        </Grid>
                        <Grid item xs={2} md={2}>
                          <DeleteIconButton onClick={() => handleDelete(it)} />
                        </Grid> */}
                      </Grid>
                    );
                  })}
                </Box>
              </Box>
            ) : (
              <Box pt={2} px={2} style={{ height: 1240 }}>
                Please <Link to={"/signin"}>login</Link> to create your categories
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
      {delDialogOpen && (
        <AlertDialog
          title="Delete Category"
          description={`Are you sure to delete the category ${selectedRow.name}`}
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
