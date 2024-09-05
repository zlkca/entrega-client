import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Chip, Grid, Stack } from "@mui/material";
import Selection from "./common/Selection";

export default function WeeklyRepeat({frequency, onChange}){
    const {t} = useTranslation();
    const frequencyOptions = [{id: 1, label: `Every 1 Week`, value:1}];
    for(let i=2; i<=52; i++){
        frequencyOptions.push({id: i, label: `Every ${i} Weeks`, value:i});
    }
    const [weekdays, setWeekdays] = useState([]);
    const handleSelectFrequency = (e) => {
        console.log(e.target.value);
        onChange({unit: 'week', frequency: e.target.value, weekdays});
    }
    const handleClickWeekDay = (weekday) => {
        console.log(weekday);
        if(weekdays.includes(weekday)){
            const newWeekdays = weekdays.filter(it => it !== weekday);
            setWeekdays(newWeekdays);
            onChange({unit: 'week', frequency, weekdays: newWeekdays});
        }else{
            const newWeekdays = [...weekdays, weekday];
            setWeekdays(newWeekdays);
            onChange({unit: 'week', frequency, weekdays: newWeekdays});
        }
    }
    
    return (
        <Grid container>
            <Grid item xs={12} sm={12}>
                <Stack direction="row" spacing={1}>
                {
                    ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"].map(it => 
                        <Chip 
                            id={it}
                            label={it}
                            onClick={() => handleClickWeekDay(it)}
                            color={weekdays.includes(it) ? "primary" : "default"}
                        />
                    )
                }
                </Stack>
            </Grid>
            <Grid item xs={12} sm={12} pt={2}>
                <Selection
                    name="frequency"
                    label={t("Frequency")}
                    value={frequency ? frequency : 1} // controlled
                    options={frequencyOptions}
                    onChange={handleSelectFrequency}
                />
            </Grid>
        </Grid>
    )
}