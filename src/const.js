import { env, Cfg, BrandName } from "./config";

export const JWT_COOKIE = `${BrandName.toLowerCase()}-jwt`;
export const LANGUAGE_COOKIE = `${BrandName.toLowerCase()}-lang`;
export const ACCOUNT_COOKIE = `${BrandName.toLowerCase()}-account`;
export const USERID_SESSION = `${BrandName.toLowerCase()}-user-id`;
export const USER_PICTURE_SESSION = `${BrandName.toLowerCase()}-user-picture`;
export const OAUTH_TOKEN_COOKIE = `${BrandName.toLowerCase()}-oauth-token`;
// https://ibi2llw781.execute-api.us-east-1.amazonaws.com
export const RootApiUrl = "http://192.168.31.143:5000"
// "https://ctri2lnfr5.execute-api.us-east-1.amazonaws.com/dev"
  // env == "prd"
  //   ? `https://${Cfg.apiClusterId}.execute-api.us-east-1.amazonaws.com/dev`
  //   : `http://192.168.65.7:5001`;

export const DefaultProductPicture = "/logo192.png"