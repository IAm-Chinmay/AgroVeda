import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const MainPage = ({ navigation }) => {
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          top: 30,
          fontSize: 40,
          fontWeight: 800,
          color: "#9B4444",
        }}
      >
        AgroVeda
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity>
          <View style={styles.boxView}>
            <Text
              style={{
                fontSize: 25,
              }}
            >
              Diagnose
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Weather_updates")}
        >
          <View style={styles.boxView}>
            <Text
              style={{
                fontSize: 25,
              }}
            >
              Weather
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",

          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity>
          <View style={styles.boxView}>
            <Text
              style={{
                fontSize: 25,
                textAlign: "center",
              }}
            >
              Crop Recommend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("mandi")}>
          <View style={styles.boxView}>
            <Text
              style={{
                fontSize: 25,
              }}
            >
              Mandi
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",

          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity>
          <View style={styles.boxView}>
            <Text
              style={{
                fontSize: 25,
                textAlign: "center",
              }}
            >
              Community Forum
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.boxView}>
            <Text
              style={{
                fontSize: 25,
              }}
            >
              Market Place
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxView: {
    backgroundColor: "#B5C18E",
    width: 150,
    height: 150,
    marginTop: 80,
    marginLeft: 20,
    borderRadius: 105,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MainPage;
