import { defineStore } from "pinia";
import { getToken, setToken, removeToken } from "@/utils/token";
import { login, logout, auth } from "@/api/user";

export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      name: "张三" as String,
      token: getToken() as String,
      authList: [] as any[],
    };
  },
  actions: {
    updateName(name) {
      this.name = name;
    },
    login(params) {
      const { username, password }: { username: string; password: string } =
        params;
      return new Promise<void>((resolve, reject) => {
        login({ username: username.trim(), password: password })
          .then((res) => {
            this.token = res.token;
            setToken(res.token);
            resolve();
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    logout() {
      return new Promise<void>((resolve, reject) => {
        logout(this.token)
          .then((res) => {
            this.resetToken();
            resolve(res);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    getAuth() {
      return new Promise<void>((resolve, reject) => {
        auth()
          .then((res) => {
            const { list } = res;
            this.authList = list;
            resolve(list);
          })
          .catch((e) => {
            console.log(e);
            reject();
          });
      });
    },

    resetToken() {
      return new Promise<void>((resolve) => {
        this.token = "";
        this.authList = [];
        removeToken();
        resolve();
      });
    },
  },
});
