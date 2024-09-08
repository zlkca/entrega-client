import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PieChart } from "@mui/x-charts/PieChart";

import { USERID_COOKIE } from "../../const";
import { taskAPI } from "../../services/taskAPI";
import { setTasks } from "../../redux/task/task.slice";
import { Box, Grid } from "@mui/material";
import Footer from "../../layouts/Footer";
import PageContainer from "../../layouts/PageContainer";

export default function AnalyticsPage() {
  const userId = localStorage.getItem(USERID_COOKIE);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pieData, setPieData] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (userId) {
      taskAPI.analyseTasks().then((r) => {
        if (r && r.data) {
          setPieData(r.data.categories);
          setTotal(r.data.total);
        }
      });
    } else {
      navigate("/signin");
    }
  }, []);

  return (
    <PageContainer>
      <Box pt={1} pb={3}>
        <Grid container>
          <Grid item xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center", height: '800px'}}>
            <PieChart
              series={[
                {
                  data: pieData,
                  arcLabel: (item) =>
                    `${item.label} (${((item.value / total) * 100).toFixed(2)}%)`,
                  arcLabelMinAngle: 15,
                },
              ]}
              width={600}
              height={400}
            />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </PageContainer>
  );
}
