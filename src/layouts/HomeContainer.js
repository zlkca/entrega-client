import Grid from "@mui/material/Grid";
import TopBar from "./TopBar";

export default function HomeContainer({ children }) {
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
            <Grid item xs={12} md={12}>
                {children}
            </Grid>
        </Grid>
    )
}