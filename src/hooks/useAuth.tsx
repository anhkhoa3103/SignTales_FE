import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("signtales_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, name: string = "Người dùng") => {
    const newUser = {
      id: "1",
      name: name,
      email: email,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    };
    setUser(newUser);
    localStorage.setItem("signtales_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("signtales_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
