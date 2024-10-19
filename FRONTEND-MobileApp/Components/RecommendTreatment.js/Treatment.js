import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const height = Dimensions.get("screen").height;
const Treatment = ({ route }) => {
  const navigation = useNavigation();
  const { crop, category, disease_name } = route.params;
  console.log(route.params);

  const [resp, setResp] = useState([]);

  useEffect(() => {
    const getResponse = async () => {
      await findTreatment();
    };

    getResponse();
  }, [crop, disease_name, category]);

  const findTreatment = async () => {
    let data = JSON.stringify({
      crop_name: crop.toLowerCase().trim(),
      category: category,
      disease_name: disease_name,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.EXPO_PUBLIC_BACKEND}api/findfertilizer`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        setResp(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          marginTop: "10%",
          fontSize: 30,
          fontWeight: 800,
        }}
      >
        Treatment Found
      </Text>

      <View>
        <FlatList
          data={resp}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TreatmentCard
              name={item.name}
              img={item.image}
              usage={item.usage}
            />
          )}
        />
      </View>
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
        onPress={() => {
          navigation.navigate("nearestvendors");
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          Find Nearby Shops
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const TreatmentCard = ({ name, img, usage }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "95%",
        marginLeft: "2.5%",
        marginVertical: 25,
      }}
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
        resizeMode="contain"
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
          {name}
        </Text>
        <Text
          style={{
            fontWeight: "200",
            marginVertical: 10,
          }}
        >
          {usage}
        </Text>
      </View>
    </View>
  );
};

export default Treatment;
