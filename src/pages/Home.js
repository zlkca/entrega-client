import { fontSize, fontWeight } from "@mui/system";
import TopBar from "../layouts/TopBar";
import { useEffect } from "react";
import { Button } from "@mui/material";
import PageContainer from "../layouts/PageContainer";
import HomeContainer from "../layouts/HomeContainer";

const styles = {
  hero: {
    padding: 40,
  },
  heroText: {
    fontSize: 64,
    fontWeight: 400,
    color: "#001e2b",
    marginTop: 4,
    marginBottom: 4,
  },
};

const socket = new WebSocket(
  "wss://pkekouskeb.execute-api.us-east-1.amazonaws.com/dev/"
);

export default function Home() {
  useEffect(() => {
    try {
      socket.onopen = () => {
        console.log("Connection established");
      };

      socket.onmessage = (evt) => {
        console.log(evt);
      };

      socket.onclose = () => {
        console.log("Connection dropped");
      };
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleSendMessage = () => {
    socket.send(`client message: ${new Date()}`);
  };
  return (
    <HomeContainer>
      <div style={styles.hero}>
        <p style={styles.heroText}>Track progress</p>
        <p style={styles.heroText}>Achieve your goals</p>
        {/* <Button onClick={handleSendMessage}>Send Message</Button> */}
      </div>
    </HomeContainer>
  );
}
