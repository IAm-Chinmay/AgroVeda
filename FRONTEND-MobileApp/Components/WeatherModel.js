import { View, Text, Button, Pressable, Image } from "react-native";
import React from "react";

const WeatherModel = ({ navigation, route }) => {
  //   const isPresented = router.canGoBack();
  const { rain, name, img, humidity, wind, temp } = route.params;
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#eae8e7",
        marginTop: 400,
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
        borderColor: "black",
        borderWidth: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          marginTop: 30,
        }}
      >
        <Image
          source={{
            uri: `https:${img}`,
          }}
          style={{
            width: 140,
            height: 140,
            resizeMode: "contain",
            alignItems: "center",
          }}
        />
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: 800,
              color: "#155e63",
            }}
          >
            {name}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
          marginBottom: 50,
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              marginTop: 50,
              fontSize: 18,
              color: "#155e63",
            }}
          >
            Max Wind : {wind}
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginTop: 20,
              color: "#155e63",
            }}
          >
            Avg Tempreature : {temp} °C
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              marginTop: 50,
              color: "#155e63",
            }}
          >
            Humidity : {humidity} %
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginTop: 20,
              color: "#155e63",
            }}
          >
            Rain : {rain} %
          </Text>
        </View>
      </View>
      <Pressable
        style={{
          backgroundColor: "#155e63",
          width: 100,
          height: 45,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
          elevation: 8,
        }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "white", fontSize: 25 }}>Close</Text>
      </Pressable>
    </View>
  );
};

export default WeatherModel;
