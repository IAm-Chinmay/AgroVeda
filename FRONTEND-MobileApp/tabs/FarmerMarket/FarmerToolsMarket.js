import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import axios from "axios";
import { useSelector } from "react-redux";

const FarmerToolsMarket = () => {
  const [image, setImage] = useState("");
  const [crop, setCrop] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [address, setAddress] = useState("");
  const [qt, setQt] = useState("");

  const navigation = useNavigation();

  const userId = useSelector((state) => state.userAuth.userId);

  useEffect(() => {
    const getResponse = async () => {
      await getData();
    };
    getResponse();
  }, [userId, navigation]);

  const getData = async () => {
    await axios
      .post(`${process.env.EXPO_PUBLIC_BACKEND}api/user/getuserbyid`, {
        userId: userId,
      })
      .then((res) => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                marginRight: "5%",
                justifyContent: "space-evenly",
                alignItems: "center",
                backgroundColor: "green",
                width: "30%",
                borderRadius: 15,
                height: "90%",
              }}
              onPress={() =>
                navigation.navigate("myproduct", {
                  post: res.data.crops,
                })
              }
            >
              <Feather name="package" size={24} color="white" />
              <Text
                style={{
                  fontSize: 24,
                  color: "white",
                }}
              >
                {res.data.crops.length}
              </Text>
            </TouchableOpacity>
          ),
        });
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadCrop = async () => {
    if (
      image.trim() === "" ||
      crop.trim() === "" ||
      price.trim() === "" ||
      desc.trim() === "" ||
      address.trim() === "" ||
      qt.trim() === "" ||
      address.trim() === ""
    ) {
      ToastAndroid.show("Fill all fields", ToastAndroid.SHORT);
      return;
    }
    const formData = new FormData();
    formData.append("name", crop);
    formData.append("price", price);
    formData.append("description", desc);
    formData.append("stockQuantity", qt);
    formData.append("inStock", true);
    formData.append("farmerId", userId);
    formData.append("shipingAddress", address);
    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: image.split("/").pop(),
    });
    await axios
      .post(`${process.env.EXPO_PUBLIC_BACKEND}api/user/uploadCrop`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setCrop("");
        setDesc("");
        setPrice("");
        setQt("");
        setImage("");
        setAddress("");

        ToastAndroid.show("Crop sent for selling !!", ToastAndroid.SHORT);
      })
      .catch((er) => {
        ToastAndroid.show("Something went wrong !", ToastAndroid.SHORT),
          console.log(er);
      })
      .finally(async () => {
        await getData();
      });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: "20%",
      }}
    >
      <Text
        style={{
          fontSize: 25,
          textAlign: "center",
          marginVertical: 20,
          fontWeight: 800,
        }}
      >
        Fill crop details
      </Text>
      <View>
        {!image && (
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              width: "80%",
              height: 40,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10%",
              marginLeft: "10%",
            }}
            onPress={pickImage}
          >
            <Text
              style={{
                fontSize: 25,
                color: "white",
              }}
            >
              Pick Image
            </Text>
          </TouchableOpacity>
        )}
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 200,
              height: 200,
              marginTop: "10%",
              marginLeft: "25%",
              borderRadius: 15,
            }}
          />
        )}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <TextInput
            value={crop}
            cursorColor={"#1c6269"}
            style={styles.textbox}
            keyboardType="text"
            placeholder="Which Crop ?"
            onChangeText={(newText) => setCrop(newText)}
          />
          <TextInput
            value={price}
            cursorColor={"#1c6269"}
            style={styles.textbox}
            keyboardType="decimal-pad"
            placeholder="What is the price ? (In Rupees per Kg)"
            onChangeText={(newText) => setPrice(newText)}
          />
          <TextInput
            value={desc}
            multiline
            cursorColor={"#1c6269"}
            style={styles.textbox}
            keyboardType="default"
            placeholder="Describe your crop !"
            onChangeText={(newText) => setDesc(newText)}
          />
          <TextInput
            value={address}
            multiline
            cursorColor={"#1c6269"}
            style={styles.textbox}
            keyboardType="default"
            placeholder="What is your address ?"
            onChangeText={(newText) => setAddress(newText)}
          />
          <TextInput
            value={qt}
            multiline
            cursorColor={"#1c6269"}
            style={styles.textbox}
            keyboardType="decimal-pad"
            placeholder="How much do you have ? (In Kg)"
            onChangeText={(newText) => setQt(newText)}
          />
          <TouchableOpacity onPress={uploadCrop} style={styles.signupbtn}>
            <Text
              style={{
                color: "white",
                fontSize: 25,
              }}
            >
              Sell my crop
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textbox: {
    height: 60,
    width: "95%",
    borderWidth: 2,
    borderColor: "#1c6269",
    fontSize: 20,
    color: "#1c6269",
    marginTop: 13,
    paddingLeft: 15,
    borderRadius: 15,
  },
  textbox2: {
    width: "95%",
    borderWidth: 2,
    borderColor: "#1c6269",
    fontSize: 20,
    color: "#1c6269",
    marginTop: 30,
    paddingLeft: 15,
  },
  signupbtn: {
    backgroundColor: "green",
    width: "95%",
    height: 60,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    borderRadius: 15,
  },
});

export default FarmerToolsMarket;
