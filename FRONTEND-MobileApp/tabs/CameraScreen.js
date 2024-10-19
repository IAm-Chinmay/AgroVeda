import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";

import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

const CameraScreen = () => {
  const [crop, setCrop] = useState();
  const [cropDesc, setCropDesc] = useState();
  const [part, setPart] = useState();
  const [history, setHistory] = useState();
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const userId = useSelector((state) => state.userAuth.userId);

  useEffect(() => {
    //Fix This
    navigation.setOptions({
      title: "Akurdi",
    });
    const fetchHistory = async () => {
      setLoading(true);
      try {
        await getDHistory();
        await getAddress();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const uploadImage = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      }).then((result) => {
        if (result) {
          navigation.navigate("Image_Result", {
            image: result.assets[0].uri,
            newcrop: crop,
            desc: cropDesc,
            part: part,
          });
        }
      });
    } catch (e) {
      alert("Error Occured");
      throw e;
    }
  };

  const getDHistory = async () => {
    console.log(process.env.EXPO_PUBLIC_BACKEND);
    await axios
      .post(`${process.env.EXPO_PUBLIC_BACKEND}api/dhistory/getdiseases`, {
        userId: `${userId}`,
      })
      .then((res) => {
        console.log(res.data);
        setHistory(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const lat = useSelector((state) => state.location.lat);
  const lon = useSelector((state) => state.location.long);

  const getAddress = async () => {
    try {
      const response = await axios.get("https://geocode.maps.co/reverse", {
        params: {
          lat: lat,
          lon: lon,
          api_key: "670ec062a1482448803045proe3227e",
        },
      });

      const data = response.data;
      const city = data.address.city || "";

      navigation.setOptions({
        title: city,
      });
    } catch (error) {
      console.error("Error fetching reverse geocode data:", error);
    }
  };

  return (
    <>
      <View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 800,
            marginTop: 20,
            textAlign: "center",
            color: "#155e63",
          }}
        >
          Transform farming with tech..
        </Text>
        <View
          style={{
            backgroundColor: "#76b39d",
            width: "98%",
            marginLeft: "1%",
            borderRadius: 15,
            marginTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 50,
            }}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: "#fcfbf5",
                width: 90,
                height: 100,
                justifyContent: "center",
                borderRadius: 15,
                elevation: 10,
              }}
            >
              <Entypo name="camera" size={44} color="#155e63" />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#155e63",
                }}
              >
                Take Pic
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <FontAwesome5 name="greater-than" size={24} color="#155e63" />
            </View>
            <View
              style={{
                alignItems: "center",
                backgroundColor: "#fcfbf5",
                width: 90,
                height: 100,
                justifyContent: "center",
                borderRadius: 15,
                elevation: 10,
              }}
            >
              <FontAwesome name="files-o" size={44} color="#155e63" />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  textAlign: "center",
                  color: "#155e63",
                }}
              >
                See Diagnosis
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <FontAwesome5 name="greater-than" size={24} color="#155e63" />
            </View>
            <View
              style={{
                alignItems: "center",
                backgroundColor: "#fcfbf5",
                width: 90,
                height: 100,
                justifyContent: "center",
                borderRadius: 15,
                elevation: 10,
              }}
            >
              <Image
                source={require("../assets/fertilizer.png")}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  textAlign: "center",
                  color: "#155e63",
                }}
              >
                Get Medicine
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-evenly",
              marginBottom: 50,
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder="Enter Crop Name"
              style={{
                height: 40,
                borderBlockColor: "black",
                borderWidth: 1,
                width: 230,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 40,
                paddingLeft: 20,
                backgroundColor: "#f6fbf5",
                borderRadius: 10,
                color: "#155e63",
              }}
              defaultValue={crop}
              onChangeText={(newText) => setCrop(newText)}
              clearButtonMode="always"
            />
            <TextInput
              placeholder="Describe the problem in short"
              style={{
                height: 40,
                borderBlockColor: "black",
                borderWidth: 1,
                width: 230,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                paddingLeft: 20,
                backgroundColor: "#f6fbf5",
                borderRadius: 10,
                color: "#155e63",
              }}
              defaultValue={cropDesc}
              onChangeText={(newText) => setCropDesc(newText)}
              clearButtonMode="always"
            />
            <TextInput
              placeholder="Which part is affected ?"
              style={{
                height: 40,
                borderBlockColor: "black",
                borderWidth: 1,
                width: 230,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                paddingLeft: 20,
                backgroundColor: "#f6fbf5",
                borderRadius: 10,
                color: "#155e63",
              }}
              defaultValue={part}
              onChangeText={(newText) => setPart(newText)}
              clearButtonMode="always"
            />
            {crop && part && cropDesc && (
              <TouchableOpacity
                style={{
                  backgroundColor: "#155e63",
                  height: 50,
                  width: 80,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 30,
                  marginTop: 40,
                }}
                onPress={() => uploadImage()}
              >
                <Entypo name="camera" size={30} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            fontWeight: 800,
            color: "#155e63",
          }}
        >
          History of Diagnosis
        </Text>
        {loading && (
          <LottieView
            autoPlay
            loop={true}
            speed={2}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: "50%",
              width: "100%",
            }}
            source={require("../Loading/history.json")}
          />
        )}
        {history && (
          <ScrollView
            contentContainerStyle={{
              paddingBottom: "100%",
            }}
            style={{
              marginBottom: 50,
              height: 520,
            }}
          >
            {history?.map((hs) => (
              <View
                key={hs._id}
                style={{
                  width: "90%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginLeft: "5%",
                  borderRadius: 10,
                  marginTop: 10,
                }}
              >
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 20,
                    marginTop: 15,
                    marginLeft: 15,
                    marginBottom: 15,
                  }}
                  resizeMode={"cover"}
                  source={{
                    uri: `${process.env.EXPO_PUBLIC_BACKEND}${hs.image}`,
                  }}
                />
                <View
                  style={{
                    flexDirection: "column",
                    width: "60%",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: 600,
                      color: "#196605",
                    }}
                  >
                    {hs.dieasesName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#196605",
                      marginTop: 10,
                    }}
                  >
                    Diagnosis Date :{" "}
                    {new Date(hs.dieaseDate).toISOString().split("T")[0]}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default CameraScreen;
