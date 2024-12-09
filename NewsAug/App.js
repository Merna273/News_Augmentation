import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import Chatbot from "./screens/Chatbot";
import Settings from "./screens/Settings";
import Home from "./screens/Home";
import History from "./screens/History";
import SignupLogin from "./screens/SignupLogin";
import Login from "./screens/LoginPage";
import Signup from "./screens/SignupPage";
import PasswordForgot from "./screens/PasswordForgot";
import PassCodeVerify from "./screens/PassCodeVerify";
import ResetPass from "./screens/ResetPass";
import HistChat from "./screens/HistChat";
import tw from "twrnc";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer style={tw`flex-1`}>
      <Stack.Navigator initialRouteName="SignupLogin">
        <Stack.Screen
          name="SignupLogin"
          component={SignupLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PasswordForgot"
          component={PasswordForgot}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PassCodeVerify"
          component={PassCodeVerify}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPass"
          component={ResetPass}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chatbot"
          component={Chatbot}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HistChat"
          component={HistChat}
          options={{ headerShown: false }}
        />
        {/* <PaperProvider>
          <View style={tw`flex-1`}>
            <Chatbot />
            <StatusBar style="auto" />
          </View>
        </PaperProvider> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
