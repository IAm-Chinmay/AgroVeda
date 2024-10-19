import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

const FindVendors = () => {
  const [resp, setRes] = useState(null);
  const lat = useSelector((state) => state.location.lat);
  const lon = useSelector((state) => state.location.long);

  const res = async (city, state, country) => {
    const options = {
      method: "POST",
      url: "https://local-business-data.p.rapidapi.com/search",
      headers: {
        "x-rapidapi-key": "a8df81232emsh81f5c72a034d998p18c1ffjsn8a26848d52d8",
        "x-rapidapi-host": "local-business-data.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        queries: [`Fertilizer Store near me, ${city}, ${state}, ${country}`],
        limit: 15,
        region: "in",
        language: "en",
        coordinates: `${lat},${lon}`,
        zoom: 13,
        dedup: true,
      },
    };

    try {
      const response = await axios.request(options);
      response && setRes(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAddress = async () => {
    try {
      const response = await axios.get("https://geocode.maps.co/reverse", {
        params: {
          lat: lat,
          lon: lon,
          api_key: "670ec062a1482448803045proe3227e",
        },
      });

      const data = response.data;
      const city = data.address.city || "";
      const state = data.address.state || "";
      const country = data.address.country || "";

      console.log("City:", city);
      console.log("State:", state);
      console.log("Country:", country);

      return { city, state, country };
    } catch (error) {
      console.error("Error fetching reverse geocode data:", error);
    }
  };

  useEffect(() => {
    const getResponse = async () => {
      console.log("running");
      const addressData = await getAddress();
      if (addressData) {
        const { city, state, country } = addressData;
        // Now call the res function with the extracted city and state
        await res(city, state, country);
      }
    };
    getResponse();
  }, [lat, lon]);
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 22,
          fontWeight: 800,
          marginTop: 20,
        }}
      >
        Vendors found in the area
      </Text>
      {resp && (
        <FlatList
          data={resp?.filter((item) => item && item.name)} // Ensure valid entries
          renderItem={({ item }) => (
            <VendorCard
              name={item?.name ?? "No Name"}
              rate={item?.rating ?? 0}
              ph={item?.phone_number ?? ""}
              map={item?.owner_link ?? ""}
              image={item?.photos_sample?.[0] ?? null}
            />
          )}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      )}
    </View>
  );
};

const VendorCard = ({ name, rate, image, ph, map }) => {
  const imageUri =
    image && image.photo_url
      ? image.photo_url
      : "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";

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
        source={{ uri: imageUri }}
        width={160}
        height={160}
        style={{
          borderRadius: 15,
        }}
      />
      <View
        style={{
          justifyContent: "center",
          width: "50%",
          paddingLeft: 10,
        }}
      >
        <View
          style={
            {
              // marginLeft: 10,
            }
          }
        >
          {name && (
            <Text
              style={{
                fontSize: 20,
                marginVertical: 5,
                fontWeight: "600",
                width: "90%",
              }}
            >
              {name}
            </Text>
          )}
          <Text
            style={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Rating : {rate ? rate : 0}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 5,
          }}
        >
          {ph && (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel: ${ph}`);
              }}
            >
              <Ionicons name="call" size={34} color="black" />
            </TouchableOpacity>
          )}
          {map && (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`${map}`);
              }}
            >
              <AntDesign name="eye" size={34} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default FindVendors;
