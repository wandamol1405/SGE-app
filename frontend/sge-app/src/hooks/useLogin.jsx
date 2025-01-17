import { create } from "zustand";

const useLogin = create((set) => ({
  email: localStorage.getItem("email") || "",
  login: (user) => set({ email: user }),
  logout: () => set({ email: "" }),
}));

export default useLogin;
