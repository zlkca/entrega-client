import TopBar from "./TopBar"

const styles = {
    root: {
        // display: 'flex',
        height: '100%',
    }
}

export default function Layout({children}){
    return (
        <div style={styles.root}>
            {/* {
                signedInUser && navbar &&
                <TopBar title={"My Corp"} isNavExpanded={navbar.status === "expanded"} onCollapse={handleExpandNav} />
            }
            {
                signedInUser && navbar &&
                <LeftNav onCollapse={handleCollapseNav}>
                </LeftNav>
            }
            <div style={getContentAreaStyle()}>
                {children}
            </div>

            <Snackbar open={snackbar.show} autoHideDuration={4000} message={snackbar.text} onClose={handleCloseSnackbar} />
            <ProgressBackdrop /> */}
            {/* <TopBar /> */}
            <div style={{ margin: 0, width: "100%", height: "100%" }}>
                {children}
            </div>
        </div>

    )
}