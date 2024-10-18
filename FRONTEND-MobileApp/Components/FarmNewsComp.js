import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Linking } from "react-native";

const FarmNewsComp = (props) => {
  const { img, title, date, logo, link } = props;

  const openURL = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#34777c",
        width: 280,
        height: 280,
        borderRadius: 15,
        marginLeft: 20,
        elevation: 10,
        marginRight: 14,
        marginTop: 50,
      }}
    >
      <Image
        source={{
          uri: img,
        }}
        style={{
          width: "100%",
          height: 140,
          borderRadius: 15,
        }}
      />

      <Text
        style={{
          color: "white",
          fontWeight: 800,
          fontSize: 16,
          textAlign: "center",
          marginTop: 10,
        }}
      >
        {title.length > 80 ? title.substring(0, 80) + "..." : title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: 600,
            top: 10,
            left: 10,
          }}
        >
          {date}
        </Text>
        <TouchableOpacity
          onPress={() => {
            openURL(link);
          }}
          style={{
            padding: 10,
            borderRadius: 15,
            alignItems: "center", // Center the image inside TouchableOpacity
            justifyContent: "center",
            right: 10,
          }}
        >
          <Image
            source={{
              uri: logo,
            }}
            style={{
              width: 40, // Adjust width to your preference
              height: 40, // Adjust height to your preference
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FarmNewsComp;
