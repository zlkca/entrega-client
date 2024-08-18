import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Card,
  Grid,
} from "@mui/material";

import { selectGoal } from "../../redux/goal/goal.selector";
import { setGoal } from "../../redux/goal/goal.slice";
import { setSnackbar } from "../../redux/ui/ui.slice";
import { selectSignedInUser } from "../../redux/auth/auth.selector";

import CardHeader from "../../components/common/CardHeader";
import PageContainer from "../../layouts/PageContainer";
import Typography from "../../components/common/Typography";
import Input from "../../components/common/Input";
import Footer from "../../layouts/Footer";
import { goalAPI } from "../../services/goalAPI";

export default function GoalFormPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [error, setError] = useState({});
  const [data, setData] = useState();

  const signedInUser = useSelector(selectSignedInUser);
  const goal = useSelector(selectGoal);

  useEffect(() => {
    if (goal) {
      setData({ ...goal });
    } else {
      if (params && params.id && params.id !== "new") {
        if (!goal) {
          // refetch if page refreshed
          goalAPI.fetchGoal(params.id).then((r) => {
            if (r.status === 200) {
              setData({ ...r.data });
            }
          });
        }
      }
    }
  }, [goal]);

  const validate = (d) => {
    if (!d.name) {
      alert(t("Name is required"));
      return false;
    }

    if (!d.notes) {
      alert(t("Notes is required"));
      return false;
    }

    if (!d.status) {
      alert(t("Status is required"));
      return false;
    }

    if (!d.planStartAt) {
      alert(t("PlanStartAt is required"));
      return false;
    }

    if (!d.planEndAt) {
      alert(t("PlanEndAt is required"));
      return false;
    }

    if (!d.startAt) {
      alert(t("StartAt is required"));
      return false;
    }

    if (!d.endAt) {
      alert(t("EndAt is required"));
      return false;
    }

    if (!d.createdAt) {
      alert(t("CreatedAt is required"));
      return false;
    }

    if (!d.updatedAt) {
      alert(t("UpdatedAt is required"));
      return false;
    }

    return true;
  };

  const handleNameChange = (event) => {
    const a = { ...data, name: event.target.value };
    setData(a);
  };

  const handleNotesChange = (event) => {
    const a = { ...data, notes: event.target.value };
    setData(a);
  };

  const handleStatusChange = (event) => {
    const a = { ...data, status: event.target.value };
    setData(a);
  };

  const handlePlanStartAtChange = (event) => {
    const a = { ...data, planStartAt: event.target.value };
    setData(a);
  };

  const handlePlanEndAtChange = (event) => {
    const a = { ...data, planEndAt: event.target.value };
    setData(a);
  };

  const handleStartAtChange = (event) => {
    const a = { ...data, startAt: event.target.value };
    setData(a);
  };

  const handleEndAtChange = (event) => {
    const a = { ...data, endAt: event.target.value };
    setData(a);
  };

  const handleCreatedAtChange = (event) => {
    const a = { ...data, createdAt: event.target.value };
    setData(a);
  };

  const handleUpdatedAtChange = (event) => {
    const a = { ...data, updatedAt: event.target.value };
    setData(a);
  };

  const handleSubmit = () => {
    const d = {
      ...data,
    //   creator: {
    //     _id: signedInUser._id,
    //     username: signedInUser.username,
    //   },
    };

    // if (!validate(d)) return;
    if (d.createdAt) {
      const id = `${d.userId}-${d.createdAt}`;
      goalAPI.updateGoal(id, d).then((r) => {
        if (r.status === 200) {
          dispatch(setGoal(r.data));
          dispatch(
            setSnackbar({
              color: "success",
              icon: "check",
              title: "",
              content: t("Updated Successfully!"),
              open: true,
            })
          );
          navigate("/goals");
        }
      });
    } else {
      goalAPI
        .createGoal({
          ...d,
        })
        .then((r) => {
          if (r.status === 200) {
            dispatch(setGoal(r.data));
            dispatch(
              setSnackbar({
                color: "success",
                icon: "check",
                title: "",
                content: t("Created Successfully!"),
                open: true,
              })
            );
            navigate("/goals");
          }
        });
    }
  };

  return (
    <PageContainer>
      <Box pt={1} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card elevation={0} sx={{ border: "0px solid #eee" }}>
              <CardHeader
                title={data && data._id ? t("Edit Goal") : t("Create Goal")}
              />

              {/* <MDSection title={t("Basic Info")}> */}
              <Grid container xs={12} display="flex" spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                  ></Typography>
                </Grid>
              </Grid>

              <Grid container xs={12} display="flex" p={2} spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Input
                    label={t("name")}
                    value={data && data.name ? data.name : ""}
                    onChange={handleNameChange}
                    helperText={error && error.name ? error.name : ""}
                  />
                </Grid>
              </Grid>

              <Grid container xs={12} display="flex" p={2} spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Input
                    label={t("notes")}
                    value={data && data.notes ? data.notes : ""}
                    onChange={handleNotesChange}
                    helperText={error && error.notes ? error.notes : ""}
                    maxRows={5}
                    minRows={5}
                    multiline
                  />
                </Grid>
              </Grid>

              {/* <Grid container xs={12} display="flex" pt={2} spacing={2}>
                <Grid item xs={6} sm={3}>
                    <Input
                        label={t("status")}
                        value={data && data.status ? data.status : ""}
                        onChange={handleStatusChange}
                        helperText={error && error.status ? error.status : ""}
                    />
                </Grid>
            </Grid>
            
            <Grid container xs={12} display="flex" pt={2} spacing={2}>
                <Grid item xs={6} sm={3}>
                    <Input
                        label={t("planStartAt")}
                        value={data && data.planStartAt ? data.planStartAt : ""}
                        onChange={handlePlanStartAtChange}
                        helperText={error && error.planStartAt ? error.planStartAt : ""}
                    />
                </Grid>
            </Grid>
            
            <Grid container xs={12} display="flex" pt={2} spacing={2}>
                <Grid item xs={6} sm={3}>
                    <Input
                        label={t("planEndAt")}
                        value={data && data.planEndAt ? data.planEndAt : ""}
                        onChange={handlePlanEndAtChange}
                        helperText={error && error.planEndAt ? error.planEndAt : ""}
                    />
                </Grid>
            </Grid>
            
            <Grid container xs={12} display="flex" pt={2} spacing={2}>
                <Grid item xs={6} sm={3}>
                    <Input
                        label={t("startAt")}
                        value={data && data.startAt ? data.startAt : ""}
                        onChange={handleStartAtChange}
                        helperText={error && error.startAt ? error.startAt : ""}
                    />
                </Grid>
            </Grid>
            
            <Grid container xs={12} display="flex" pt={2} spacing={2}>
                <Grid item xs={6} sm={3}>
                    <Input
                        label={t("endAt")}
                        value={data && data.endAt ? data.endAt : ""}
                        onChange={handleEndAtChange}
                        helperText={error && error.endAt ? error.endAt : ""}
                    />
                </Grid>
            </Grid>
            
            <Grid container xs={12} display="flex" pt={2} spacing={2}>
                <Grid item xs={6} sm={3}>
                    <Input
                        label={t("createdAt")}
                        value={data && data.createdAt ? data.createdAt : ""}
                        onChange={handleCreatedAtChange}
                        helperText={error && error.createdAt ? error.createdAt : ""}
                    />
                </Grid>
            </Grid>
            
            <Grid container xs={12} display="flex" pt={2} spacing={2}>
                <Grid item xs={6} sm={3}>
                    <Input
                        label={t("updatedAt")}
                        value={data && data.updatedAt ? data.updatedAt : ""}
                        onChange={handleUpdatedAtChange}
                        helperText={error && error.updatedAt ? error.updatedAt : ""}
                    />
                </Grid>
            </Grid> */}

              <Grid
                display="flex"
                justifyContent="flex-start"
                xs={12}
                px={2}
                py={2}
              >
                <Button
                  color="secondary"
                  variant="outlined"
                  style={{ marginRight: 20 + "px" }}
                  onClick={() => navigate(-1)}
                >
                  {t("Cancel")}
                </Button>
                <Button variant="contained" color="info" disableElevation onClick={handleSubmit}>
                  {t("Save")}
                </Button>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </PageContainer>
  );
}
