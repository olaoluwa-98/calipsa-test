import axios from "axios";

import app from "@/main";

import BadRequestException from "./exceptions/BadRequestException";
import NetworkException from "./exceptions/NetworkException";
import NotAuthorizedException from "./exceptions/NotAuthorizedException";
import NotFoundException from "./exceptions/NotFoundException";
import ValidationException from "./exceptions/ValidationException";

const errorHandler = (error, { showToast = true } = { showToast: true }) => {
  if (!error.response) {
    app.$toasted.error("Hmm...you're not connected to the Internet", {
      position: "bottom-center",
    });
    throw new NetworkException("Hmm...you're not connected to the Internet", 0);
  }

  const {
    response: {
      status,
      data: { status: statusText, data, message, meta },
    },
  } = error;
  if (status === 400) {
    if (showToast) {
      app.$toasted.error(
        message == "Validation failed" ? "Please check your input" : message
      );
    }
    if (meta && meta.error_type === "validation") {
      throw new ValidationException(data, message);
    }
    // if request is post, put or patch, then throw message
    if (["post", "put", "patch"].includes(error.config.method)) {
      throw new BadRequestException(message);
    }
  } else if (status === 401) {
    localStorage.removeItem("authToken");

    app.$store.dispatch("auth/RESET_STATE");
    const route = ["/login", "/home"].includes(document.location.pathname)
      ? "login"
      : `/login?next=${document.location.pathname}${document.location.hash}`;
    throw new NotAuthorizedException("You're not logged in", {
      redirect_route: route,
    });
  } else if (status === 404) {
    throw new NotFoundException(message);
  } else if (status >= 500) {
    app.$toasted.error(message || "Something went wrong. Please try again", {
      position: "bottom-center",
    });
    throw new NetworkException(
      message || "Something went wrong. Please try again",
      status
    );
  }

  return { status: statusText, data, message, meta };
};

class API {
  constructor() {
    const headers = {
      "Content-Type": "application/json",
    };
    // runs when the browser is refreshed
    if (localStorage.getItem("authToken")) {
      headers.Authorization = `Bearer ${localStorage.getItem("authToken")}`;
    }
    this.axios = axios.create({
      baseURL: process.env.VUE_APP_API_BASE,
      headers,
    });

    this.axios.interceptors.request.use(function(config) {
      const token = localStorage.getItem("authToken");
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      return config;
    });
  }

  async post(url, payload, errorOptions) {
    try {
      const { data } = await this.axios.post(url, payload);
      return data;
    } catch (error) {
      return errorHandler(error, errorOptions);
    }
  }
  async get(url, query = null, errorOptions) {
    let finalUrl = url;
    if (query && Object.keys(query).length > 0) {
      finalUrl = Object.keys(query).reduce((total, key, index) => {
        if (query[key]) {
          return total + `${index == 0 ? "" : "&"}${key}=${query[key]}`;
        }
        return total;
      }, `${url}?`);
    }
    try {
      const { data } = await this.axios.get(finalUrl);
      return data;
    } catch (error) {
      return errorHandler(error, errorOptions);
    }
  }
  deleteToken() {
    this.axios.defaults.headers.common["Authorization"] = null;
  }
  setToken(token) {
    const storedToken = localStorage.getItem("authToken");
    this.axios.defaults.headers.common["Authorization"] = `Bearer ${token ||
      storedToken}`;
  }
}
export default new API();
