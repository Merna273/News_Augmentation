import React, { useState, useEffect } from "react";
import CustomAppBar from "../helpers/AppBar";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import tw from "twrnc";

const History = ({ navigation, route }) => {
  const { user_id } = route.params;
  console.log("History User Id: ", user_id);
  const [historyTitles, setHistoryTitles] = useState({});

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Call the API with the user_id
        const response = await fetch(
          `http://172.24.0.1:8081/api/history/${user_id}`
        );
        const data = await response.json();

        if (response.ok) {
          // Group titles by date (formatted from time_stamp)
          const groupedHistory = data.reduce((acc, item) => {
            const date = new Date(item.time_stamp).toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(item);
            return acc;
          }, {});

          // Set grouped data
          setHistoryTitles(groupedHistory);
        } else {
          console.error("Failed to fetch history:", data.message);
          // alert("Error fetching history.");
        }
      } catch (error) {
        console.error("Error fetching history:", error);
        // alert("Unable to fetch history. Please try again later.");
      }
    };

    fetchHistory();
  }, [user_id]);

  // Function to convert date format and compare it properly (latest date first)
  const sortDatesDescending = (dates) => {
    return dates.sort((a, b) => {
      const [dayA, monthA, yearA] = a.split("/").map(Number);
      const [dayB, monthB, yearB] = b.split("/").map(Number);

      // Compare based on year, then month, then day
      if (yearA !== yearB) {
        return yearB - yearA; // Sort by year (descending)
      } else if (monthA !== monthB) {
        return monthB - monthA; // Sort by month (descending)
      } else {
        return dayB - dayA; // Sort by day (descending)
      }
    });
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <CustomAppBar navigation={navigation} heading={"History"} user_id={user_id} />
      <View style={tw`flex-col`}>
        <ScrollView style={tw`mt-10`}>
          {sortDatesDescending(Object.keys(historyTitles)).map(
            (date, index) => (
              <View key={index} style={tw`mb-6`}>
                <View style={tw`flex-row items-center justify-start mb-3 mx-3`}>
                  <Text style={tw`text-gray-400 text-lg mr-1`}>{date}</Text>
                  <View style={tw`w-3/4 border-b border-gray-300`} />
                </View>
                {Array.isArray(historyTitles[date]) &&
                  historyTitles[date].map((item, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={tw`mt-2 mr-20`}
                      onPress={() =>
                        navigation.navigate("HistChat", {
                          chat_id: item.chat_id, // Send chat_id
                          user_id: user_id, // Send user_id
                        })
                      }
                    >
                      <View style={tw`flex-row items-center`}>
                        <Image
                          source={require("../assets/history_icon.png")}
                          style={tw`w-12 h-12 mr-5 ml-4`}
                        />
                        <Text style={[tw`text-black`, { fontSize: 17 }]}>
                          {item.chat_name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            )
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default History;

