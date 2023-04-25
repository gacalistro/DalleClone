import { createContext, ReactNode, useEffect, useState } from "react";
import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";

export type UserPayloadProps = {
  id: string;
  name: string;
  email: string;
};

type loginDataType = {
  email: string;
  password: string;
};

type signinDataType = {
  name: string;
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  login: (data: loginDataType) => Promise<void>;
  signin: (data: signinDataType) => Promise<void>;
  logout: () => Promise<void>;
  user: UserPayloadProps | null;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserPayloadProps | null>(null);

  async function login({ email, password }: loginDataType) {
    await fetch("http://192.168.1.82:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }

        setItemAsync("dalle-user-token", data.token);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        throw error.message;
      });
  }

  async function signin({ name, email, password }: signinDataType) {
    await fetch("http://192.168.1.82:3000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }

        setItemAsync("dalle-user-token", data.token);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        throw error.message;
      });
  }

  async function logout() {
    // remove token and set user null
    setIsAuthenticated(false);
    setUser(null);
    deleteItemAsync("dalle-user-token");
  }

  useEffect(() => {
    getItemAsync("dalle-user-token").then((token) => {
      if (token) {
        fetch("http://192.168.1.82:3000/users", {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
          .then(async (response) => {
            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.error);
            }

            setIsAuthenticated(true);
            setUser({ ...data.payload });
          })
          .catch((error) => {
            logout();
          });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ logout, signin, login, user, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}
