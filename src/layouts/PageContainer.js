import Grid from "@mui/material/Grid";
import TopBar from "./TopBar";
//3213
export default function PageContainer({ children }) {
    return (
        <Grid
            container
            // pt={0}
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ backgroundColor: "white", height: "100%" }}
        >
            <TopBar />
            <Grid xs={12} sm={12} md={10} lg={8} xl={6} item>
            {children}
            </Grid>
        </Grid>
    )
}