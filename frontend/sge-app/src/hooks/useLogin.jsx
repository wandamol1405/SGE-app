import { create } from "zustand";
import { useEffect } from "react";

const useLogin = create((set) => ({
  user: "",
  login: (user) => {
    localStorage.setItem("email", user);
    set({ user: user });
  },
  logout: () => {
    localStorage.removeItem("email");
    set({ user: "" });
  },
}));

const useLoginWithEffect = () => {
  const loginStore = useLogin();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      loginStore.login(email);
    }
  }, []);

  return loginStore;
};

export default useLoginWithEffect;
