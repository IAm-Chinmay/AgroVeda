import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Linking from "expo-linking";

const DetailedProduct = ({ route }) => {
  const {
    name,
    img,
    catergory,
    cropsApplicable,
    content,
    wayOfApplication,
    price,
    description,
    stockQuantity,
    sellerId,
  } = route.params;
  const [vendorPh, setVendorPh] = useState(null);
  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  useEffect(() => {
    const getResponse = async () => {
      await getData();
    };
    getResponse();
  }, [sellerId]);

  const getData = async () => {
    await axios
      .post(`${process.env.EXPO_PUBLIC_BACKEND}api/market/getuserbyid`, {
        userId: sellerId,
      })
      .then((res) => {
        setVendorPh(res.data.phoneNumber);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
      }}
    >
      <Image
        source={
          img
            ? {
                uri: `${process.env.EXPO_PUBLIC_BACKEND}${img}`,
              }
            : {
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi7Z6nS0paslUx7X-rSOyNqmhge_ugyoMcFA&s",
              }
        }
        width={"100%"}
        height={220}
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
        resizeMode="contain"
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: 800,
            marginLeft: 20,
            marginVertical: 10,
            color: "#C69774",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 400,
            marginRight: 20,
            marginVertical: 10,
            backgroundColor: "#F8DFD4",
            width: 60,
            textAlign: "center",
            borderRadius: 15,
            color: "#C69774",
          }}
        >
          Qt.{stockQuantity}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 400,
            marginLeft: 20,
            color: "#C69774",
          }}
        >
          {capitalizeFirstLetter(catergory)}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 400,
            marginLeft: 20,
            color: "#C69774",
            marginVertical: 20,
          }}
        >
          Applicable for
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
          }}
        >
          {cropsApplicable &&
            cropsApplicable.map((item) => (
              <Text
                key={item}
                style={{
                  backgroundColor: "#5F6F52",
                  fontSize: 16,
                  fontWeight: 400,
                  marginLeft: 20,
                  width: 80,
                  textAlign: "center",
                  borderRadius: 15,
                  color: "#C69774",
                }}
              >
                {item}
              </Text>
            ))}
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 400,
              marginLeft: 20,
              color: "#C69774",
              marginVertical: 20,
            }}
          >
            It contains : {content}
          </Text>
          {description && (
            <Text
              style={{
                fontSize: 18,
                fontWeight: 400,
                marginLeft: 20,
                color: "#C69774",
              }}
            >
              {description}
            </Text>
          )}
          {wayOfApplication && (
            <Text
              style={{
                fontSize: 18,
                fontWeight: 400,
                marginLeft: 20,
                color: "#C69774",
                marginTop: 10,
              }}
            >
              {wayOfApplication}
            </Text>
          )}
          <Text
            style={{
              fontSize: 28,
              fontWeight: 400,
              marginLeft: 20,
              color: "#C69774",
              marginVertical: 10,
              fontWeight: 800,
            }}
          >
            Pricing : ₹{price}
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "#5F6F52",
            width: "90%",
            marginLeft: "5%",
            justifyContent: "center",
            alignItems: "center",
            height: 60,
            borderRadius: 15,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#B99470",
            }}
          >
            Buy This Product
          </Text>
        </TouchableOpacity>
        {vendorPh && (
          <TouchableOpacity
            style={{
              backgroundColor: "#5F6F52",
              width: "90%",
              marginLeft: "5%",
              justifyContent: "center",
              alignItems: "center",
              height: 60,
              borderRadius: 15,
              marginTop: 20,
            }}
            onPress={() => {
              Linking.openURL(`tel:${vendorPh}`);
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "#B99470",
              }}
            >
              Call Vendor
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default DetailedProduct;
