import { env, Cfg, BrandName } from "./config";

export const JWT_COOKIE = `${BrandName.toLowerCase()}-backoffice-jwt`;
export const LANGUAGE_COOKIE = `${BrandName.toLowerCase()}-backoffice-lang`;
export const ACCOUNT_COOKIE = `${BrandName.toLowerCase()}-backoffice-account`;
// https://ibi2llw781.execute-api.us-east-1.amazonaws.com
export const RootApiUrl = "https://ctri2lnfr5.execute-api.us-east-1.amazonaws.com/dev"
  // env == "prd"
  //   ? `https://${Cfg.apiClusterId}.execute-api.us-east-1.amazonaws.com/dev`
  //   : `http://192.168.65.7:5001`;

export const DefaultProductPicture = "/logo192.png"