import axios from "axios";

export const login = ({ username, password }) =>
  axios.post("/api/auth/login", { username, password });

export const register = ({ username, password }) =>
  axios.post("/api/auth/register", { username, password });

export const check = () => axios.get("/api/auth/check");

export const logout = () => axios.post("/api/auth/logout");
