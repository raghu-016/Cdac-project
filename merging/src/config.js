const API_GATEWAY = import.meta.env.VITE_API_GATEWAY_URL || "http://localhost:8080";

export const SERVICES = {
  AUTH: `${API_GATEWAY}/user-service/api/auth`,
  QUERY: `${API_GATEWAY}/query-service/api/queries`,
  ANSWER: `${API_GATEWAY}/answer-service/api/answers`,
  SUPPORT: `${API_GATEWAY}/support-service/api/support`,
  PROFILE: `${API_GATEWAY}/user-service/api/users`
};
