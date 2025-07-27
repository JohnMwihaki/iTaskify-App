import { create } from "zustand";

interface AuthState {
  token: string | null;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    userName:string;
    email: string;
    avatar?: string;
  } | null;
  isAuthenticated: boolean;
  login: (token: string, user: AuthState["user"]) => void;
  logout: () => void;
  setUser: (user: AuthState["user"]) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  login: (token, user) =>
    set({
      token,
      user,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    }),
  setUser: (user) =>
    set((state) => ({
      ...state,
      user,
    })),
}));
