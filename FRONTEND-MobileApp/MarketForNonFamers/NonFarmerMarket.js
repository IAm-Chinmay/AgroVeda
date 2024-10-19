import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const NonFarmerMarket = () => {
  const [resp, setResp] = useState([]);

  useEffect(() => {
    const getResp = async () => {
      await getAllProduct();
    };
    getResp();
  }, []);

  const getAllProduct = async () => {
    await axios
      .post(`${process.env.EXPO_PUBLIC_BACKEND}api/user/getProduct`)
      .then((res) => {
        setResp(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={{
          borderWidth: 2,
          height: 40,
          width: "90%",
          marginLeft: "5%",
          marginVertical: 20,
          paddingLeft: 20,
          fontSize: 20,
          borderRadius: 15,
        }}
        keyboardType="default"
        placeholder="Search by crop..."
        onSubmitEditing={(value) => {
          // onSearchQuery(value.nativeEvent.text);
        }}
      />
      <ProductCard resp={resp} />
    </View>
  );
};

const ProductCard = ({ resp }) => {
  const fertilizers = [
    {
      id: "1",
      image: null,
      name: "Fertilizer A",
      weight: "20 kg",
      price: "₹20",
    },
    {
      id: "2",
      image: null,
      name: "Fertilizer B",
      weight: "15 kg",
      price: "₹30",
    },
    {
      id: "3",
      image: null,
      name: "Fertilizer C",
      weight: "25 kg",
      price: "₹25",
    },
    {
      id: "4",
      image: null,
      name: "Fertilizer D",
      weight: "10 kg",
      price: "₹15",
    },
    {
      id: "5",
      image: null,
      name: "Fertilizer E",
      weight: "30 kg",
      price: "₹50",
    },
    {
      id: "6",
      image: null,
      name: "Fertilizer F",
      weight: "5 kg",
      price: "₹10",
    },
  ];

  return (
    <FlatList
      data={resp}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card}>
          <Image
            source={
              !item.image
                ? {
                    uri: "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg",
                  }
                : {
                    uri: `${process.env.EXPO_PUBLIC_BACKEND}${item.image}`,
                  }
            }
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardWeight}>{item.stockQuantity} Kg</Text>
          <Text style={styles.cardPrice}>Rs. {item.price}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item._id}
      numColumns={2} // Set number of columns to 2
      showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
      style={styles.flatList} // Add style for FlatList
    />
  );
};

// Define styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  flatList: {
    flexGrow: 1, // Allow FlatList to grow
  },
  card: {
    width: "48%", // Set width to fit 2 cards in a row
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "white", // Add background color for better visibility
    marginVertical: "5%",
    marginHorizontal: "1%",
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    borderRadius: 15,
  },
  cardTitle: {
    fontWeight: "600",
    marginLeft: 10,
    fontSize: 18,
  },
  cardWeight: {
    // fontSize: 14,
    marginBottom: 10,
    marginLeft: 10,
  },
  cardPrice: {
    fontWeight: "800",
    fontSize: 18,
    marginLeft: 10,
  },
  buyButton: {
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    width: 90,
    height: 30,
    justifyContent: "center",
    margin: 10,
  },
  buyButtonText: {
    fontWeight: "600",
  },
});

export default NonFarmerMarket;
