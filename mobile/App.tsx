import React from "react";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { NativeBaseProvider, StatusBar } from "native-base";

import { AuthContextProvider } from "./src/contexts/AuthContext";

import { THEME } from "./src/styles/theme";
import { Loading } from "./src/components/Loading";
import { Signin } from "./src/screens/Signin";
import { NewPool } from "./src/screens/NewPool";
import { Pools } from "./src/screens/Pools";
import { FindPool } from "./src/screens/FindPool";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {
          fontsLoaded
            ? <Pools />
            : <Loading />
        }
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
