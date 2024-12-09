import React, { useState, useCallback } from "react";
import {
  View,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import tw from "twrnc";
import CustomAppBar from "../helpers/AppBar";
import SenderMessage from "../helpers/SenderMessage";
import AIMessage from "../helpers/AIMessage";

const Chatbot = ({ navigation , route }) => {
  const { user_id } = route.params;
  // console.log("Chatbot User Id: ", user_id);
  const [messages, setMessages] = useState([]);
  const [newsQuery, setNewsQuery] = useState("");
  const [chatId, setChatId] = useState(null);

  const clearChat = useCallback(() => {
    // Clear messages and reset chatId when starting a new chat
    setMessages([]);
    setChatId(null);
  }, []);

  const sendQuery = async () => {
    if (newsQuery.trim() !== "") {
      const userMessage = {
        id: Date.now().toString(),
        message: newsQuery,
        sender: "user",
      };

      // Immediately update the state with the user message
      setMessages((prevMessages) => [userMessage, ...prevMessages]);
      // console.log("User Message:", userMessage);

      // Clear the input field after sending the message
      setNewsQuery("");
      
      let currentChatId = chatId;
      // Save the first query as the chat title and get chat_id
      var i = 0;
      var j = 0;
      if (currentChatId == null) {
        currentChatId = await saveChatHistory(userMessage.message); 
        // console.log("Chat ID Here:", currentChatId);
        setChatId(currentChatId); // Save the chat_id
        // console.log("Chat ID saved as:", chatId);
        console.log("I entered here in the if with counter: ", i);
        // await saveMessage(currentChatId, userMessage.message, "user");
        i++;
      }
      else{
        console.log("I entered here in the else with counter: ", j);
        // await saveMessage(chatId, userMessage.message, "user");
        j++;
      }
      

      try {
        // Make the API call
        const response = await fetch("http://172.24.0.1:8081/api/process-query/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_query: newsQuery, thread_id: currentChatId }),
        });

        // Parse the response as JSON
        const data = await response.json();

        // console.log("AI Response:", data);

        // Extract the AI response from the data
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          message: data.generated_response,
          sender: "ai",
        };

        // Add the AI response to the chat messages
        setMessages((prevMessages) => [aiMessage, ...prevMessages]);
        // Save the AI's message
        if (chatId) {
          // await saveMessage(chatId, aiMessage.message, "agent");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        // Handle errors (e.g., network issues)
        const errorMessage = {
          id: (Date.now() + 1).toString(),
          message: "Unable to reach the server. Please try again later.",
          sender: "ai",
        };
        setMessages((prevMessages) => [errorMessage, ...prevMessages]);
        if (chatId) {
          // await saveMessage(chatId, aiMessage.message, "agent");
        }
      }
    }
  };
  const saveChatHistory = async (chatName) => {
    try {
      const response = await fetch(`http://172.24.0.1:8081/api/history-save/${user_id}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_name: chatName, // Use the first query as the chat title
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("Chat history saved successfully:", data);
        // console.log("Chat ID:", data.data.chat_id);
        return data.data.chat_id;
      } else {
        console.error("Failed to save chat history title");
      }
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
  };
  const saveMessage = async (chat_id, message, sender) => {
    console.log("Here in saveMessage:");
    try {
      const response = await fetch(
        `http://172.24.0.1:8081/api/chat-history-save/${chat_id}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_text: message,
            sender_type: sender, // 'user' or 'agent'
          }),
        }
      );

      if (response.ok) {
        console.log("Message saved successfully");
      } else {
        console.error("Failed to save message");
      }
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };
  return (
    <SafeAreaView style={tw`flex-1`}>
      <CustomAppBar navigation={navigation} heading={"NewsMaven"} user_id={user_id} clearChat={clearChat} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            inverted
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return item.sender === "user" ? (
                <SenderMessage message={item.message} />
              ) : (
                <AIMessage message={item.message} />
              );
            }}
          />
        </TouchableWithoutFeedback>
        <View
          style={tw`flex-row justify-between items-center border-t border-gray-200 px-5 py-2`}
        >
          <TextInput
            mode="outlined"
            style={tw`flex-1 mr-2 rounded-full`}
            selectionColor="#1F1F7B"
            cursorColor="#1F1F7B"
            activeOutlineColor="#1F1F7B"
            textColor="black"
            numberOfLines={3}
            placeholder="Ask me anything..."
            theme={{
              colors: {
                background: "#FAFAFA",
              },
              roundness: 50,
            }}
            value={newsQuery}
            onChangeText={(text) => setNewsQuery(text)}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#1F1F7B",
              borderRadius: 29,
              width: 58,
              height: 58,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={sendQuery}
          >
            <MaterialCommunityIcons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chatbot;

