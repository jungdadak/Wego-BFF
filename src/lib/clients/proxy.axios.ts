import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _isRetriable?: boolean;
  _newAccessToken?: string;
}

export function createProxyAxiosInstance(refreshToken?: string): AxiosInstance {
  const instance = axios.create({
    baseURL: process.env.SPRING_URL, // Spring 백엔드 URL
    timeout: 5000,
    withCredentials: true,
  });

  // 응답 인터셉터를 통해 401 발생 시 토큰 재발급 처리
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;
      if (
        error.response?.status === 401 &&
        !originalRequest._isRetriable &&
        originalRequest.headers?.Authorization &&
        refreshToken
      ) {
        // 재시도 플래그 설정 (무한 루프 방지)
        originalRequest._isRetriable = true;
        try {
          // refreshToken을 사용해 새로운 accessToken 요청
          const res = await instance.post('/api/user/reissue', {
            refreshToken,
          });
          const newAccessToken = res.data.accessToken;
          // 요청 헤더 업데이트
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          // 컨트롤러에서 쿠키 업데이트에 사용할 수 있도록 _newAccessToken에 저장
          originalRequest._newAccessToken = newAccessToken;
          return instance(originalRequest); // 원래 요청 재시도
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
}
