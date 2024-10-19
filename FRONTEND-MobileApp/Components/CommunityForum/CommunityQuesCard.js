import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
const CommunityQuesCard = ({ title, desc, reply, image, id, userId }) => {
  const navigation = useNavigation();

  const [userName, setUserName] = useState("");

  const getUser = async () => {
    try {
      await axios
        .post(`${process.env.EXPO_PUBLIC_BACKEND}api/user/getuserbyid`, {
          userId,
        })
        .then((res) => {
          // setPosts(res?.data);
          setUserName(res?.data?.username);
        });
    } catch (error) {
      if (error.status === 404) {
        return ToastAndroid.show("Cannot Find User", ToastAndroid.SHORT);
      }
      console.log(error);
      ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
    }
  };
  useEffect(() => {
    const getData = async () => {
      await getUser();
    };
    getData();
  });

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "green",
        width: "90%",
        marginLeft: "5%",
        alignItems: "center",
        borderRadius: 15,
        marginTop: "5%",
        marginBottom: "5%",
      }}
      onPress={() => {
        navigation.navigate("detail_query", {
          title,
          desc,
          reply,
          image,
          postId: id,
          userId,
        });
      }}
    >
      <Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_BACKEND}${image}`,
        }}
        width={300}
        height={250}
        style={{
          borderRadius: 15,
          marginTop: "5%",
        }}
      />
      <View
        style={{
          width: "90%",
          marginTop: "5%",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 15, color: "white", fontWeight: 800 }}>
          {userName && userName}
        </Text>
      </View>
      <View
        style={{
          width: "90%",
          marginTop: "2%",
        }}
      >
        <Text style={{ fontSize: 30, color: "white", fontWeight: 800 }}>
          {title}
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: 400,
            marginTop: "2%",
            marginBottom: "2%",
          }}
        >
          {desc}
        </Text>
      </View>
      <View
        style={{
          width: "90%",
          marginTop: "2%",
          alignItems: "center",
          marginBottom: "3%",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            color: "white",
            fontWeight: 400,
          }}
        >
          {reply.length} Replies
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CommunityQuesCard;
