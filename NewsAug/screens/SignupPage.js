import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "twrnc";

function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [name, setName] = useState("");
  // const [country, setCountry] = useState("");

  const handleSignup = async () => {
    if (!email || !password || !name || !confirmPassword) {
      alert("All fields are required!");
      return;
    }
  
    if (!isPasswordMatch) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      // Make the API call
      const response = await fetch("http://172.24.0.1:8081/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
          user_name: name.trim(),
        }),
      });
  
      // Parse the response as JSON
      const data = await response.json();
      // console.log("Yalahwyyyyyyyyy",data);
  
      if (data.message == "User created successfully") {
        // Handle successful signup
        const user_id = data.user_id;
        // const name = data.user_name;
        // alert("Signup successful!");
        navigation.navigate("Home", { user_id}); // Navigate to the login screen
      } else {
        // Handle server errors
        alert(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Unable to reach the server. Please try again later.");
    }
  };
  

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    // Check if the passwords match
    setIsPasswordMatch(text === password);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1 bg-white`} // Ensure background color is set here
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust this offset as needed
      >
        <ScrollView
          contentContainerStyle={tw`flex-grow justify-start pb-5`} // Use flex-grow to take available space, with padding to avoid cutoff
          showsVerticalScrollIndicator={false} // Optional: hide vertical scroll indicator
        >
          <View style={tw`flex-col`}>
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
            <Text style={tw`text-2xl font-bold text-center mt-10`}>
              Signup to NewsMaven
            </Text>
            <Text style={tw`text-gray-500 text-center mt-5 mx-10`}>
              Hello! Sign up to start using NewsMaven
            </Text>

            <View style={tw`flex items-center justify-center mt-20`}>
              <View style={tw`w-80`}>
                <TextInput
                  mode="outlined"
                  style={tw`rounded-full`}
                  selectionColor="#1F1F7B"
                  cursorColor="#1F1F7B"
                  activeOutlineColor="#1F1F7B"
                  textColor="black"
                  value={name}
                  onChangeText={setName}
                  placeholder="Full Name"
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
              <View style={tw`mt-5 w-80`}>
                <TextInput
                  mode="outlined"
                  secureTextEntry={true}
                  style={tw`rounded-full`}
                  selectionColor="#1F1F7B"
                  cursorColor="#1F1F7B"
                  activeOutlineColor="#1F1F7B"
                  textColor="black"
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                  placeholder="Confirm Password"
                  theme={{
                    colors: {
                      background: "#FFFFFF",
                    },
                    roundness: 50,
                  }}
                />
              </View>
              {!isPasswordMatch && (
                <Text style={tw`text-red-500 mt-2`}>
                  Passwords do not match!
                </Text> // Show error message
              )}
              {/* <View style={tw`mt-5 w-80`}>
                <TextInput
                  mode="outlined"
                  style={tw`rounded-full`}
                  selectionColor="#1F1F7B"
                  cursorColor="#1F1F7B"
                  activeOutlineColor="#1F1F7B"
                  textColor="black"
                  value={country}
                  onChangeText={setCountry}
                  placeholder="Country"
                  theme={{
                    colors: {
                      background: "#FFFFFF",
                    },
                    roundness: 50,
                  }}
                />
              </View> */}
              <TouchableOpacity
                style={[
                  tw`m-2 rounded-full py-3 px-12 mt-20`,
                  { backgroundColor: "#1F1F7B" },
                ]}
                onPress={handleSignup}
              >
                <Text style={tw`text-white text-2xl `}>Create an Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default Signup;
