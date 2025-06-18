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
}

const defaultContext: UserContextType = {
  user: null,
  setUser: () => {},
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

export const initializeUserContext = () => {
  const savedUser = getCurrUserDetails();
  return savedUser;
};

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = getCurrUserDetails();
    setUser(savedUser);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
