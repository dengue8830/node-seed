import { ErrorsAPI } from './../components/error/errors';
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import { BaseError } from '../components/error/errors';

export interface IHttpResponse<T> {
  data: T;
}

class Http {
  private instance: AxiosInstance;
  private token?: string;

  constructor() {
    this.instance = axios.create(); // { timeout: 5000 }
  }

  setBaseUrl(baseUrl: string) {
    this.instance.defaults.baseURL = baseUrl;
  }

  setCredentials(token: string) {
    this.token = token;
    this.instance.defaults.headers.common.Authorization = 'bearer ' + token;
    // JWTUtils.parseJwt(resLogin.data.token).usuario.id
  }

  clearCredentials() {
    this.instance.defaults.headers.common.Authorization = undefined;
  }

  getToken() {
    return this.token;
  }

  private processRequest<T>(axiosPromise: AxiosPromise): Promise<IHttpResponse<T>> {
    return new Promise((resolve, reject) => {
      axiosPromise.then(res => {
        resolve({ data: res.data });
      }).catch(error => {
        const extra = {
          url: error.request.responseURL,
          status: error.request.status,
          method: error.config.method,
          response: error.request.responseText
        };
        const cause = error.response && error.response.data && error.response.data.error;
        reject(new BaseError(cause || ErrorsAPI.Unknown, extra));
      });
    });
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> {
    return this.processRequest<T>(this.instance.get(url, config));
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> {
    return this.processRequest<T>(this.instance.post(url, data, config));
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> {
    return this.processRequest<T>(this.instance.put(url, data, config));
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> {
    return this.processRequest<T>(this.instance.delete(url, config));
  }

  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> {
    return this.processRequest<T>(this.instance.head(url, config));
  }

  async isConnected() {
    try {
      // const isConnected = await NetInfo.isConnected.fetch();
      // if (!isConnected) {
      //   return false;
      // }
      await this.head('https://www.google.com', { timeout: 3000 });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const http = new Http();