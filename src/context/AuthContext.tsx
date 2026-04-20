import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types/user";

export interface Notif {
  msg: string;
  time: string;
  color: string;
  read?: boolean;
}

interface AuthContextType {
  user: User | null;
  notifs: Notif[];
  login: (userData: User) => void;
  logout: () => void;
  addNotif: (notif: Omit<Notif, "read">) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [notifs, setNotifs] = useState<Notif[]>([
    {
      msg: "🚚 Order #FM1021 has been shipped!",
      time: "1 hour ago",
      color: "#1a5276",
      read: false,
    },
    {
      msg: "🎉 Welcome to FootballMonk!",
      time: "2 days ago",
      color: "#c49a2a",
      read: true,
    },
  ]);

  const addNotif = (notif: Omit<Notif, "read">) =>
    setNotifs((prev) => [{ ...notif, read: false }, ...prev]);

  const login = (userData: User) => {
    setUser(userData);
    addNotif({
      msg: `👋 Welcome back, ${userData.name}!`,
      time: "Just now",
      color: "#c49a2a",
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, notifs, login, logout, addNotif }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be inside AuthProvider");
  return ctx;
};
