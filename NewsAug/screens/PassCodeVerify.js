import React, { useState, useRef } from "react"; // Import useState
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


function PassCodeVerfiy({ navigation, route }) {
  const { user_email } = route.params;
  console.log("User Email: ", user_email);

  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");
  const [val4, setVal4] = useState("");
  const [val5, setVal5] = useState("");

   // Create refs for each input
   const val1Ref = useRef(null);
   const val2Ref = useRef(null);
   const val3Ref = useRef(null);
   const val4Ref = useRef(null);
   const val5Ref = useRef(null);

  const handleResendCode = async () => {
    try {
      const response = await fetch("http://172.24.0.1:8081/api/request-password-reset/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user_email.trim() }),
      });

      const data = await response.json();
      if (response.ok) {
        // alert(data.message || "Password reset email sent successfully.");
        navigation.navigate("PassCodeVerify", {
          user_email: user_email,
        });
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      alert(err.message || "Unable to connect to the server. Please try again later.");
    }
  };

  const handlePassCodeVerify = async () => {
    const resetToken = `${val1}${val2}${val3}${val4}${val5}`;
    console.log("Reset Token: ", resetToken);

    try {
      const response = await fetch("http://172.24.0.1:8081/api/check-reset-token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user_email.trim(),
          reset_token: resetToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate("ResetPass", {
          user_email: user_email,
        });
      } else {
        alert(data.message || "Invalid code. Please try again.");
      }
    } catch (err) {
      alert(err.message || "Unable to connect to the server. Please try again later.");
    }
  };

  const handleNextFocus = (nextInput) => {
    if (nextInput) {
      nextInput.focus();
    }
  };
  const handlePreviousFocus = (prevInput) => {
    if (prevInput) {
      prevInput.focus();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={tw`flex-1 bg-white flex-col`}>
        <TouchableOpacity
          style={tw`mt-15 ml-3`}
          onPress={() => navigation.navigate("PasswordForgot")}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={30}
            color={"#1F1F7B"}
          />
        </TouchableOpacity>

        <Text style={tw`text-2xl font-bold text-center mt-5`}>
          Forgot Password
        </Text>
        <Text style={tw`text-gray-500 text-center mt-5 mx-10`}>
          No worries. With just a click, you can reset your password
        </Text>

        <View style={tw`flex items-center justify-center mt-20`}>
          <View style={tw`flex-row items-center justify-around mx-20`}>
            <View style={tw`mx-1`}>
              <TextInput
                mode="outlined"
                style={[tw`rounded-sm h-15 py-1`, { textAlign: 'center' }]} // Center text
                selectionColor="#1F1F7B"
                cursorColor="#1F1F7B"
                activeOutlineColor="#1F1F7B"
                textColor="black"
                value={val1}
                onChangeText={(text) => {
                  setVal1(text);
                  if (text.length === 1) handleNextFocus(val2Ref.current);
                  else if (text.length === 0) handlePreviousFocus(null); // Can't go back
                }}
                theme={{
                  colors: {
                    background: "#FFFFFF",
                  },
                  roundness: 20,
                }}
                ref={val1Ref} // Attach the ref here
              />
            </View>

            <View style={tw`mx-1`}>
              <TextInput
                mode="outlined"
                style={[tw`rounded-sm h-15 py-1`, { textAlign: 'center' }]} // Center text
                selectionColor="#1F1F7B"
                cursorColor="#1F1F7B"
                activeOutlineColor="#1F1F7B"
                textColor="black"
                value={val2}
                onChangeText={(text) => {
                  setVal2(text);
                  if (text.length === 1) handleNextFocus(val3Ref.current);
                  else if (text.length === 0) handlePreviousFocus(val1Ref.current); // Go back to previous input
                }}
                theme={{
                  colors: {
                    background: "#FFFFFF",
                  },
                  roundness: 20,
                }}
                ref={val2Ref} // Attach the ref here
              />
            </View>

            <View style={tw`mx-1`}>
              <TextInput
                mode="outlined"
                style={[tw`rounded-sm h-15 py-1`, { textAlign: 'center' }]} // Center text
                selectionColor="#1F1F7B"
                cursorColor="#1F1F7B"
                activeOutlineColor="#1F1F7B"
                textColor="black"
                value={val3}
                onChangeText={(text) => {
                  setVal3(text);
                  if (text.length === 1) handleNextFocus(val4Ref.current);
                  else if (text.length === 0) handlePreviousFocus(val2Ref.current); // Go back to previous input
                }}
                theme={{
                  colors: {
                    background: "#FFFFFF",
                  },
                  roundness: 20,
                }}
                ref={val3Ref} // Attach the ref here
              />
            </View>

            <View style={tw`mx-1`}>
              <TextInput
                mode="outlined"
                style={[tw`rounded-sm h-15 py-1`, { textAlign: 'center' }]} // Center text
                selectionColor="#1F1F7B"
                cursorColor="#1F1F7B"
                activeOutlineColor="#1F1F7B"
                textColor="black"
                value={val4}
                onChangeText={(text) => {
                  setVal4(text);
                  if (text.length === 1) handleNextFocus(val5Ref.current);
                  else if (text.length === 0) handlePreviousFocus(val3Ref.current); // Go back to previous input
                }}
                theme={{
                  colors: {
                    background: "#FFFFFF",
                  },
                  roundness: 20,
                }}
                ref={val4Ref} // Attach the ref here
              />
            </View>

            <View style={tw`mx-1`}>
              <TextInput
                mode="outlined"
                style={[tw`rounded-sm h-15 py-1`, { textAlign: 'center' }]} // Center text
                selectionColor="#1F1F7B"
                cursorColor="#1F1F7B"
                activeOutlineColor="#1F1F7B"
                textColor="black"
                value={val5}
                onChangeText={(text) => {
                  setVal5(text);
                  if (text.length === 1) handleNextFocus(null); // No next input
                  else if (text.length === 0) handlePreviousFocus(val4Ref.current); // Go back to previous input
                }}
                theme={{
                  colors: {
                    background: "#FFFFFF",
                  },
                  roundness: 20,
                }}
                ref={val5Ref} // Attach the ref here
              />
            </View>
          </View>

          <TouchableOpacity
            style={[
              tw`m-2 rounded-full py-3 px-12 mt-20`,
              { backgroundColor: "#1F1F7B" },
            ]}
            onPress={handlePassCodeVerify}
          >
            <Text style={tw`text-white text-2xl `}>Verify Code</Text>
          </TouchableOpacity>
          <View style={tw`flex-row mt-10`}>
            <Text style={tw`text-gray-500 text-base`}>
              Haven’t got the email yet?
            </Text>
            <TouchableOpacity onPress={handleResendCode} style={tw`ml-2`}>
              <Text style={[tw`text-base`, { color: "#1F1F7B" }]}>
                Resend Code
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default PassCodeVerfiy;

