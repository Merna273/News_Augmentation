import React from "react";
import { View, Text, Image } from "react-native";
import tw from "twrnc";

const AIMessage = ({ message }) => {
  return (
    <View
      style={[
        tw`rounded-lg rounded-tl-none px-5 py-3 mx-3 my-2 ml-14`,
        {
          alignSelf: "flex-start",
          backgroundColor: "#F7F7F7",
          maxWidth: "80%",
        },
      ]}
    >
      <Image
        source={require("../assets/robot.png")}
        style={tw`w-12 h-12 rounded-full absolute -top-1 -left-13`}
      ></Image>
      <Text style={tw`text-black`}>{message}</Text>
    </View>
  );
};

export default AIMessage;
