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

function PasswordForgot({ navigation }) {
  const [email, setEmail] = useState("");

  const handlePassForgot = async () => {
    // setLoading(true); // Start loading
    console.log("Email:", email);
    try {
      // Replace with your API endpoint
      const response = await fetch("http://172.24.0.1:8081/api/request-password-reset/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        // Navigate to the PassCodeVerify screen if API call is successful
        // alert(data.message || "Password reset email sent successfully.");   
        navigation.navigate("PassCodeVerify",{
          user_email: email,
        })
      } else {
        // Display error message from the API response
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Unable to connect to the server. Please try again later.");
    } 
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={tw`flex-1 bg-white flex-col`}>
        <TouchableOpacity
          style={tw`mt-15 ml-3`}
          onPress={() => navigation.navigate("Login")}
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
              style={tw`rounded-full`}
              selectionColor="#1F1F7B"
              cursorColor="#1F1F7B"
              activeOutlineColor="#1F1F7B"
              textColor="black"
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
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
            onPress={handlePassForgot}
          >
            <Text style={tw`text-white text-2xl `}>Reset Password</Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default PasswordForgot;
