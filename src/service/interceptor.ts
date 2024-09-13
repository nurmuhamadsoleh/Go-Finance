import Store, { IStore } from 'store'

import axios from "axios";

const state: IStore = Store.getState()
const instance = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const requestFunction = async (config: any) => {
  const unAuthenticatedUrls = ["/register", "/login"];

  const filteredURL = unAuthenticatedUrls.find((str) => {
    return config.url.toLowerCase().toLowerCase().includes(str.toLowerCase());
  });

  if (!filteredURL) {
    if (config.method === "post" || config.method === "get" || config.method === "put" || config.method === "delete") {
      config.headers["Authorization"] = "Bearer " + state?.auth?.token;
      config.headers.Accept = "application/json";
      config.headers["Content-Type"] = "application/json";
      config.headers["Acess-Control-Allow-Origin"] = "*";
    }
  } else {
    delete config.headers["Authorization"];
  }
  return config;
};

const interceptorError = (error: any) => {
  const originalRequest = error.config;
  const errorStatus = error.response.status;
  if (error.response) {
    if (errorStatus === 401) {
      if (!originalRequest._retry) {
        // if (isRefreshing) {
        //   return new Promise(function (resolve, reject) {
        //     // failedQueue.push({ resolve, reject });
        //   })
        //     .then((token) => {
        //       originalRequest.headers["Authorization"] = "Bearer " + token;
        //       return instance(originalRequest);
        //     })
        //     .catch((err) => {
        //       return err;
        //     });
        // }

        originalRequest._retry = true;
        // isRefreshing = true;
        // return new Promise(function (resolve, reject) {
        //   //   const state: IStore = Store.getState();
        //   //   axios
        //   //     .post(
        //   //       `${process.env.NEXT_PUBLIC_API_URL}/Token/refresh/${state.tokenRefresh}`,
        //   //       `"${state.token}"`,
        //   //       { headers: { "Content-Type": "application/json" } }
        //   //     )
        //   //     .then(({ data }) => {
        //   //       //   const state: IStore = Store.getState();
        //   //       //   state.setToken(data);
        //   //       //   instance.defaults.headers.common["Authorization"] =
        //   //       //     "Bearer " + data.token;
        //   //       //   originalRequest.headers["Authorization"] = "Bearer " + data.token;
        //   //       processQueue(null, data.token);
        //   //       resolve(instance(originalRequest));
        //   //     })
        //   //     .catch((err) => {})
        //   //     .then(() => {
        //   //       isRefreshing = false;
        //   //     });
        // });
      }
    }
  }

  return Promise.reject(error);
};

// INTERCEPTOR REQUEST
instance.interceptors.request.use(requestFunction, (error) => {
  return Promise.reject(error);
});

// INTERCEPTOR ERROR
instance.interceptors.response.use(function (response) {
  return response;
}, interceptorError);

export default instance;
