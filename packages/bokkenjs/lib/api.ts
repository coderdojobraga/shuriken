import axios, { AxiosInstance } from "axios";

export const API: AxiosInstance = axios.create({
  //TODO: replace this with environment
  baseURL: "https://bokken.di.uminho.pt",
  responseType: "json",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
