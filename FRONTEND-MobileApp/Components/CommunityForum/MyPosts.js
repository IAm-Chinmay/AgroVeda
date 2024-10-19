import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import CommunityQuesCard from "./CommunityQuesCard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import LottieView from "lottie-react-native";

import { useSelector } from "react-redux";

const MyPosts = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefresh] = useState(false);
  const userId = useSelector((state) => state.userAuth.userId);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getAllPost();
      setLoading(false);
    };
    getData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    setLoading(true);
    getAllPost();
    setLoading(false);
    setRefresh(false);
  }, []);

  const getAllPost = async () => {
    try {
      await axios
        .post(
          `${process.env.EXPO_PUBLIC_BACKEND}api/community/get-all-post`,
          userId
        )
        .then((res) => {
          const filteredPosts = res?.data?.filter(
            (post) => post.userId === userId
          );
          setPosts(filteredPosts);
        });
    } catch (error) {
      if (error.status === 404) {
        return ToastAndroid.show("No Post Found", ToastAndroid.SHORT);
      }
      ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
    }
  };

  return (
    <>
      {loading && (
        <LottieView
          autoPlay
          loop={true}
          speed={2}
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
          source={require("../../Loading/Community_Forum.json")}
        />
      )}

      {!loading && (
        <View>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 40,
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {posts &&
              posts?.map((data, index) => (
                <CommunityQuesCard
                  key={index}
                  id={data._id}
                  title={data.title}
                  desc={data.desc}
                  reply={data.replies}
                  image={data.image}
                  userId={data.userId}
                  del={true}
                />
              ))}
          </ScrollView>
          <View
            style={{
              position: "absolute",
              width: "35%",
              top: 630,
              left: "75%",
              height: "auto",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "green",
                width: "60%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                borderRadius: 15,
                borderWidth: 1,
                borderColor: "white",
                height: 60,
              }}
              onPress={() => {
                navigation.navigate("ask_query");
              }}
            >
              <MaterialIcons name="question-answer" size={34} color="white" />
              {/* <Text
                style={{
                  color: "white",
                  fontSize: 30,
                }}
              >
                Ask
              </Text> */}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default MyPosts;
