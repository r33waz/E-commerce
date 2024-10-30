import axios from "axios";

console.log(import.meta.env.VITE_SERVER_URL)
const BASE_API = {
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const PHOTO_API = {
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
};

const refreshAccessToken = async () => {
  try {
    const response = await main_url.get(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/refresh-token`
    );

    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.error("Refresh token is expired or invalid:", error);
    throw error;
  }
};

const main_url = axios.create(BASE_API);
const photo_url = axios.create(PHOTO_API);

main_url.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        await refreshAccessToken();
        return main_url(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

photo_url.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        await refreshAccessToken();
        return photo_url(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { main_url, photo_url };
