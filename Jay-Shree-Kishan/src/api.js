import axios from "axios";

const API = axios.create({
  baseURL: "https://jay-shree-kisan-com.onrender.com/api",
});

export const registerUser = (data) => API.post("/auth/register", data);
export const generateOtp = (data) => API.post("/auth/generate-otp", data);
export const signInWithOtp = (data) => API.post("/auth/signin-otp", data);
export const signInWithUsername = (data) => API.post("/auth/signin-username", data);