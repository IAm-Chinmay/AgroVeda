import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const FarmerMarket = () => {
  const [tab, setTab] = useState(true);
  const [fertilizer, setFertilizer] = useState(null);
  const [pesticide, setPesticide] = useState(null);
  const [herbicide, setHerbicide] = useState(null);
  const [seed, setSeed] = useState(null);
  const [machinery, setMachinery] = useState(null);
  const [agritools, setAgriTools] = useState(null);
  const [agrielectronics, setAgriElectronics] = useState(null);
  const navigation = useNavigation();

  const onSearchQuery = (text) => {
    navigation.navigate("searchproduct", { query: text });
  };

  useEffect(() => {
    const getResponse = async () => {
      await getData();
    };
    getResponse();
  }, []);

  const getData = async () => {
    await axios
      .post(`${process.env.EXPO_PUBLIC_BACKEND}api/market/getAllPost`)
      .then((res) => {
        const data = res.data;
        setFertilizer(data.fertilizer || []);
        setPesticide(data.pesticide || []);
        setHerbicide(data.herbicide || []);
        setSeed(data.Seeds || []);
        setMachinery(data.machinery || []);
        setAgriElectronics(data["agri electronics"] || []);
        setAgriTools(data["agri tools"] || []);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <View>
      <View
        style={{
          borderWidth: 1,
          flexDirection: "row",
          width: "90%",
          borderRadius: 15,
          height: 40,
          alignItems: "center",
          marginLeft: "5%",
          marginTop: "10%",
        }}
      >
        <TouchableOpacity
          onPress={() => setTab(true)}
          style={
            tab
              ? {
                  width: "50%",
                  alignItems: "center",
                  height: 40,
                  justifyContent: "center",
                  borderEndWidth: 1,
                  backgroundColor: "grey",
                  borderTopLeftRadius: 15,
                  borderBottomLeftRadius: 15,
                }
              : {
                  width: "50%",
                  alignItems: "center",
                  height: 40,
                  justifyContent: "center",
                  borderEndWidth: 1,
                }
          }
        >
          <Text
            style={
              tab
                ? {
                    fontWeight: 600,
                    color: "white",
                  }
                : {
                    fontWeight: 600,
                  }
            }
          >
            Krushi Bhandar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab(false)}
          style={
            !tab
              ? {
                  width: "50%",
                  alignItems: "center",
                  height: 40,
                  justifyContent: "center",
                  borderEndWidth: 1,
                  backgroundColor: "grey",
                  borderTopRightRadius: 15,
                  borderBottomRightRadius: 15,
                }
              : {
                  width: "50%",
                  alignItems: "center",
                  height: 40,
                  justifyContent: "center",
                }
          }
        >
          <Text
            style={
              !tab
                ? {
                    fontWeight: 600,
                    color: "white",
                  }
                : {
                    fontWeight: 600,
                  }
            }
          >
            Agri Tools
          </Text>
        </TouchableOpacity>
      </View>
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
        placeholder="Search..."
        onSubmitEditing={(value) => {
          onSearchQuery(value.nativeEvent.text);
        }}
      />
      {tab ? (
        <KrushiBazar
          fertilizer={fertilizer}
          pesticide={pesticide}
          herbicide={herbicide}
          seed={seed}
        />
      ) : (
        <AgriTools
          machinery={machinery}
          agritools={agritools}
          agrielectronics={agrielectronics}
        />
      )}
    </View>
  );
};

const KrushiBazar = ({ fertilizer, pesticide, herbicide, seed }) => {
  const navigation = useNavigation();
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 250,
        borderRadius: 10,
      }}
    >
      {/* Fertilizers */}
      <View>
        <View>
          <Text
            style={{
              marginVertical: 20,
              marginHorizontal: 10,
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            Fertilizers
          </Text>
        </View>
        <View>
          <FlatList
            data={fertilizer}
            renderItem={({ item }) => {
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
                      name: item.name,
                      img: item.image,
                      catergory: item.category,
                      cropsApplicable: item.cropsApplicable,
                      content: item.content,
                      wayOfApplication: item.wayOfApplication,
                      price: item.price,
                      description: item.description,
                      stockQuantity: item.stockQuantity,
                      sellerId: item.sellerId,
                    })
                  }
                >
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
                    width={120}
                    height={120}
                    resizeMode="contain"
                    style={{
                      elevation: 1,
                      marginLeft: 10,
                      marginTop: 5,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: 600,
                      marginLeft: 15,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      marginBottom: 10,

                      marginLeft: 15,
                    }}
                  >
                    Qt. {item.stockQuantity}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 800,
                      fontSize: 18,
                      marginLeft: 15,
                    }}
                  >
                    ₹{item.price}
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
                    <Text
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Buy
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
      </View>
      {/* Pesticides */}
      <View>
        <View>
          <Text
            style={{
              marginVertical: 20,
              marginHorizontal: 10,
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            Pesticides
          </Text>
        </View>
        <View>
          <FlatList
            data={pesticide}
            renderItem={({ item }) => {
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
                      name: item.name,
                      img: item.image,
                      catergory: item.category,
                      cropsApplicable: item.cropsApplicable,
                      content: item.content,
                      wayOfApplication: item.wayOfApplication,
                      price: item.price,
                      description: item.description,
                      stockQuantity: item.stockQuantity,
                      sellerId: item.sellerId,
                    })
                  }
                >
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
                    width={120}
                    height={120}
                    resizeMode="contain"
                    style={{
                      elevation: 1,
                      marginLeft: 10,
                      marginTop: 5,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: 600,
                      marginLeft: 15,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      marginBottom: 10,

                      marginLeft: 15,
                    }}
                  >
                    Qt. {item.stockQuantity}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 800,
                      fontSize: 18,
                      marginLeft: 15,
                    }}
                  >
                    ₹{item.price}
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
                    <Text
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Buy
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
      </View>
      {/* Herbicides */}
      <View>
        <View>
          <Text
            style={{
              marginVertical: 20,
              marginHorizontal: 10,
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            Herbicides
          </Text>
        </View>
        <View>
          <FlatList
            data={herbicide}
            renderItem={({ item }) => {
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
                      name: item.name,
                      img: item.image,
                      catergory: item.category,
                      cropsApplicable: item.cropsApplicable,
                      content: item.content,
                      wayOfApplication: item.wayOfApplication,
                      price: item.price,
                      description: item.description,
                      stockQuantity: item.stockQuantity,
                      sellerId: item.sellerId,
                    })
                  }
                >
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
                    width={120}
                    height={120}
                    resizeMode="contain"
                    style={{
                      elevation: 1,
                      marginLeft: 10,
                      marginTop: 5,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: 600,
                      marginLeft: 15,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      marginBottom: 10,

                      marginLeft: 15,
                    }}
                  >
                    Qt. {item.stockQuantity}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 800,
                      fontSize: 18,
                      marginLeft: 15,
                    }}
                  >
                    ₹{item.price}
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
                    <Text
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Buy
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
      </View>
      {/* seeds */}
      <View>
        <View>
          <Text
            style={{
              marginVertical: 20,
              marginHorizontal: 10,
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            Seeds
          </Text>
        </View>
        <View>
          <FlatList
            data={seed}
            renderItem={({ item }) => {
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
                      name: item.name,
                      img: item.image,
                      catergory: item.category,
                      cropsApplicable: item.cropsApplicable,
                      content: item.content,
                      wayOfApplication: item.wayOfApplication,
                      price: item.price,
                      description: item.description,
                      stockQuantity: item.stockQuantity,
                      sellerId: item.sellerId,
                    })
                  }
                >
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
                    width={120}
                    height={120}
                    resizeMode="contain"
                    style={{
                      elevation: 1,
                      marginLeft: 10,
                      marginTop: 5,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: 600,
                      marginLeft: 15,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      marginBottom: 10,

                      marginLeft: 15,
                    }}
                  >
                    Qt. {item.stockQuantity}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 800,
                      fontSize: 18,
                      marginLeft: 15,
                    }}
                  >
                    ₹{item.price}
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
                    <Text
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Buy
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
      </View>
    </ScrollView>
  );
};

const AgriTools = ({ machinery, agritools, agrielectronics }) => {
  const navigation = useNavigation();
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 250,
        borderRadius: 10,
      }}
    >
      {/* machinery */}
      <View>
        <View>
          <Text
            style={{
              marginVertical: 20,
              marginHorizontal: 10,
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            Machinery
          </Text>
        </View>
        <View>
          <FlatList
            data={machinery}
            renderItem={({ item }) => {
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
                      name: item.name,
                      img: item.image,
                      catergory: item.category,
                      cropsApplicable: item.cropsApplicable,
                      content: item.content,
                      wayOfApplication: item.wayOfApplication,
                      price: item.price,
                      description: item.description,
                      stockQuantity: item.stockQuantity,
                      sellerId: item.sellerId,
                    })
                  }
                >
                  <Image
                    source={{
                      uri: `${process.env.EXPO_PUBLIC_BACKEND}${item.image}`,
                    }}
                    width={120}
                    height={120}
                    resizeMode="contain"
                    style={{
                      elevation: 1,
                      marginLeft: 10,
                      marginTop: 5,
                      borderRadius: 15,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: 600,
                      marginLeft: 15,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      marginBottom: 10,

                      marginLeft: 15,
                    }}
                  >
                    Qt. {item.stockQuantity}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 800,
                      fontSize: 18,
                      marginLeft: 15,
                    }}
                  >
                    ₹{item.price}
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
                    <Text
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Buy
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
      </View>
      {/* agri electronics */}
      <View>
        <View>
          <Text
            style={{
              marginVertical: 20,
              marginHorizontal: 10,
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            Agricultural Electronics
          </Text>
        </View>
        <View>
          <FlatList
            data={agrielectronics}
            renderItem={({ item }) => {
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
                      name: item.name,
                      img: item.image,
                      catergory: item.category,
                      cropsApplicable: item.cropsApplicable,
                      content: item.content,
                      wayOfApplication: item.wayOfApplication,
                      price: item.price,
                      description: item.description,
                      stockQuantity: item.stockQuantity,
                      sellerId: item.sellerId,
                    })
                  }
                >
                  <Image
                    source={{
                      uri: `${process.env.EXPO_PUBLIC_BACKEND}${item.image}`,
                    }}
                    width={120}
                    height={120}
                    resizeMode="contain"
                    style={{
                      borderRadius: 15,
                      elevation: 1,
                      marginLeft: 10,
                      marginTop: 5,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: 600,
                      marginLeft: 15,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      marginBottom: 10,

                      marginLeft: 15,
                    }}
                  >
                    Qt. {item.stockQuantity}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 800,
                      fontSize: 18,
                      marginLeft: 15,
                    }}
                  >
                    ₹{item.price}
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
                    <Text
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Buy
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
      </View>
      {/* agri Tools */}
      <View>
        <View>
          <Text
            style={{
              marginVertical: 20,
              marginHorizontal: 10,
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            Agricultural Tools
          </Text>
        </View>
        <View>
          <FlatList
            data={agritools}
            renderItem={({ item }) => {
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
                      name: item.name,
                      img: item.image,
                      catergory: item.category,
                      cropsApplicable: item.cropsApplicable,
                      content: item.content,
                      wayOfApplication: item.wayOfApplication,
                      price: item.price,
                      description: item.description,
                      stockQuantity: item.stockQuantity,
                      sellerId: item.sellerId,
                    })
                  }
                >
                  <Image
                    source={{
                      uri: `${process.env.EXPO_PUBLIC_BACKEND}${item.image}`,
                    }}
                    width={120}
                    height={120}
                    resizeMode="contain"
                    style={{
                      elevation: 1,
                      marginLeft: 10,
                      borderRadius: 15,
                      marginTop: 5,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: 600,
                      marginLeft: 15,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      marginBottom: 10,

                      marginLeft: 15,
                    }}
                  >
                    Qt. {item.stockQuantity}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 800,
                      fontSize: 18,
                      marginLeft: 15,
                    }}
                  >
                    ₹{item.price}
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
                    <Text
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Buy
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default FarmerMarket;
