import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { supabase } from "../lib/supabaseClient";
import type { User } from "../types/user";
import toast from "react-hot-toast";

export interface Notif {
  msg: string;
  time: string;
  color: string;
  read?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  notifs: Notif[];
  logout: () => Promise<void>;
  addNotif: (notif: Omit<Notif, "read">) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [notifs, setNotifs] = useState<Notif[]>([]);

  const addNotif = (notif: Omit<Notif, "read">) =>
    setNotifs((prev) => [{ ...notif, read: false }, ...prev]);

  useEffect(() => {
    // App load hone pe current session check karo
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const u = session.user;
        setUser({
          id: u.id,
          name: u.user_metadata?.full_name ?? u.email?.split("@")[0] ?? "User",
          email: u.email ?? "",
        });
      }
      setLoading(false);
    });

    // Auth state change
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const u = session.user;
        setUser({
          id: u.id,
          name: u.user_metadata?.full_name ?? u.email?.split("@")[0] ?? "User",
          email: u.email ?? "",
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await toast.promise(supabase.auth.signOut(), {
      loading: "Logging out...",
      success: "Logged out successfully!",
      error: "Error logging out. Please try again.",
    });

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, notifs, logout, addNotif }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be inside AuthProvider");
  return ctx;
};
