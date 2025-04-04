import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class SpringApiService {
  private axiosInstance: AxiosInstance;
  private refreshToken?: string;

  constructor(refreshToken?: string) {
    this.refreshToken = refreshToken;

    this.axiosInstance = axios.create({
      baseURL: process.env.SPRING_URL,
      timeout: 5000,
      withCredentials: true,
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response?.status === 401 &&
          // config 는 단순 json 이므로 _isRetriable 플래그를 선언 (undefined = falsy)
          !originalRequest._isRetriable &&
          originalRequest.headers?.Authorization &&
          this.refreshToken
        ) {
          // 에러가 한번 났으면 더이상 재시도 하지 않음 true 로 상단 !_isRetriable 을 통과못하게 막음 -> 하단 reject
          originalRequest._isRetriable = true;
          try {
            const refreshRes = await this.axiosInstance.post(
              '/api/user/reissue',
              { refreshToken: this.refreshToken },
            );

            const newAccessToken = refreshRes.data.accessToken;
            // Authorization 헤더 교체
            originalRequest.headers['Authorization'] =
              `Bearer ${newAccessToken}`;

            return this.axiosInstance(originalRequest); // 원래 요청 재시도
          } catch (refreshError) {
            // refresh 실패 → 재로그인 유도
            return Promise.reject(refreshError);
          }
        }

        // accessToken 없거나 다른 에러 → 그대로 던지기
        return Promise.reject(error);
      },
    );
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
