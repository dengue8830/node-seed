import axios, { AxiosInstance, AxiosPromise } from 'axios';

export interface HttpError {
  status: number;
}

export enum HttpErrorCode {
  Unauthorized = 401
}

export interface HttpResponse {
  data: any;
  status: number;
}

class Http {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create();
  }

  setBaseUrl(baseUrl: string) {
    this.instance.defaults.baseURL = baseUrl;
  }

  setCredentials(token: string) {
    this.instance.defaults.headers.common.Authorization = 'bearer ' + token;
  }

  // prepareError(error: any) {
  //   error.extra = JSON.stringify({
  //     url: error.response.responseURL,
  //     status: error.response.status,
  //     method: error.config.method,
  //     response: error.response.responseText,
  //   });
  // }

  private tratarRequest(axiosPromise: AxiosPromise): Promise<any> {
    return new Promise((resolve, reject) => {
      axiosPromise.then(res => {
        resolve({ data: res.data, status: res.status });
      }).catch(error => {
        // this.prepareError(error);
        reject({ status: error.response.status } as HttpError);
      });
    });
  }

  get(url: string, config?: any): Promise<HttpResponse> {
    return this.tratarRequest(this.instance.get(url, config));
  }

  post(url: string, data?: any, config?: any): Promise<HttpResponse> {
    return this.tratarRequest(this.instance.post(url, data, config));
  }

  put(url: string, data?: any, config?: any): Promise<HttpResponse> {
    return this.tratarRequest(this.instance.put(url, data, config));
  }

  delete(url: string, config?: any): Promise<HttpResponse> {
    return this.tratarRequest(this.instance.delete(url, config));
  }
}

export const http = new Http();