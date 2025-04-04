import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class SpringApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.SPRING_URL,
      timeout: 5000,
    });
  }

  toSpring() {
    return this.axiosInstance;
  }

  async postLogout(accessToken: string) {
    return this.axiosInstance.post(
      '/api/user/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }
}
