import Main from "./src/pages/Main";
import EditInterval from "./src/pages/EditInterval";
import PlayInterval from "./src/pages/PlayInterval";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={myTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Main} />
        <Stack.Screen name="PlayInterval" component={PlayInterval} />
        <Stack.Screen name="EditInterval" component={EditInterval} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const myTheme = {
  dark: true,
  colors: {
    background: "#84A59D",
    text: "#fff",
  },
};
