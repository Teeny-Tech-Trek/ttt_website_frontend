// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://api.teenytechtrek.com/api',
  
//   withCredentials: true, // so cookies (refresh token) are sent
//   headers: { 'Content-Type': 'application/json' },
// });

// export default api;

// // src/api/axios.ts
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api', // ✅ YOUR LOCAL BACKEND
//   withCredentials: true,
//   headers: { 'Content-Type': 'application/json' },
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.teenytechtrek.com/api', // ✅ Live backend only
  withCredentials: true, // ✅ Allows cookies/tokens
  headers: { 'Content-Type': 'application/json' },
});

// ✅ Optional: attach token automatically for secure routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
