import axios from "axios";
import Cookies from "js-cookie";

export const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => {
    if (response.config.url?.includes("/auth/login")) {
      const { accessToken, refreshToken } = response.data;
      if (accessToken) Cookies.set("accessToken", accessToken);
      if (refreshToken) Cookies.set("refreshToken", refreshToken);
      if (accessToken) fetchUserData(accessToken);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

async function fetchUserData(token: string) {
  try {
    const res = await request.post("/auth/decode", { accessToken: token });
    if (res.data?.role) Cookies.set("role", res.data.role);
    if (res.data?.email) Cookies.set("email", res.data.email);
  } catch (err) {
    console.error("Failed to decode token", err);
  }
}

async function refreshTokenFlow() {
  const refreshToken = Cookies.get("refreshToken");
  if (!refreshToken) return;

  try {
    const res = await request.post("/auth/refresh", { refreshToken });
    const { accessToken, refreshToken: newRefresh } = res.data;

    if (accessToken) Cookies.set("accessToken", accessToken);
    if (newRefresh) Cookies.set("refreshToken", newRefresh);

    if (accessToken) await fetchUserData(accessToken);
  } catch (err) {
    console.error("Failed to refresh token", err);
  }
}

setInterval(refreshTokenFlow, 10 * 60 * 1000);
