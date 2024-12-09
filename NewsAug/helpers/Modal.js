import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Platform,
  Dimensions,
  StatusBar,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import tw from "twrnc";

const CustomModal = ({ visible, onClose, navigation, user_id, clearChat}) => {
  // console.log("Modal User Id: ", user_id);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://172.24.0.1:8081/api/user/details/${user_id}`
        );
        const data = await response.json();

        if (response.ok) {
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
 

  const CloseModal = () => {
    onClose();
  };
  const navigateToSettings = () => {
    CloseModal();
    navigation.navigate("Settings", { user_id });
  };

  const navigateToHistory = () => {
    CloseModal();
    navigation.navigate("History", { user_id });
  };

  const navigateToChatbot = () => {
    if (clearChat)
        clearChat();
    CloseModal();
    navigation.navigate("Chatbot", { user_id });
  };

  const setModalVisible = (value) => {
    visible = value;
  };
  if (!visible) {
    return null;
  }

  const deviceHeight = Dimensions.get("window").height;
  const statusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight : 0;

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Modal
        isVisible={visible}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        onBackdropPress={CloseModal}
        style={tw`m-0`}
      >
        {/* <View style={tw`bg-white w-3/4 h-full pt-20 rounded-r-3xl flex-col `}> */}
        <View
          style={[
            tw`bg-white w-3/4 pt-20 rounded-r-3xl flex-col`,
            { height: deviceHeight + statusBarHeight }, // Adjust height for Android status bar
          ]}
        >
          <View style={tw`flex-row justify-evenly`}>
            <Image
              source={require("../assets/user.png")}
              style={tw`w-17 h-17 rounded-full `}
            ></Image>
            {/* CHANGE IT TO VALUES FROM THE DATABASE */}
            <View style={tw`flex-col pt-3 pl-1`}>
              <Text style={tw`text-black text-xl`}>{name}</Text>
              <Text style={tw`text-gray-400 text-sm`}>{email}</Text>
            </View>
          </View>
          <View style={tw`pt-10 pl-10`}>
            <TouchableOpacity
              style={tw`flex-row`}
              // onPress={() => toggleCategoryList()}
              onPress={navigateToChatbot}
            >
              <MaterialCommunityIcons name="plus" size={30} color="black" />
              <Text style={tw`text-black text-2xl pl-4`}>New Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-row  pt-10`}
              onPress={navigateToHistory}
            >
              <MaterialCommunityIcons name="history" size={30} color="black" />
              <Text style={tw`text-black text-2xl pl-4`}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-row pt-10`}
              onPress={navigateToSettings}
            >
              <MaterialCommunityIcons name="cog" size={30} color="black" />
              <Text style={tw`text-black text-2xl pl-4`}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default CustomModal;
