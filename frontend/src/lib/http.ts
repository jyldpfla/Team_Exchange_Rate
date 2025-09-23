// src/lib/http.ts
import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  withCredentials: true, // 세션/쿠키 쓰면 true
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    // 공통 에러 처리 (토큰 만료 등)
    if (err.response?.status === 401) {
      // 예: 로그인 페이지로 이동
      // window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)
