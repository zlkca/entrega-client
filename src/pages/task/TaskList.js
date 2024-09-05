import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Chip, Grid, Stack } from "@mui/material";

import { setTask, setTasks } from "../../redux/task/task.slice";
import { taskAPI } from "../../services/taskAPI";
import Footer from "../../layouts/Footer";
import PageContainer from "../../layouts/PageContainer";
import { getWeekStartEndDates, getDate, getDisplayTime, getTargetDate, getTimeRange, getFirstDateOfWeek, getLastDateOfWeek } from "../utils";
import AlertDialog from "../../components/common/AlertDialog";
import CompleteCheck from "../../components/CompleteCheck";
import { USERID_COOKIE } from "../../const";
import {
  DeleteIconButton,
  EditIconButton,
  NextIconButton,
  PrevIconButton,
} from "../../components/common/IconButton";
import { selectWeek } from "../../redux/ui/ui.selector";
import { setWeek } from "../../redux/ui/ui.slice";

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
const week = [
  {index:0, name:"Sun"},
  {index:1, name: "Mon"},
  {index:2, name: "Tue"},
  {index:3, name: "Wed"},
  {index:4, name: "Thr"},
  {index:5, name: "Fri"},
  {index:6, name: "Sat"}
];

export default function TaskListPage() {
  const userId = localStorage.getItem(USERID_COOKIE);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const {start, end, current} = useSelector(selectWeek);

  const tasks = useSelector((state) => state.task.tasks);
  // const gridApiRef = useGridApiRef();
  const [delDialogOpen, setDelDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  const [dateRange, setDateRange] = useState();
  const [timeRange, setTimeRange] = useState();

  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState();
  const [tasksOnSelectedDate, setTasksOnSelectedDate] = useState([]);

  const handleCreate = () => {
    dispatch(setTask());
    navigate("/tasks/new/form");
  };

  const handleEdit = (row) => {
    dispatch(setTask(row));
    const id = `${row.userId}-${row.startAt}`;
    navigate("/tasks/" + id + "/form");
  };

  const handleDelete = (it) => {
    setSelectedRow(it);
    setDelDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setDelDialogOpen(false);
    const id = `${selectedRow.userId}-${selectedRow.startAt}`;
    taskAPI.deleteTask(id).then((r) => {
      console.log(r);
      dispatch(setTasks(
        tasks.filter(
          (it) =>
            !(
              it.userId === selectedRow.userId &&
              it.startAt === selectedRow.startAt
            )
        )
      ));
      const ts = tasksOnSelectedDate.filter((it) => it.startAt === selectedRow.startAt);
      setTasksOnSelectedDate(ts);
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
    const id = `${item.userId}-${item.startAt}`;
    const d = {
      ...item,
      completed: e.target.checked,
      endedAt: new Date().getTime(),
    };
    taskAPI.updateTask(id, d).then((r) => {
      if (r.status === 200) {
        setTasksOnSelectedDate(
          tasksOnSelectedDate.map((it) => {
            if (it.userId === item.userId && it.startAt === item.startAt) {
              return { ...it, completed: !e.target.checked };
            } else {
              return it;
            }
          })
        )
        dispatch(setTasks(
          tasks.map((it) => {
            if (it.userId === item.userId && it.startAt === item.startAt) {
              return { ...it, completed: !e.target.checked };
            } else {
              return it;
            }
          })
        ));
      }
    });
  };

  useEffect(() => {
    if(!userId){
      navigate("/signin");
      return;
    }
    if(start && end){
      setDateRange({start: new Date(start), end: new Date(end), current: new Date(current)});
      const tr = getTimeRange(current);
      setTimeRange(tr);
      const index = new Date(current).getDay();
      const currDay = week.find((it) => it.index === index);
      setSelectedDay(currDay);

      taskAPI.fetchTasks({start, end}).then((r) => {
        console.log(r);
        if (r && r.data && r.data.length > 0) {
          dispatch(setTasks(r.data));
          const timeStart = tr.start.getTime();
          const timeEnd = tr.end.getTime();
          const ts = r.data.filter((it) => it.startAt >= timeStart && it.startAt <= timeEnd);
          setTasksOnSelectedDate(ts);
        }else{
          dispatch(setTasks([]));
        }
      });
    }
  }, [start, end]);

  const handleClickWeekDate = (it) => {
    const deltaDays = it.index - date.getDay();
    const targetDate = getTargetDate(date, deltaDays);
    const tr = getTimeRange(targetDate);
    const timeStart = tr.start.getTime();
    const timeEnd = tr.end.getTime();
    
    console.log({tasks})
    console.log({timeStart: tr.start.toISOString(), timeEnd: tr.end.toISOString()})
    const ts = tasks.filter((it) => it.startAt >= timeStart && it.startAt <= timeEnd);
    setTasksOnSelectedDate(ts);
    console.log({ts});

    // update
    setDate(targetDate);
    setSelectedDay(it);
  };

  const _shiftWeek = (deltaDays) => {
    const target = getTargetDate(current, deltaDays);
    setDate(target);
    const startDate = getFirstDateOfWeek(target);
    const endDate = getLastDateOfWeek(target);
    dispatch(setWeek({start: startDate.getTime(), end: endDate.getTime(), current: target.getTime()}))
    const tr = getTimeRange(target);
    setTimeRange(tr);

    taskAPI.fetchTasks({start: startDate.getTime(), end: endDate.getTime()}).then((r) => {
      console.log(r);
      if (r && r.data && r.data.length > 0) {
        dispatch(setTasks(r.data));
        const ts = r.data.filter((it) => it.startAt >= tr.start.getTime() && it.startAt <= tr.end.getTime());
        setTasksOnSelectedDate(ts);
      }else{
        dispatch(setTasks([]));
        setTasksOnSelectedDate([]);
      }
    });
  }

  const handlePrevWeek = () => {
    _shiftWeek(-7);
  }
  const handleNextWeek = () => {
    _shiftWeek(7);
  }

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
                      {/* <Grid item>
                        <Button
                          color="info"
                          variant={"outlined"}
                          size="small"
                          onClick={() => setSelectedDay(new Date())}
                        >
                          {t("Today")}
                        </Button>
                      </Grid> */}
                      <Grid item>
                        <Button
                          key="create-task-button"
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
                <Grid item xs={12} sm={12}>
                  {date.toISOString().split('T')[0]}
                </Grid>
                <Grid item xs={12} sm={12} pt={2}>
                  <Stack direction="row" spacing={1}>
                    <PrevIconButton onClick={handlePrevWeek}/>
                    {
                      week && week.length >0 &&
                      week.map((it) => (
                      <Chip
                        key={`day-${it.index}`}
                        label={`${it.name}`}
                        onClick={() => handleClickWeekDate(it)}
                        color={
                          selectedDay && selectedDay.index === it.index
                            ? "primary"
                            : "default"
                        }
                        style={{marginTop: 2}}
                      />
                    ))}
                    <NextIconButton onClick={handleNextWeek}/>
                  </Stack>
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
                  {tasksOnSelectedDate.map((it) => {
                    return (
                      <Grid
                        style={styles.row}
                        key={it.name}
                        container
                        display="flex"
                        justifyContent="flex-start"
                      >
                        <Grid item xs={5} md={5}>
                          {it.name}
                        </Grid>
                        <Grid item xs={4} md={4}>
                          {getDisplayTime(it.startAt)}
                        </Grid>
                        <Grid item xs={1} md={1}>
                          <EditIconButton onClick={() => handleEdit(it)} />
                        </Grid>
                        <Grid item xs={1} md={1}>
                          <DeleteIconButton onClick={() => handleDelete(it)} />
                        </Grid>
                        <Grid item xs={1} md={1}>
                          <CompleteCheck
                            checked={it.completed}
                            onChange={(e) => handleComplete(it, e)}
                          />
                        </Grid>
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
