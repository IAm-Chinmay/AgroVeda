import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import * as Linking from "expo-linking";
import { CardField, useStripe } from "@stripe/stripe-react-native";

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

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [vendorPh, setVendorPh] = useState();

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BACKEND}payment-sheet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: price }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend Error: ${errorText}`);
      }

      const data = await response.json();
      console.log("Payment Params:", data);
      return data;
    } catch (error) {
      console.error("Error fetching payment sheet params:", error);
      Alert.alert("Error", `Failed to fetch payment details: ${error.message}`);
    }
  };

  const initializePaymentSheet = async () => {
    try {
      const { paymentIntent, ephemeralKey, customer } =
        await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Agro Veda",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: "Chinmay Mulay",
        },
      });

      if (!error) {
        setLoading(true);
      } else {
        console.error("Payment sheet initialization failed:", error);
        Alert.alert("Error", "Failed to initialize payment sheet.");
      }
    } catch (error) {
      console.error("Payment initialization error:", error);
      Alert.alert("Error", error.message);
    }
  };

  const openPaymentSheet = async () => {
    try {
      const { error } = await presentPaymentSheet();
      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        Alert.alert("Success", "Your order is confirmed!");
      }
    } catch (error) {
      console.error("Error opening payment sheet:", error);
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [sellerId]);

  const getData = async () => {
    try {
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND}api/market/getuserbyid`,
        { userId: sellerId }
      );
      setVendorPh(res.data.phoneNumber);
    } catch (error) {
      console.error("Failed to fetch vendor data:", error);
    }
  };

  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <Image
        source={
          img
            ? { uri: `${process.env.EXPO_PUBLIC_BACKEND}${img}` }
            : { uri: "https://via.placeholder.com/150" }
        }
        style={{ width: "100%", height: 220, borderBottomRadius: 20 }}
        resizeMode="contain"
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", marginLeft: 20 }}>
          {name}
        </Text>
        <Text
          style={{
            fontSize: 18,
            backgroundColor: "#F8DFD4",
            marginRight: 20,
            borderRadius: 15,
            paddingHorizontal: 10,
          }}
        >
          Qt. {stockQuantity}
        </Text>
      </View>

      <Text style={{ fontSize: 18, marginLeft: 20 }}>
        {capitalizeFirstLetter(catergory)}
      </Text>

      <Text style={{ fontSize: 18, marginLeft: 20, marginTop: 20 }}>
        Applicable for:
      </Text>
      <View style={{ flexDirection: "row", marginLeft: 20 }}>
        {cropsApplicable?.map((item) => (
          <Text
            key={item}
            style={{
              backgroundColor: "#5F6F52",
              color: "#C69774",
              margin: 5,
              padding: 5,
            }}
          >
            {item}
          </Text>
        ))}
      </View>

      <Text style={{ fontSize: 18, marginLeft: 20, marginTop: 10 }}>
        It contains: {content}
      </Text>

      {description && (
        <Text style={{ fontSize: 18, marginLeft: 20, marginTop: 10 }}>
          {description}
        </Text>
      )}

      {wayOfApplication && (
        <Text style={{ fontSize: 18, marginLeft: 20, marginTop: 10 }}>
          {wayOfApplication}
        </Text>
      )}

      <Text style={{ fontSize: 28, marginLeft: 20, marginVertical: 10 }}>
        Pricing: ₹{price}
      </Text>

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
        onPress={async () => {
          await initializePaymentSheet().then(openPaymentSheet);
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#B99470" }}>
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
          onPress={() => Linking.openURL(`tel:${vendorPh}`)}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#B99470" }}>
            Call Vendor
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default DetailedProduct;
