import axios from "./axios";

export interface IMetadata {
  rememberme: boolean;
  device: IDeviceModel;
}

export interface IDataUser {
  email: string;
  username: string;
  password: string;
}

export type IRegister = IDataUser & IMetadata;
export type IRegisterForm = IDataUser & Pick<IMetadata, "rememberme">;
export type ILogin = Pick<IDataUser, "email" | "password"> & IMetadata;
export type ILoginForm = Pick<IDataUser, "email" | "password"> & Pick<IMetadata, "rememberme">;

export interface IDeviceModel {
  agent: string;
  language: string;
  isLogued: boolean;
  isRegistred: boolean;
  location: [number, number];
  resolution: [number, number];
}

export const login = async (user: ILogin) => 
    axios.post("/login", user);

export const register = async (user: IRegister) =>
    axios.post("/register", user);
