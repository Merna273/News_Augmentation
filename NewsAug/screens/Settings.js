import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import tw from "twrnc";
import CustomAppBar from "../helpers/AppBar";

const Settings = ({ navigation, route }) => {
  const { user_id } = route.params;

  // State variables for each input field
  const [initialName, setInitialName] = useState("");
  const [initialEmail, setInitialEmail] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://172.24.0.1:8081/api/user/details/${user_id}`
        );
        const data = await response.json();

        if (response.ok) {
          setInitialName(data.user_name);
          setInitialEmail(data.email);
          setName(data.user_name);
          setEmail(data.email);
        } else {
          alert("Failed to fetch user details.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Unable to fetch user details. Please try again later.");
      }
    };

    fetchUserDetails();
  }, [user_id]);

  const handleSaveChanges = async () => {
    try {
      // Check if the name has been changed
      if (name !== initialName) {
        const response = await fetch(
          `http://172.24.0.1:8081/api/update-username/${user_id}/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              new_username: name.trim(),
            }),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          alert(data.message || "Failed to update name.");
          return;
        }
      }

      // Check if the email has been changed
      if (email !== initialEmail) {
        const response = await fetch(
          `http://172.24.0.1:8081/api/update-email/${user_id}/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              new_email: email.trim(),
            }),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          alert(data.message || "Failed to update email.");
          return;
        }
      }

      // Check if the password has been changed
      if (oldPassword && newPassword) {
        const response = await fetch(
          "http://172.24.0.1:8081/api/user/change-password/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: initialEmail.trim(), // Use the original email
              old_password: oldPassword,
              new_password: newPassword,
            }),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          alert(data.message || "Failed to change password.");
          return;
        }
      }

      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Unable to save changes. Please try again later.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={tw`flex-1`}>
        <CustomAppBar navigation={navigation} heading={"Settings"} user_id={user_id} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={tw`flex-1`}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <ScrollView contentContainerStyle={tw`flex-col justify-start`}>
            <View style={tw`flex-row items-center justify-center px-5 py-3`}>
              <Image
                source={require("../assets/user.png")}
                style={tw`w-24 h-24 rounded-full self-center mt-5`}
              />
            </View>

            {/* Name Field */}
            <View style={tw`m-2`}>
              <Text style={tw`mb-1 ml-4 text-black`}>Name</Text>
              <TextInput
                mode="outlined"
                style={tw`rounded-full`}
                selectionColor="#1F1F7B"
                cursorColor="#1F1F7B"
                activeOutlineColor="#1F1F7B"
                textColor="black"
                value={name}
                onChangeText={setName}
                placeholder="Name"
                theme={{
                  colors: {
                    background: "#FAFAFA",
                  },
                  roundness: 50,
                }}
              />
            </View>

            {/* Email Field */}
            <View style={tw`m-2`}>
              <Text style={tw`mb-1 ml-4 text-black`}>Email</Text>
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
                    background: "#FAFAFA",
                  },
                  roundness: 50,
                }}
              />
            </View>

            {/* Old Password */}
            <View style={tw`m-2`}>
              <Text style={tw`mb-1 ml-4 text-black`}>Old Password</Text>
              <TextInput
                mode="outlined"
                secureTextEntry={true}
                style={tw`rounded-full`}
                selectionColor="#1F1F7B"
                cursorColor="#1F1F7B"
                activeOutlineColor="#1F1F7B"
                textColor="black"
                value={oldPassword}
                onChangeText={setOldPassword}
                placeholder="Old Password"
                theme={{
                  colors: {
                    background: "#FAFAFA",
                  },
                  roundness: 50,
                }}
              />
            </View>

            {/* New Password */}
            <View style={tw`m-2`}>
              <Text style={tw`mb-1 ml-4 text-black`}>New Password</Text>
              <TextInput
                mode="outlined"
                secureTextEntry={true}
                style={tw`rounded-full`}
                selectionColor="#1F1F7B"
                cursorColor="#1F1F7B"
                activeOutlineColor="#1F1F7B"
                textColor="black"
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="New Password"
                theme={{
                  colors: {
                    background: "#FAFAFA",
                  },
                  roundness: 50,
                }}
              />
            </View>

            <View style={tw`flex items-center justify-center`}>
              <TouchableOpacity
                onPress={handleSaveChanges}
                style={[tw`m-10 rounded-full py-3 px-5`, { backgroundColor: "#1F1F7B" }]}
              >
                <Text style={tw`text-white text-2xl`}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Settings;
