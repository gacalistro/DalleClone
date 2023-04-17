import { createBrowserRouter, redirect } from "react-router-dom";
import { Cookies } from "react-cookie";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignIn } from "./pages/Signin";
import { CreateImage } from "./pages/CreateImage";
import { History } from "./pages/History";

const cookies = new Cookies();

// Get token from cookies or null
const getToken = () => cookies.get("dalle-user-token") || null;

// If there is a valid and verified token, it returns user payload. Otherwise, if there are any invalid token, it will delete it.
const authUser = async (token: string) => {
  try {
    return await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      return data.payload;
    });
  } catch (error) {
    console.log(error);
    cookies.remove("dalle-user-token");
    return null;
  }
};

// Redirect to Home Page if there is a user token in cookies
const verifyCookie = () => {
  const token = getToken();

  return token ? redirect("/") : null;
};

// Return user data if user has a valid and verified token
const verifyUser = async () => {
  const token = getToken();

  if (!token) {
    return redirect("/login");
  }

  const userData = await authUser(token);

  if (!!userData) {
    return userData;
  } else {
    return redirect("/login");
  }
};

// Router
export const router = createBrowserRouter([
  {
    path: "signin",
    Component: SignIn,
    loader: verifyCookie,
  },
  {
    path: "login",
    Component: Login,
    loader: verifyCookie,
  },
  {
    path: "/",
    Component: Home,
    loader: verifyUser,
  },
  {
    path: "create",
    Component: CreateImage,
    loader: verifyUser,
  },
  {
    path: "history",
    Component: History,
    loader: verifyUser,
  },
]);
