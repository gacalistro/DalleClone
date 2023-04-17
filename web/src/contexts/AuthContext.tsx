import { ReactNode, createContext } from "react";
import { CookiesProvider } from "react-cookie";
import { useCookies } from "react-cookie";

type SignInData = {
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

type AuthContextType = {
  signIn: (data: SignInData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [cookies, setCookie, removeCookie] = useCookies(["dalle-user-token"]);

  async function signIn({ name, email, password }: SignInData) {
    await fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }

        setCookie("dalle-user-token", data.token, {
          maxAge: 60 * 60 * 1, // 1 hour
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  async function login({ email, password }: LoginData) {
    await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }

        setCookie("dalle-user-token", data.token, {
          maxAge: 60 * 60 * 1, // 1 hour
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  function signOut() {
    removeCookie("dalle-user-token");
  }

  return (
    <AuthContext.Provider value={{ signIn, login, signOut }}>
      <CookiesProvider>{children}</CookiesProvider>
    </AuthContext.Provider>
  );
}
