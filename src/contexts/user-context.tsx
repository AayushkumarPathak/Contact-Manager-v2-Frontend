// context/UserContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import type { User } from "@/types/index";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  initialize: () => Promise<void>;
}

const defaultContext: UserContextType = {
  user: null,
  setUser: () => {},
  loading: true,
  initialize: async () => {},
};

export const UserContext = createContext<UserContextType>(defaultContext);

export const useUserContext = () => useContext(UserContext);

// Util: fetch user from localStorage
const getCurrUserDetails = (): User | null => {
  const tokenStr = localStorage.getItem("loginToken");
  if (tokenStr) {
    try {
      const parsed = JSON.parse(tokenStr);
      return parsed.userDto as User;
    } catch (e) {
      console.error("Invalid token structure:", e);
    }
  }
  return null;
};

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const initialize = async () => {
    setLoading(true);
    try {
      const savedUser = getCurrUserDetails();
      if (savedUser) {
        setUser(savedUser);
      }
    } catch (error) {
      console.error('Error initializing user context:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, initialize }}>
      {children}
    </UserContext.Provider>
  );
};


