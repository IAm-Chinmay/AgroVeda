import { View, Text, Image, ScrollView, FlatList } from "react-native";
import React from "react";

export default function MyProducts({ route }) {
  const { post } = route.params;
  return (
    <View>
      <FlatList
        data={post}
        renderItem={({ item }) => (
          <ProductCard
            img={item.image}
            name={item.name}
            qt={item.stockQuantity}
            shipingAddress={item.shipingAddress}
          />
        )}
      />
    </View>
  );
}

const ProductCard = ({ img, name, qt, shipingAddress }) => {
  return (
    <View
      style={{
        marginVertical: 20,
        width: "90%",
        marginLeft: "5%",
        flexDirection: "row",
      }}
    >
      <Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_BACKEND}${img}`,
        }}
        width={"50%"}
        height={120}
        resizeMode="cover"
        style={{
          borderRadius: 15,
        }}
      />
      <View
        style={{
          paddingLeft: "5%",
          paddingTop: "0%",
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: 600,
            marginTop: "2%",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          {qt} Kg
        </Text>
        <Text
          style={{
            fontSize: 16,
            width: "50%",
            fontWeight: 200,
          }}
        >
          {shipingAddress}
        </Text>
      </View>
    </View>
  );
};
