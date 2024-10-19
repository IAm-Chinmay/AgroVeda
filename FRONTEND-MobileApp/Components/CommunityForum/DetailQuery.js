import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import ReplyCard from "./ReplyCard";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";

const DetailQuery = ({ route }) => {
  const { title, desc, reply, image, postId } = route.params;
  const uId = route.params.userId;
  const userId = useSelector((state) => state.userAuth.userId);
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");

  const getUser = async () => {
    try {
      await axios
        .post(`${process.env.EXPO_PUBLIC_BACKEND}api/user/getuserbyid`, {
          userId: uId,
        })
        .then((res) => {
          setUserName(res?.data?.username);
        });
    } catch (error) {
      if (error.status === 404) {
        return ToastAndroid.show("Cannot Find User", ToastAndroid.SHORT);
      }
      ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
    }
  };

  const deletePost = async () => {
    try {
      console.log(postId);
      await axios
        .post(`${process.env.EXPO_PUBLIC_BACKEND}api/community/delete-post`, {
          postId: postId,
        })
        .then(() => {
          navigation.navigate("community_forum");
          ToastAndroid.show("Post Deleted", ToastAndroid.SHORT);
        });
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Cannot Delete, try again", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    const getData = async () => {
      await getUser();
    };
    getData();
  });

  const createReply = async (reply) => {
    if (reply.trim() === "") {
      ToastAndroid.show("Fill all fields", ToastAndroid.SHORT);
      return;
    }
    await axios
      .post(`${process.env.EXPO_PUBLIC_BACKEND}api/community/create-reply`, {
        reply,
        userId,
        postId,
      })
      .then(
        navigation.navigate("community_forum"),
        ToastAndroid.show("Reply Sent", ToastAndroid.SHORT)
      )
      .catch((er) =>
        ToastAndroid.show("Something went wrong !", ToastAndroid.SHORT)
      );
  };
  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 0 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: `${process.env.EXPO_PUBLIC_BACKEND}${image}`,
            }}
            width={"100%"}
            height={300}
          />
          <View
            style={{
              width: "90%",
              marginTop: "5%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 20, color: "black", fontWeight: 800 }}>
              {userName && userName}
            </Text>
            {userId === uId && (
              <TouchableOpacity
                style={{
                  marginRight: "5%",
                }}
                onPress={deletePost}
              >
                <MaterialIcons name="delete" size={35} color="red" />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              width: "90%",
              marginTop: "2%",
            }}
          >
            <Text style={{ fontSize: 35, color: "black", fontWeight: 800 }}>
              {title}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "black",
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
            }}
          >
            <TextInput
              cursorColor={"#1c6269"}
              style={{
                height: 40,
                borderWidth: 2,
                borderColor: "#1c6269",
                fontSize: 20,
                color: "#1c6269",
                marginTop: 10,
                paddingLeft: 15,
                borderRadius: 15,
              }}
              onSubmitEditing={(value) => createReply(value.nativeEvent.text)}
              placeholder="Reply to the query"
            />
          </View>
        </View>
        <View style={styles.hrLine} />
        <View>
          <Text
            style={{
              fontSize: 20,
              color: "black",
              fontWeight: 400,
              marginLeft: "5%",
            }}
          >
            Replies
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            {reply.map((data, index) => (
              <ReplyCard key={index} reply={data.reply} name={data.user} />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  hrLine: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 10, // Adjust spacing as needed
  },
});
export default DetailQuery;
