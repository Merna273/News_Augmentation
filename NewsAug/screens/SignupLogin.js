import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "twrnc";

function SignupLogin({ navigation }) {
  return (
    <View style={tw`flex-1 bg-white flex-col`}>
      <View style={tw`flex-1 justify-center`}>
        <Image
          source={require("../assets/logoT.png")}
          style={tw`w-70 h-70 items-center mx-auto`}
        />
        {/* <View style={tw`flex-row justify-around mx-15 mt-10`}>
          <TouchableOpacity
            style={tw`items-center border border-gray-400 rounded-100 p-1`}
          >
            <MaterialCommunityIcons
              name="facebook"
              size={40}
              color={"#1877F2"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`items-center border border-gray-400 rounded-100 p-1`}
          >
            <MaterialCommunityIcons name="google" size={40} color={"#D32F2F"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`items-center border border-gray-400 rounded-100 p-1`}
          >
            <MaterialCommunityIcons name="apple" size={40} color={"black"} />
          </TouchableOpacity>
        </View> */}
        {/* <View style={tw`flex-row mt-10 items-center justify-around`}>
          <View style={tw`w-1/3 border-b border-gray-300`} />
          <Text style={tw`text-gray-400 text-lg`}>OR</Text>
          <View style={tw`w-1/3 border-b border-gray-300`} />
        </View> */}
        <View style={tw`flex items-center justify-center mt-15`}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={[
              tw`m-2 rounded-full py-3 px-12`,
              { backgroundColor: "#1F1F7B" },
            ]}
          >
            <Text style={tw`text-white text-2xl `}>Signup</Text>
          </TouchableOpacity>
          <View style={tw`flex-row mt-10`}>
            <Text style={tw`text-gray-500 text-lg`}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={tw`ml-2`}
            >
              <Text style={[tw`text-lg`, { color: "#1F1F7B" }]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default SignupLogin;
