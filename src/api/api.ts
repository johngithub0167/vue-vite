import { useUserStore } from "@/store/user";
import axios, { Axios, AxiosResponse, AxiosRequestConfig } from "axios";
import router from "@/router";
import { ElMessage, ElMessageBox } from "element-plus";
import { getToken } from "@/utils/token";

declare module "axios" {
  interface AxiosResponse<T = any> {
    code: string | number;
    message: string;
    data: T;
    // 这里追加你的参数
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}

interface OptionsType {
  url: string;
  params?: Record<string, string>;
}

// interface ResponseType {
//   data: Record<string, string>;
//   message: string;
//   code: string | number;
// }

const http: any = {};

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 3000,
  // headers: {

  // }
});

// 请求拦截

service.interceptors.request.use(
  (config) => {
    const userStroe = useUserStore();
    if (userStroe.token) {
      config.headers["Authorization"] = getToken();
    } else {
      router.push("/login");
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
// 响应拦截
service.interceptors.response.use(
  (response) => {
    const userStroe = useUserStore();
    const res = response.data;
    if (res.code !== 200) {
      ElMessage({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000,
      });

      if (res.code == 500) {
        ElMessage({
          message: "服务错误，请稍后重试",
          type: "error",
          duration: 5 * 1000,
        });
        // to re-login
        // MessageBox.confirm(
        //   '你已经退出了，你可以取消以保持在这个页面上，或者重新登录',
        //   '确认退出？',
        //   {
        //     confirmButtonText: '重新登录',
        //     cancelButtonText: '取消',
        //     type: 'warning',
        //   }
        // ).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload();
        //   });
        // });
      } else if (res.code == 401) {
        ElMessageBox.confirm("token 已过期，请重新登录", {
          confirmButtonText: "重新登录",
          type: "warning",
        }).then(() => {
          userStroe.resetToken().then(() => {
            router.push("/login");
          });
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error);
    ElMessage({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

http.get = (url: string, params: OptionsType) => {
  return new Promise((resolve, reject) => {
    service
      .get(url, params)
      .then((res: AxiosResponse) => {
        if (res.code == 200) {
          resolve(res.data);
        } else {
          ElMessage.error({
            message: res.message || "",
          });
          reject(res.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
};

http.post = (url: string, params: OptionsType) => {
  return new Promise((resolve, reject) => {
    service
      .post(url, params)
      .then((res: AxiosResponse) => {
        if (res.code == 200) {
          resolve(res.data);
        } else {
          ElMessage.error({
            message: res.message || "",
          });
          reject(res.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
};
export default http;
