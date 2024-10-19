import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const DetailedCropRecommendation = ({ route }) => {
  const { crop_name, img, market_price, video, steps } = route.params;
  const navigation = useNavigation();
  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  console.log(video);
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 10,
      }}
    >
      <Image
        source={{
          uri: img,
        }}
        width={"100%"}
        height={320}
        style={{
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}
        resizeMode="cover"
      />
      <View
        style={{
          marginLeft: 20,
        }}
      >
        <Text
          style={{
            fontSize: 48,
            marginVertical: 1,
            fontWeight: 600,
          }}
        >
          {capitalizeFirstLetter(crop_name)}
        </Text>
        <Text
          style={{
            fontWeight: 200,
            marginTop: 10,
            fontSize: 18,
          }}
        >
          Current market price is {capitalizeFirstLetter(market_price)}
        </Text>
      </View>
      <View>
        <Text
          style={{
            marginLeft: "6%",
            marginTop: 10,
            fontSize: 20,
            fontWeight: 800,
          }}
        >
          Need guidance for farming ?
        </Text>
        <Text
          style={{
            marginLeft: "6%",
            marginTop: 10,
            fontSize: 18,
            fontWeight: 800,
          }}
        >
          See video 👇
        </Text>
        <View>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`https://www.youtube.com/watch?v=${video}`)
            }
          >
            <Image
              source={{
                uri: `https://i.ytimg.com/vi/${video}/hqdefault.jpg`,
              }}
              width={"90%"}
              height={220}
              style={{
                marginLeft: "5%",
                marginTop: "5%",
                borderRadius: 15,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "#90EE90",
            height: 60,
            width: "90%",
            marginLeft: "5%",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
            borderRadius: 15,
            borderWidth: 1,
          }}
          onPress={() =>
            navigation.navigate("cropsteps", {
              steps: steps,
            })
          }
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Steps to be followed
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetailedCropRecommendation;
