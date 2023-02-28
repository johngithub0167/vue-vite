import http from "@/api/api";

export const logout = (data) => {
  return http.post("/api/logout", { token: data });
};

export const login = (params: { username: string; password: string }) => {
  return http.post("/api/login", params);
};

export const auth = () => {
  return http.get("/api/auth");
};
