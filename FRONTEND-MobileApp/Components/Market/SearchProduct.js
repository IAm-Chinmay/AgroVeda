import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SearchProduct = ({ route }) => {
  const navigation = useNavigation();
  const { query } = route.params;
  const [res, setRes] = useState({});

  useEffect(() => {
    navigation.setOptions({ title: `Searching for ${query}` });
    const getResponse = async () => {
      await getData();
    };
    getResponse();
  }, [query]);

  const getData = async () => {
    await axios
      .post(`${process.env.EXPO_PUBLIC_BACKEND}api/market/search`, {
        searchTerm: query,
      })
      .then((res) => {
        console.log(res.data.products);
        setRes(res.data.products);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 250, borderRadius: 10 }}
    >
      {Object.entries(res).map(([categoryName, products]) => (
        <RenderComponent
          key={categoryName}
          name={categoryName}
          products={products}
        />
      ))}
    </ScrollView>
  );
};

const capitalizeFirstLetter = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const RenderComponent = ({ name, products }) => (
  <View>
    <Text
      style={{
        marginVertical: 20,
        marginHorizontal: 10,
        fontSize: 20,
        fontWeight: "800",
      }}
    >
      {capitalizeFirstLetter(name)}
    </Text>
    <FlatList
      data={products}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <ProductItem product={item} />}
    />
  </View>
);

const ProductItem = ({ product }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        width: 140,
        borderWidth: 1,
        borderRadius: 15,
        marginHorizontal: 15,
      }}
      onPress={() =>
        navigation.navigate("detailedproduct", {
          name: product.name,
          img: product.image,
          catergory: product.category,
          cropsApplicable: product.cropsApplicable,
          content: product.content,
          wayOfApplication: product.wayOfApplication,
          price: product.price,
          description: product.description,
          stockQuantity: product.stockQuantity,
          sellerId: product.sellerId,
        })
      }
    >
      <Image
        source={
          !product.image
            ? {
                uri: "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg",
              }
            : {
                uri: `${process.env.EXPO_PUBLIC_BACKEND}${product.image}`,
              }
        }
        style={{
          width: 120,
          height: 120,
          resizeMode: "contain",
          marginLeft: 10,
          marginTop: 5,
          marginBottom: 5,
        }}
      />
      <Text style={{ fontWeight: "600", marginLeft: 15 }}>{product.name}</Text>
      <Text
        style={{
          fontSize: 14,
          marginBottom: 10,

          marginLeft: 15,
        }}
      >
        {product.stockQuantity} Qt
      </Text>
      <Text style={{ fontSize: 14, marginBottom: 10, marginLeft: 15 }}>
        ₹{product.price}
      </Text>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderRadius: 15,
          alignItems: "center",
          width: 90,
          height: 30,
          justifyContent: "center",
          marginLeft: 23,
          marginVertical: 10,
        }}
      >
        <Text style={{ fontWeight: "600" }}>Buy</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SearchProduct;
