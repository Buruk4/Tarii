const BASE_URL = "/api/v1";

const getAuthToken = () => {
  return localStorage.getItem("token");
};

const request = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
};

const requestWithFormData = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
};

export const login = (email, password) => {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const register = (name, email, password) => {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
};

export const createDailyMarking = (markingData) => {
  return request("/dailymarkings", {
    method: "POST",
    body: JSON.stringify(markingData),
  });
};

export const getDailyMarkings = () => {
  return request("/dailymarkings");
};

export const createTrade = (tradeData) => {
  return request("/trades", {
    method: "POST",
    body: JSON.stringify(tradeData),
  });
};

export const getTrades = () => {
  return request("/trades");
};

export const getStats = () => {
  return request("/stats");
};

export const getDashboardData = () => {
  return request("/dashboard");
};
