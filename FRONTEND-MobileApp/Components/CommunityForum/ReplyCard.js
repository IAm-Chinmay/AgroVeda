import { View, Text } from "react-native";
import React from "react";

const ReplyCard = ({ reply, name }) => {
  return (
    <View
      style={{
        backgroundColor: "green",
        width: "90%",
        borderRadius: 15,
        margin: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "flex-start",
          alignItems: "flex-end",
          width: "40%",
        }}
      >
        <Text style={{ fontSize: 18, color: "white", fontWeight: 800 }}>
          {name}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: 18,
            color: "black",
            padding: 10,
            marginBottom: "2%",
            color: "white",
          }}
        >
          {reply}
        </Text>
      </View>
    </View>
  );
};

export default ReplyCard;
