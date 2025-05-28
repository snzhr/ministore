import axios from "axios";

export const api = axios
  .create({
    baseURL: "http://localhost:3000/api/v1",
  })
  
  // create public instance
  // we may have multiple instances
  
  
  api.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use((response) => {
    return response
  }, async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.response?.data?.message === "TOKEN_EXPIRED") {
      try {
        const refreshToken = localStorage.getItem('refresh_token'); // Retrieve the stored refresh token.
        // console.log("refreshToken", refreshToken);
        
        // Make a request to your auth server to refresh the token.
        const response = await api.post('/auth/refresh-token', {
          refreshToken,
        });
        const { access_token, refresh_token: newRefreshToken } = response.data;
        // Store the new access and refresh tokens.
        localStorage.setItem('token', access_token);
        localStorage.setItem('refresh_token', newRefreshToken);
      //   // Update the authorization header with the new access token.
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        return api(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        // console.error('Token refresh failed:', refreshError);
        // localStorage.removeItem('accessToken');
        // localStorage.removeItem('refreshToken');
      //   // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  });
