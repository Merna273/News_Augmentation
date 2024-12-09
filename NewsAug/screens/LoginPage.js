import React, { useState } from "react"; // Import useState
import {
  View,
  Text,
  //   TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "twrnc";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin =  async () => {
    // console.log("Email:", email);
    // console.log("Password:", password);
    if (!email.trim() || !password) {
      alert("Error", "Email and password are required.");
      return;
    }

    try {
      // Make the API call
      const response = await fetch("http://172.24.0.1:8081/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      // Parse the response as JSON
      const data = await response.json();

      if (response.ok) {
        // Successful login
        const user_id = data.user.id;
        // console.log(data);
        console.log(user_id);
        // alert("Login successful!");
        navigation.navigate("Home", { user_id }); // Navigate to the home screen
      } else {
        // Handle server-side errors
        alert("Login Failed", data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Error", "Unable to reach the server. Please try again later.");
    } 
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1 bg-white`} // Ensure background color is set here
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust this offset as needed
      >
        <ScrollView
          contentContainerStyle={tw`flex-grow justify-start pb-5`}
          showsVerticalScrollIndicator={false}
        >
          <View style={tw`flex-1 bg-white flex-col py-3`}>
            <TouchableOpacity
              style={tw`mt-15 ml-3`}
              onPress={() => navigation.navigate("SignupLogin")}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={30}
                color={"#1F1F7B"}
              />
            </TouchableOpacity>
            <Text style={tw`text-2xl font-bold text-center mt-5`}>
              Login to NewsMaven
            </Text>
            <Text style={tw`text-gray-500 text-center mt-5 mx-10`}>
              Welcome back! Sign in using email to
              continue using NewsMaven
            </Text>
            {/* <View style={tw`flex-row justify-around mx-15 mt-10`}>
              <TouchableOpacity
                style={tw`items-center border border-gray-400 rounded-full p-1`}
              >
                <MaterialCommunityIcons
                  name="facebook"
                  size={40}
                  color={"#1877F2"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`items-center border border-gray-400 rounded-full p-1`}
              >
                <MaterialCommunityIcons
                  name="google"
                  size={40}
                  color={"#D32F2F"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`items-center border border-gray-400 rounded-full p-1`}
              >
                <MaterialCommunityIcons
                  name="apple"
                  size={40}
                  color={"black"}
                />
              </TouchableOpacity>
            </View>
            <View style={tw`flex-row mt-15 items-center justify-around`}>
              <View style={tw`w-1/3 border-b border-gray-300`} />
              <Text style={tw`text-gray-400 text-lg`}>OR</Text>
              <View style={tw`w-1/3 border-b border-gray-300`} />
            </View> */}
            <View style={tw`flex items-center justify-center mt-25`}>
              <View style={tw`mt-5 w-80`}>
                <TextInput
                  mode="outlined"
                  style={tw`rounded-full`}
                  selectionColor="#1F1F7B"
                  cursorColor="#1F1F7B"
                  activeOutlineColor="#1F1F7B"
                  textColor="black"
                  value={email}
                  onChangeText={setEmail} // Update email state
                  placeholder="Email"
                  theme={{
                    colors: {
                      background: "#FFFFFF",
                    },
                    roundness: 50,
                  }}
                />
              </View>
              <View style={tw`mt-5 w-80`}>
                <TextInput
                  mode="outlined"
                  secureTextEntry={true}
                  style={tw`rounded-full`}
                  selectionColor="#1F1F7B"
                  cursorColor="#1F1F7B"
                  activeOutlineColor="#1F1F7B"
                  textColor="black"
                  value={password}
                  onChangeText={setPassword} // Update newPassword state
                  placeholder="Password"
                  theme={{
                    colors: {
                      background: "#FFFFFF",
                    },
                    roundness: 50,
                  }}
                />
              </View>

              <TouchableOpacity
                style={[
                  tw`m-2 rounded-full py-3 px-12 mt-10`,
                  { backgroundColor: "#1F1F7B" },
                ]}
                onPress={handleLogin}
              >
                <Text style={tw`text-white text-2xl `}>Login</Text>
              </TouchableOpacity>
              <View style={tw`flex-row mt-10`}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("PasswordForgot")}
                >
                  <Text style={[tw`text-lg`, { color: "#1F1F7B" }]}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default Login;
