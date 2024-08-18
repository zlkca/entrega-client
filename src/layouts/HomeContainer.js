import Grid from "@mui/material/Grid";
import TopBar from "./TopBar";

export default function HomeContainer({ children }) {
    return (
        // <Grid
        //     container
        //     pt={8}
        //     display="flex"
        //     justifyContent="center"
        //     alignItems="center"
        //     style={{ backgroundColor: "white", height: "100%" }}
        // >
        //     <Grid item xs={12} md={12}>
        <div>
                    <TopBar />

                    {children}
                </div>
        //     </Grid>
        // </Grid>
    )
}