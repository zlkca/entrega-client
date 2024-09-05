import { ButtonGroup, Grid } from "@mui/material"
import Button from "./common/Button";
import DailyRepeat from "./DailyRepeat";
import MonthlyRepeat from "./MonthlyRepeat";
import WeeklyRepeat from "./WeeklyRepeat";

export default function RecurringSelection({data, onChange}){
    // const [data, SetData] = useState({frequency: 1});
    const handleDailyChange = (item) => {
        onChange(item);
    }
    const handleWeeklyChange = (item) => {
        onChange(item);
    }
    const handleMonthlyChange = (item) => {
        onChange(item);
    }
    return (
        <Grid container>
            <Grid item xs={12}>
                <ButtonGroup variant="contained" aria-label="Basic button group" pb={3} disableElevation={true}>
                    <Button disableElevation variant={data.unit === "day" ? "contained" : "outlined"} onClick={() => onChange({...data, unit: "day"})}>Daily</Button>
                    <Button disableElevation variant={data.unit === "week" ? "contained" : "outlined"} onClick={() => onChange({...data, unit: "week"})}>Weekly</Button>
                    <Button disableElevation variant={data.unit === "month" ? "contained" : "outlined"} onClick={() => onChange({...data, unit: "month"})}>Monthly</Button>
                </ButtonGroup>
            </Grid>
            <Grid item xs={12} pt={3}>
                {data.unit === 'day' && <DailyRepeat frequency={data.frequency} onChange={handleDailyChange}/>}
                {data.unit === 'week' && <WeeklyRepeat frequency={data.frequency} onChange={handleWeeklyChange}/>}
                {data.unit === 'month' && <MonthlyRepeat frequency={data.frequency} onChange={handleMonthlyChange}/>}
            </Grid>
        </Grid>
    )
}