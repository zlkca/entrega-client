import Grid from "@mui/material/Grid";

export default function PageContainer({ children }) {
    return (
        <Grid
            container
            xs={12}
            pt={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ backgroundColor: "white", height: "100%" }}
        >
            <Grid item xs={12} md={8}>
                {children}
            </Grid>
        </Grid>
    )
}