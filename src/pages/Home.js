import { fontSize, fontWeight } from "@mui/system";
import TopBar from "../layouts/TopBar";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import PageContainer from "../layouts/PageContainer";
import HomeContainer from "../layouts/HomeContainer";
import Cookies from "js-cookie";
import { OAUTH_TOKEN_COOKIE, USERID_SESSION } from "../const";
import { authAPI } from "../services/authAPI";
import { goalAPI } from "../services/goalAPI";
import { addTask } from "../redux/task/task.slice";
import { useDispatch, useSelector } from "react-redux";
import { selectTasks } from "../redux/task/task.selector";
import { useNavigate } from 'react-router-dom';

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
  "wss://88oz18esgl.execute-api.us-east-1.amazonaws.com/dev/"
);
console.log('Home page')

export default function Home() {
  const dispatch = useDispatch();
  const userId = Cookies.get(USERID_SESSION);
  const messages = useSelector(selectTasks);
  const navigate = useNavigate();

  useEffect(() => {
    if(userId && userId.length > 9){
      // goalAPI.fetchGoals().then(r1 => {
      //   if(r1 && r.data.length > 0){

      //   }
      // })
    }
  }, [userId]);
  
  useEffect(() => {
    try {
      socket.onopen = () => {
        console.log("Connection established");
      };

      socket.onmessage = (evt) => {
        console.log(evt);
        const d = JSON.parse(evt.data);
        if(d.message){
          dispatch(addTask(d.message));
        }
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
      </div>
    </HomeContainer>
  );
}
