import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContext } from "../contexts/AuthContext";

import { Signin } from "../screens/Signin";
import { Login } from "../screens/Login";
import { Home } from "../screens/Home";
import { Create } from "../screens/Create";
import { History } from "../screens/History";

export function Routes() {
  const { Navigator, Screen } = createNativeStackNavigator();

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        {isAuthenticated ? (
          <>
            <Screen name="Home" component={Home} />
            <Screen name="Create" component={Create} />
            <Screen name="History" component={History} />
          </>
        ) : (
          <>
            <Screen name="Login" component={Login} />
            <Screen name="Signin" component={Signin} />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
}
