import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Button, Card, FormControlLabel, Grid, Switch } from "@mui/material";

import { selectTask } from "../../redux/task/task.selector";
import { setTask } from "../../redux/task/task.slice";
import { setSnackbar } from "../../redux/ui/ui.slice";
import { selectSignedInUser } from "../../redux/auth/auth.selector";

import CardHeader from "../../components/common/CardHeader";
import PageContainer from "../../layouts/PageContainer";
import Typography from "../../components/common/Typography";
import Input from "../../components/common/Input";
import Selection from "../../components/common/Selection";
import RecurringSelection from "../../components/RecurringSelection";

import Footer from "../../layouts/Footer";
import { taskAPI } from "../../services/taskAPI";
import { DateTimePicker, dayCalendarClasses, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { getDate, getTime } from "../utils";
import { goalAPI } from "../../services/goalAPI";
import { setGoals } from "../../redux/goal/goal.slice";
import { selectGoals } from "../../redux/goal/goal.selector";

const durationOptions = [
  {id: '15m', label: `15 minutes`, value: '15m'},
  {id: '30m', label: `30 minutes`, value: '30m'},
  {id: '45m', label: `45 minutes`, value: '45m'},
  {id: '1h', label: `1 hour`, value: '1h'},
  {id: '1.5h', label: `1.5 hours`, value: '1.5h'},
  {id: '2h', label: `2 hours`, value: '2h'},
  {id: '2.5h', label: `2.5 hours`, value: '2.5h'},
  {id: '3h', label: `3 hours`, value: '3h'},
  {id: '3.5h', label: `3.5 hours`, value: '3.5h'},
  {id: '4h', label: `4 hours`, value: '4h'},
];

export default function TaskFormPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [data, setData] = useState({
    startDate: getDate(dayjs().toISOString()),
    startTime: "00:00:00.000Z",
    unit: "day",
    frequency: 1,
    weekdays: [],
    endAtEnabled: true
  });

  const [goalOptions, setGoalOptions] = useState([]);
  const task = useSelector(selectTask);
  const goals = useSelector(selectGoals);

  useEffect(() => {
    goalAPI.fetchGoals().then((r) => {
      dispatch(setGoals(r.data));
      setGoalOptions(r.data.map((it) => ({ id: it.name, label: it.name })));
    });
  }, []);

  useEffect(() => {
    if (task && task.createdAt) {
      console.log("task", task);
      setData({
        ...task,
        startDate: getDate(new Date(task.startAt).toISOString()),
        startTime: getTime(new Date(task.startAt).toISOString()),
      });
    } else {
      if (params && params.id && params.id !== "new") {
        if (!task) {
          // refetch if page refreshed
          taskAPI.fetchTask(params.id).then((r) => {
            if (r.status === 200) {
              setData({ ...r.data });
            }
          });
        }
      }
    }
  }, [task]);


  const handleNameChange = (event) => {
    const a = { ...data, name: event.target.value };
    setData(a);
  };


  const handleSubmit = () => {
    const d = {
      ...data,
      weekdays: JSON.stringify(data.weekdays)
    };

    if (d.createdAt) {
      const id = `${d.userId}-${d.createdAt}`;
      taskAPI.updateTask(id, d).then((r) => {
        if (r.status === 200) {
          dispatch(setTask(r.data));
          dispatch(
            setSnackbar({
              color: "success",
              icon: "check",
              title: "",
              content: t("Updated Successfully!"),
              open: true,
            })
          );
          navigate("/tasks");
        }
      });
    } else {
      taskAPI
        .createTask({
          ...d,
          createdAt: new Date().getTime(),
        })
        .then((r) => {
          if (r.status === 200) {
            dispatch(setTask(r.data));
            dispatch(
              setSnackbar({
                color: "success",
                icon: "check",
                title: "",
                content: t("Created Successfully!"),
                open: true,
              })
            );
            navigate("/tasks");
          }
        });
    }
  };

  const handleGoalChange = (event) => {
    const name = event.target.value;
    const goal = goals.find((it) => it.name === name);
    const a = { ...data, goal: goal.name, categories: goal.categories };
    console.log(a);
    setData(a);
  };

  const handleTypeChange = (it) => {
    if(it.target.checked){
      setData({...data, type: 'recurring'})
    }else{
      setData({...data, type: 'instance'})
    }
  };

  const handleRecurringChange = (it) => {
    console.log(it);
    console.log(data)
    setData({...data, ...it});
  };

  const handleSelectDuration = (e) => {
    console.log(e.target.value);
    setData({...data, duration: e.target.value});
  }

  return (
    <PageContainer>
      <Box pt={1} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card elevation={0} sx={{ border: "0px solid #eee" }}>
              <CardHeader
                title={data && data._id ? t("Edit Task") : t("Create Task")}
              />

              {/* <MDSection title={t("Basic Info")}> */}
              <Grid container xs={12} display="flex" pt={1} spacing={2}>
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
                  <Selection
                    name="goal"
                    label={t("Goal")}
                    value={data && data.goal ? data.goal : ""} // controlled
                    options={goalOptions}
                    onChange={handleGoalChange}
                  />
                </Grid>
              </Grid>
              <Grid container xs={12} display="flex" p={2} spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Input
                    label={t("name")}
                    value={data && data.name ? data.name : ""}
                    onChange={handleNameChange}
                  />
                </Grid>
              </Grid>

              <Grid container xs={12} display="flex" p={2} spacing={2}>
                <Grid item xs={12} sm={6}>
                  <DateTimePicker
                    sx={{ width: "100%" }}
                    label="Start Date"
                    views={["year", "month", "day"]}
                    value={dayjs(data.startDate + "T00:00:00.000Z")}
                    onChange={(newValue) => {
                      setData({
                        ...data,
                        startDate: getDate(dayjs(newValue).toISOString()),
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container xs={12} display="flex" p={2} spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TimePicker
                    sx={{ width: "100%" }}
                    label="Start Time"
                    value={dayjs(data.startDate + "T" + data.startTime)}
                    onChange={(newValue) => {
                      setData({
                        ...data,
                        startTime: getTime(newValue.toISOString()),
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container xs={12} display="flex" p={2} spacing={2}>
                  <Grid item xs={12} sm={6}>
                      <Selection
                          name="duration"
                          label={t("Duration")}
                          value={data.duration ? data.duration : '15m'} // controlled
                          options={durationOptions}
                          onChange={handleSelectDuration}
                      />
                  </Grid>
              </Grid>
              <Grid container xs={12} display="flex" p={2} spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel control={
                    <Switch 
                    checked={data.type === "recurring"}
                    onChange={handleTypeChange}
                    inputProps={{ "aria-label": "Recurring Task" }}
                    />
                  } label="Recurring Task" />
                </Grid>
              </Grid>
              {
                data.type === "recurring" &&
                <Grid container xs={12} display="flex" p={2} spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <RecurringSelection
                      data={data}
                      onChange={handleRecurringChange}
                    />
                  </Grid>
                </Grid>
              }
              {
                data.endAtEnabled && data.type === "recurring" &&
                <Grid container xs={12} display="flex" p={2} spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <DateTimePicker
                      sx={{ width: "100%" }}
                      label="End Date"
                      views={["year", "month", "day"]}
                      value={dayjs(data.endAt)}
                      onChange={(newValue) => {
                        setData({
                          ...data,
                          endAt: dayjs(newValue).toISOString(),
                        });
                      }}
                    />
                  </Grid>
                </Grid>
              }
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
                <Button
                  variant="contained"
                  color="info"
                  disableElevation
                  onClick={handleSubmit}
                >
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


// const validate = (d) => {
//   if (!d.name) {
//     alert(t("Name is required"));
//     return false;
//   }

//   if (!d.notes) {
//     alert(t("Notes is required"));
//     return false;
//   }

//   if (!d.status) {
//     alert(t("Status is required"));
//     return false;
//   }

//   if (!d.startAt) {
//     alert(t("PlanStartAt is required"));
//     return false;
//   }

//   if (!d.endAt) {
//     alert(t("endAt is required"));
//     return false;
//   }

//   if (!d.startAt) {
//     alert(t("StartAt is required"));
//     return false;
//   }

//   if (!d.endedAt) {
//     alert(t("EndAt is required"));
//     return false;
//   }

//   if (!d.createdAt) {
//     alert(t("CreatedAt is required"));
//     return false;
//   }

//   if (!d.updatedAt) {
//     alert(t("UpdatedAt is required"));
//     return false;
//   }

//   return true;
// };