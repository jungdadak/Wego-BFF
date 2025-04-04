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
            // 백엔드 리프레시 토큰 호출
            const refreshRes = await this.axiosInstance.post(
              '/api/user/reissue',
              { refreshToken: this.refreshToken },
            );
            console.log('리프레시 토큰으로 새 엑세스 토큰 발급', refreshRes);

            const newAccessToken = refreshRes.data.accessToken;
            // Authorization 헤더 교체
            originalRequest.headers['Authorization'] =
              `Bearer ${newAccessToken}`;
            console.log('새 엑세스 토큰 헤더에 잘 넣었음:', newAccessToken);

            // 새 엑세스토큰을 컨트롤러로 끌어올려야 쿠키를 세팅할수 있어서 여기서 선언 및 할당 ( 에러컨피그 프로퍼티에 걍 추가 )
            originalRequest._newAccessToken = newAccessToken;
            console.log(
              'axios config 객체에 새 엑세스 토큰 끼워넣어서 컨트롤러로 전송',
            );

            return this.axiosInstance(originalRequest); // 원래 요청 재시도
          } catch (refreshError) {
            // refresh 실패 → 재로그인 유도
            console.log('리프레시 실패 다시 로그인하세요');
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
