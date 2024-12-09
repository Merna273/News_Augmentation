import React, { useState } from "react"; // Import useState
import {
  View,
  Text,
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

function ResetPass({ navigation, route }) {
  const { user_email } = route.params;
  console.log("User Email: ", user_email);
  const [password, setPassword] = useState("");

  const handleLogin = async() => {
    try {
      // Make the API call
      const response = await fetch("http://172.24.0.1:8081/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user_email.trim(),
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

  const handleResetPass = async () => {
    try {
      const response = await fetch("http://172.24.0.1:8081/api/reset-password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user_email.trim(),
          new_password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Password reset success, navigate to login screen
        // alert("Password reset successfully. Please log in with your new password.");
        handleLogin();
      } else {
        // API returned an error
        alert(data.message || "Failed to reset password. Please try again.");
      }
    } catch (err) {
      // Handle network or server errors
      alert(err.message || "Unable to connect to the server. Please try again later.");
    } 
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={tw`flex-1 bg-white flex-col`}>
        <TouchableOpacity
          style={tw`mt-15 ml-3`}
          onPress={() => navigation.navigate("PassCodeVerify", { user_email:user_email, })}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={30}
            color={"#1F1F7B"}
          />
        </TouchableOpacity>
        {/* <View style={tw`flex-1 justify-center`}> */}
        <Text style={tw`text-2xl font-bold text-center mt-5`}>
          Forgot Password
        </Text>
        <Text style={tw`text-gray-500 text-center mt-5 mx-10`}>
          No worries. With just a click, you can rest your password
        </Text>
        <View style={tw`flex items-center justify-center mt-10`}>
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
            onPress={handleResetPass}
          >
            <Text style={tw`text-white text-2xl `}>Reset Password</Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ResetPass;
