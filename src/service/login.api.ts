import { ILoginDTO } from "module/Login/DTO/login.dto";
import {IRegisterDTO} from "module/Register/DTO/register.dto"
import instance from "./interceptor";

export async function LoginUserAPI(
  params: ILoginDTO
){
  const { data } = await instance.post("/login", params);
  return data;
}

export async function CreateRegisterAPI(
  params: IRegisterDTO
){
  const { data } = await instance.post("/register", params);
  return data;
}

