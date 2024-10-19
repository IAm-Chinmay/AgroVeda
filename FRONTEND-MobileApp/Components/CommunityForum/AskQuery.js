import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const AskQuery = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const userId = useSelector((state) => state.userAuth.userId);

  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Set the selected image's URI
    }
  };

  const onSubmit = async () => {
    if (title.trim() === "" || desc.trim() === "" || image.trim() === "") {
      ToastAndroid.show("Fill all fields", ToastAndroid.SHORT);
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: image.split("/").pop(),
    });
    formData.append("uid", userId);
    await axios
      .post(
        `${process.env.EXPO_PUBLIC_BACKEND}api/community/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(
        navigation.navigate("community_forum"),
        ToastAndroid.show("Query Posted", ToastAndroid.SHORT)
      )
      .catch((er) =>
        ToastAndroid.show("Something went wrong !", ToastAndroid.SHORT)
      );
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 10 }}>
      <Text
        style={{
          fontSize: 44,
          fontWeight: 800,
          textAlign: "center",
          marginTop: "5%",
        }}
      >
        Add you query
      </Text>
      {!image && (
        <TouchableOpacity
          style={{
            backgroundColor: "green",
            width: "80%",
            height: "15%",
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
          cursorColor={"#1c6269"}
          style={styles.textbox}
          keyboardType="text"
          placeholder="Enter your query title"
          onChangeText={(newText) => setTitle(newText)}
        />
        <TextInput
          multiline={true}
          numberOfLines={5}
          cursorColor={"#1c6269"}
          style={styles.textbox2}
          keyboardType="text"
          placeholder="Describe your query in detail"
          onChangeText={(newText) => setDesc(newText)}
        />
        <TouchableOpacity onPress={onSubmit} style={styles.signupbtn}>
          <Text
            style={{
              color: "white",
              fontSize: 25,
            }}
          >
            Post Query
          </Text>
        </TouchableOpacity>
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
    marginTop: 10,
    paddingLeft: 15,
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
  },
});

export default AskQuery;
