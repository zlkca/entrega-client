import { Grid } from "@mui/material";
import Selection from "./common/Selection";
import { useTranslation } from "react-i18next";

export default function MonthlyRepeat({frequency, onChange}){
    const {t} = useTranslation();
    const frequencyOptions = [{id: 1, label: `Every 1 Month`, value:1}];
    for(let i=2; i<=12; i++){
        frequencyOptions.push({id: i, label: `Every ${i} Months`, value:i});
    }
    const handleSelectFrequency = (e) => {
        console.log(e.target.value);
        onChange({unit: 'month', frequency: e.target.value});
    }
    return (
        <Grid container>
            <Grid item xs={12} sm={8}>
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