import { create } from "zustand";

const useLogin = create((set) => ({
  user: localStorage.getItem("email") || "",
  login: (user) => set({ user: user }),
  logout: () => set({ user: "" }),
}));

export default useLogin;
