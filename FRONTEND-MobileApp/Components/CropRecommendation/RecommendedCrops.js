import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import LottieView from "lottie-react-native";

const RecommendedCrops = ({ route }) => {
  const { rain, humid, temp, n, p, k, ph } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestData = async () => {
      setLoading(true);
      await getData();
      setLoading(false);
    };
    requestData();
  }, [n, p, k, ph, temp, humid, rain]);

  const getData = async () => {
    await axios
      .post(`${process.env.EXPO_PUBLIC_BACKEND}api/recommend_crop`, {
        N: n,
        P: p,
        K: k,
        temperature: temp,
        humidity: humid,
        ph: ph,
        rainfall: rain,
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <View>
      {loading && (
        <LottieView
          autoPlay
          loop={true}
          speed={2}
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
          source={require("../../Loading/crop_recommend.json")}
        />
      )}
      {!loading && (
        <View>
          <Text
            style={{
              textAlign: "center",
              marginVertical: 50,
              fontSize: 30,
              fontWeight: "800",
            }}
          >
            Suggested Crops
          </Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.crop_name} // Ensure you have a unique key
            renderItem={({ item }) => (
              <CropCard
                crop_name={item.crop_name}
                img={item.img}
                market_price={item.market_price}
                procedure={item.procedure}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

const CropCard = ({ crop_name, img, market_price, procedure }) => {
  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        width: "95%",
        marginLeft: "2.5%",
        marginVertical: 25,
      }}
      onPress={() =>
        navigation.navigate("detailcroprecommendation", {
          crop_name: crop_name,
          img: img,
          market_price: market_price,
          video: procedure.video,
          steps: procedure.steps,
        })
      }
    >
      <Image
        source={{
          uri: img,
        }}
        width={140}
        height={120}
        style={{
          borderRadius: 15,
        }}
      />
      <View
        style={{
          marginLeft: 20,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            marginVertical: 10,
            fontWeight: "600",
          }}
        >
          {capitalizeFirstLetter(crop_name)}
        </Text>
        <Text
          style={{
            fontWeight: "200",
            marginVertical: 10,
          }}
        >
          Market Price is {market_price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RecommendedCrops;
