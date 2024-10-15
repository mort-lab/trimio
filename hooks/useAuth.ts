// hooks/useAuth.ts
import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const { login, register, logout, user } = useAuthStore();

  return {
    login,
    register,
    logout,
    user,
  };
};
