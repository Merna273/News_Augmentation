import CustomAppBar from "../helpers/AppBar";
import { SafeAreaView } from "react-native";
import { View, Image } from "react-native";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import tw from "twrnc";
import React, { useEffect } from "react";

const Home = ({ navigation, route }) => {
  const { user_id} = route.params; // Retrieve chat_id from navigation params
  console.log("Home User Id: ", user_id);
  // console.log(userId)
  // const [name, setName] = React.useState("");
  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://172.24.0.1:8081/api/user/details/${user_id}`
  //       );
  //       const data = await response.json();

  //       if (response.ok) {
  //         setName(data.user_name);
  //         // setEmail(data.email);
  //       } else {
  //         alert("Failed to fetch user details.");
  //       }
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //       alert("Unable to fetch user details. Please try again later.");
  //     }
  //   };

  //   fetchUserDetails();
  // }, [user_id]);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <CustomAppBar navigation={navigation} heading={"Home"} user_id={user_id} />
      <View style={tw`flex-1 justify-around`}>
        <View style={tw`flex-1 justify-center`}>
          <Image
            source={require("../assets/logoT.png")}
            style={tw`w-60 h-60 items-center mx-auto `}
          />
        </View>
        <View
          style={[
            tw`flex-col items-center bg-gray-200 mx-5 py-15 rounded-3xl mb-5`,
            { backgroundColor: "#E8E8E8" },
          ]}
        >
          <Text style={[tw`text-gray-400 text-3xl mb-5`, { color: "#1F1F7B" }]}>
            Hello 👋!
          </Text>
          <Text
            style={[
              tw`text-gray-400 text-base mb-5 mx-5`,
              { color: "#1F1F7B", textAlign: "center" },
            ]}
          >
            Welcome to NewsMaven, the latest news at the tip of your finger!
          </Text>
          <View style={tw`flex items-center justify-center `}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Chatbot", {
                  user_id: user_id,
                })
              }
              style={[
                tw`m-2 rounded-full py-3 px-5`,
                { backgroundColor: "#1F1F7B" },
              ]}
            >
              <Text style={tw`text-white text-2xl `}>Start Conversation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Home;
