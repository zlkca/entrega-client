

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

import Grid from "@mui/material/Grid";

import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import Divider from '@mui/material/Divider';


import { setTokenId } from "../../redux/auth/auth.slice";
import { setSignedInUser } from "../../redux/auth/auth.slice";
import { setLayout } from "../../redux/ui/ui.slice";
import { authAPI } from '../../services/authAPI';
import { accountAPI } from '../../services/accountAPI';
import { ACCOUNT_COOKIE, JWT_COOKIE } from "../../const";
import PageContainer from "../../components/PageContainer";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { BrandName } from "../../config";
import GoogleLogo from "../../components/GoogleLogo";

export default function SignIn() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credential, setCredential] = useState({});
  const [error, setError] = useState();

  const [user, setUser] = useState([]);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (rsp) => {
      console.log(rsp)
      setUser(rsp)
      authAPI.getGoogleUserinfo(rsp.access_token).then(r => {
        // console.log(r);
        const data = r.data;
        Cookies.set(JWT_COOKIE, data.token);
        Cookies.set(ACCOUNT_COOKIE, JSON.stringify(data.account));
        dispatch(setTokenId(data.token));
        dispatch(setSignedInUser(data.account));
        navigate("/products")
      })
    },
    onError: (error) => {
      console.log('Login Failed:', error)
    }
  });

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    // setProfile(null);
  };

  const handleChangeEmail = (e) => {
    const email = e.target.value;
    setCredential({ ...credential, email });
  };

  const handleChangePassword = (e) => {
    const password = e.target.value;
    setCredential({ ...credential, password });
  };

  const handleSubmit = () => {
    let cred = credential;
    if (BrandName === "demo" && !credential.email && !credential.password) {
      cred = { email: "test@gmail.com", password: "123456" };
    }
    authAPI.login(cred).then((r) => {
      if (r && r.status === 200) {
        const data = r.data;
        Cookies.set(JWT_COOKIE, data.token);
        Cookies.set(ACCOUNT_COOKIE, JSON.stringify(data.account));
        dispatch(setTokenId(data.token));
        dispatch(setSignedInUser(data.account));
        dispatch(setLayout("dashboard"));

        navigate("/products");
      } else {
        if (r && r.status !== 200) {
          if (r.data) {
            const field = r.data.field;
            setError({ [field]: t(r.data.message) });
          } else {
            console.log(r);
          }
        } else {
          console.log(r);
        }
      }
    });
  };
  return (
    <PageContainer>
      <Grid container display="flex" pt={2} px={2} spacing={2} justifyContent="center" alignItems={"center"} style={{ height: "100%" }}>
        <Grid item xs={12} sm={10} md={10} lg={8} display="flex" justifyContent="center">
          <Grid item xs={12} sm={8} md={8}>
            <Input
              type="email"
              label={t("Email")}
              onChange={handleChangeEmail}
              helperText={error ? error.email : ""}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10} md={10} lg={8} display="flex" justifyContent="center">
          <Grid item xs={12} sm={8} md={8}>
            <Input
              type="password"
              label={t("Password")}
              onChange={handleChangePassword}
              helperText={error ? error.password : ""}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10} md={10} lg={8} display="flex" justifyContent="center" pb={3}>
          <Grid item xs={12} sm={8} md={8}>
            <Button variant="contained" style={{ color: "white" }} onClick={handleSubmit} >
              Login
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10} md={10} lg={8} display="flex" justifyContent="center" pb={3}>
          <Grid item xs={12} sm={8} md={8}>
            <Divider>OR</Divider>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10} md={10} lg={8} display="flex" justifyContent="center">
          <Grid item xs={12} sm={8} md={8}>
            <Button variant="outline" style={{ color: "#666", border: "1px solid #aaa" }} onClick={handleGoogleLogin} startIcon={<GoogleLogo width={32} />}>
              Google Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
