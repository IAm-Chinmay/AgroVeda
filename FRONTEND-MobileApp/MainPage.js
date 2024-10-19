import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";

import { setUserInfo } from "./slice/userAuthSlice";

const MainPage = ({ navigation }) => {
  const dispatch = useDispatch();

  const LogOut = () => {
    dispatch(
      setUserInfo({
        userId: "",
        role: "",
        login: false,
      })
    );
  };
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
        <TouchableOpacity onPress={() => navigation.navigate("Test_Image")}>
          <View style={styles.boxView}>
            <Text
              style={{
                fontSize: 22,
                color: "white",
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
                fontSize: 22,
                color: "white",
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
        <TouchableOpacity
          onPress={() => navigation.navigate("croprecommendation")}
        >
          <View style={styles.boxView}>
            <Text
              style={{
                fontSize: 22,
                textAlign: "center",
                color: "white",
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
                fontSize: 22,
                color: "white",
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
        <TouchableOpacity
          onPress={() => navigation.navigate("community_forum")}
        >
          <View style={styles.boxView}>
            <Text
              style={{
                fontSize: 22,
                textAlign: "center",
                color: "white",
              }}
            >
              Community Forum
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("FarmerMarket")}>
          <View style={styles.boxView}>
            <Text
              style={{
                fontSize: 22,
                color: "white",
              }}
            >
              Market Place
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#B5C18E",
          width: "95%",
          height: 60,
          marginTop: 40,
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          marginLeft: "2.5%",
          borderRadius: 15,
          borderWidth: 1,
        }}
        onPress={LogOut}
      >
        <Text
          style={{
            color: "white",
            fontSize: 25,
          }}
        >
          Log Out
        </Text>
      </TouchableOpacity>
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
    borderWidth: 1,
    elevation: 8,
  },
});

export default MainPage;
