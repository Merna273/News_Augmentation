//create a react native function
import React from "react";
import { View, Text, Image } from "react-native";
import tw from "twrnc";

const SenderMessage = ({ message }) => {
  console.log(message);
  return (
    <View
      style={[
        tw`rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2 mr-14`,
        {
          alignSelf: "flex-start",
          marginLeft: "auto",
          backgroundColor: "#F7F7F7",
          maxWidth: "80%",
        },
      ]}
    >
      <Text style={tw`text-black`}>{message}</Text>
      <Image
        source={require("../assets/user.png")}
        style={tw`w-12 h-12 rounded-full absolute -top-1 -right-13`}
      ></Image>
    </View>
  );
};
export default SenderMessage;
