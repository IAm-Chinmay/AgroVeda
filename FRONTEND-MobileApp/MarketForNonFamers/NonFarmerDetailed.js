import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { CardField, useStripe } from "@stripe/stripe-react-native";

const NonFarmerDetailed = ({ route }) => {
  const {
    name,
    img,
    price,
    description,
    stockQuantity,
    shipingAddress,
    farmerId,
  } = route.params;

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
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
          {stockQuantity} Kg
        </Text>
      </View>
      <Text
        style={{
          fontSize: 28,
          fontWeight: 600,
          marginLeft: 20,
          marginVertical: 10,
          color: "#C69774",
        }}
      >
        ₹{price}
      </Text>
      {/* <View>
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
      </View> */}
      <View>
        <View>
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
          {shipingAddress && (
            <>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 400,
                  marginLeft: 20,
                  color: "#C69774",
                  marginTop: 20,
                }}
              >
                Seller's Address : {shipingAddress}
              </Text>
            </>
          )}
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
          onPress={async () => {
            await initializePaymentSheet().then(openPaymentSheet);
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
        {/* {vendorPh && (
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
        )} */}
      </View>
    </ScrollView>
  );
};

export default NonFarmerDetailed;
