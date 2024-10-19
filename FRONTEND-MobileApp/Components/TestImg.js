import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Vibration,
} from "react-native";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as FileSystem from "expo-file-system";
import LottieView from "lottie-react-native";
import axios from "axios";
import { useSelector } from "react-redux";

const API_KEY = "AIzaSyApXkCueJoSb5CQrwRCbWPwzDJgSxjvgh8";

const TestImg = ({ navigation, route }) => {
  const [responseText, setResponseText] = useState();
  const [loading, setLoading] = useState(false);

  const userId = useSelector((state) => state.userAuth.userId);

  const { image, newcrop, desc, part } = route.params;

  const fileToGenerativePart = async (fileUri) => {
    const fileData = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return {
      inlineData: { data: fileData, mimeType: "image/jpeg" },
    };
  };

  useEffect(() => {
    const playAlertSoundAndVibrate = async () => {
      try {
        // Load and play sound
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/disease_detect.mp3")
        );
        await sound.playAsync();

        // Trigger vibration
        Vibration.vibrate();
      } catch (error) {
        console.error("Error playing sound or vibrating:", error);
      }
    };

    const DieaseProcess = async () => {
      setLoading(true);
      try {
        await fetchData();
      } catch (er) {
        console.log(er);
      } finally {
        playAlertSoundAndVibrate();
        setLoading(false);
      }
    };
    DieaseProcess();
  }, []);

  const fetchData = async () => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log(image);
    // const prompt = `This is an ${newcrop} plant, give disease name (key as disease) ,its symptoms (key as symptoms), disease description in 100 words (key as description), give fertilizer name in form of multiple code numbers (in  N,P,K only) in array only for Maharashtra, set key as 'fertilizers' nothing extra, if it healthy give output as healthy and if not plant give output as Not Plant, in JSON format only just give JSON format nothing extra.`;
    // const prompt = `This is a ${newcrop} plant, give disease name (key as disease) ,its symptoms (key as symptoms), disease description in 100 words (key as description), give it's stage (with keyword stage) ,give solution in fertilizer from this list [10-26-26,19-19-19,15-15-15,16-16-16,12-32-16,18-18-10,12-32-12,18-18-10,18-46-0,20-20-0,23-24-0,28-28-0,14-35-14,14-28-14,24-24-24,11-52-0,10-10-10], set key as 'fertilizers' nothing extra, if pesticide is available give pesticide or give false, if fungicide is available give fungicide or give false, if herbicide is available give herbicide or give false , if plant is healthy give output as healthy and if it is not plant give output as Not Plant, in JSON format only just give JSON format nothing extra, format as {disease : "" , stage : "",symptoms : "" , description:"" , fertilizers : true or false ,pesticide : true or false , herbicide : true or false ,fungicide: true or false , healthy: true or false, plant : true or false}`;
    const systemInstruction = `
      You are an expert in plant pathology and agricultural science.
      Your task is to assist farmers by analyzing plant disease symptoms and providing actionable insights,
      including fertilizers, pesticides, fungicides, herbicides, insecticides, and confidence level of the diagnosis.
      Please follow the required JSON format strictly and provide only accurate information.
      Do not invent diseases; use only relevant diseases for the given plant and region.
    `;
    const prompt = `Analyze the provided image and user-provided details to identify the plant disease, its stage, symptoms, description, prevention methods, recommended fertilizers, pesticides, fungicides,insecticide, or herbicides, and a confidence level for the diagnosis.

  User-Provided Details:

  Plant Name : ${newcrop}

  Description: ${desc}

  Location:Maharashtra , india

  Part Affected : ${part}

  Output Format:

  JSON: Provide output in JSON format with the following fields:

  disease: Standard Name of disease

  stage: The stage of the disease.

  symptoms: A description of the symptoms.

  description: A brief overview of the disease.

  prevention: Preventive measures.

  fertilizers: Recommended fertilizers (or "false" if none).

  pesticide: "true" or "false" for pesticide recommendation.

  fungicide: "true" or "false" for fungicide recommendation.

  herbicide: "true" or "false" for herbicide recommendation.

  insecticide: "true" or "false" for insecticide recommendation.

  healthy: "true" or "false" indicating plant health.

  plant: "true" or "false" indicating if the subject is a plant.

  confidence: A confidence score for the diagnosis in percentage.

  Guidelines:

  Only give one (pesticide or herbicide or fertilizer or insecticide)

  Leverage the image and user-provided details to improve accuracy.

  Consider factors like plant species, environmental conditions, and common diseases in the given location.

  Provide a comprehensive and informative response.

  Ensure the output is in the correct JSON format.`;
    try {
      setLoading(true);
      const imagePart = await fileToGenerativePart(image);

      const result = await model.generateContent([
        systemInstruction,
        prompt,
        imagePart,
      ]);
      const response = result.response;
      const text = await extractJSON(response.text());
      const JSONRes = await JSON.parse(text);
      console.log(JSONRes);
      setResponseText(JSONRes);
      await sendData(JSONRes);
      {
        navigation.setOptions({
          title: JSONRes.disease,
        });
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  //extract json from response
  const extractJSON = (input) => {
    const jsonRegex = /{.*}/s; // regex to match JSON
    const match = input.match(jsonRegex);
    return match ? match[0] : null; // returns the JSON string if found, else null
  };

  //send the data to backend
  const sendData = async (responseData) => {
    if (!responseData) {
      console.error("Response text is undefined or null");
      return;
    }
    const formdata = new FormData();
    console.log(responseData);
    formdata.append("dName", responseData.disease);
    formdata.append("user", userId);
    formdata.append("dieaseDate", responseData.description);
    formdata.append("image", {
      uri: image,
      type: "image/jpeg", // or 'image/png', based on your image format
      name: image.split("/").pop(), // Extract the file name from the URI
    });

    await axios.post(
      `${process.env.EXPO_PUBLIC_BACKEND}api/dhistory/createDiease`,
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  const data = {
    confidence: 90,
    description:
      "Brown spot is a fungal disease that affects rice plants. It is caused by the fungus Bipolaris oryzae. The disease is characterized by small, brown, oval-shaped spots on the leaves. The spots can be seen on both sides of the leaves, but are more common on the underside.",
    disease: "Brown Spot of Rice",
    fertilizers: "false",
    fungicide: "true",
    healthy: "false",
    herbicide: "false",
    insecticide: "false",
    pesticide: "false",
    plant: "true",
    prevention:
      "Use certified disease-free seeds.Rotate crops. Practice proper water management.Avoid excessive nitrogen fertilization.",
    stage: "Early",
    symptoms: "Small, brown, oval-shaped spots on the leaves.",
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
          source={require("../Loading/loading.json")}
        />
      )}
      {!loading && responseText && (
        <>
          <Image
            style={{ width: 250, height: 200, marginTop: 30, borderRadius: 20 }}
            resizeMode={"cover"}
            source={{
              uri: image,
            }}
          />
          <Text>{responseText.confidence}</Text>
        </>
      )}
      {/* {!loading && responseText && ( */}
      {!loading && responseText && (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: "30%",
          }}
          style={{
            marginTop: 10,
            marginBottom: 50,
          }}
        >
          <View style={{}}>
            <Text
              style={{
                borderWidth: 1,
                width: "30%",
                fontSize: 15,
                fontWeight: 800,
                textAlign: "center",
                borderRadius: 15,
                marginVertical: 10,
              }}
            >
              Stage : {responseText.stage}
            </Text>
          </View>
          <View
            style={{
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              {" "}
              Description{" "}
            </Text>
            <View
              style={{
                borderWidth: 1,
                width: "96%",
                marginLeft: "2%",
                marginTop: 10,
                paddingTop: 1,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                {responseText.description}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            {" "}
            Symptoms{" "}
          </Text>
          <View
            style={{
              borderWidth: 1,
              width: "96%",
              marginLeft: "2%",
              marginTop: 10,
              paddingTop: 1,
              borderRadius: 20,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
              }}
            >
              {responseText.symptoms}
            </Text>
          </View>
          <View
            style={{
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              {" "}
              Preventions{" "}
            </Text>
            <View
              style={{
                borderWidth: 1,
                width: "96%",
                marginLeft: "2%",
                marginTop: 10,
                paddingTop: 1,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                {responseText.prevention}
              </Text>
            </View>
          </View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
            }}
          >
            {responseText.fertilizers === "true" ? (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                }}
              >
                Fertilzer can solve the issue
              </Text>
            ) : responseText.fungicide === "true" ? (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                }}
              >
                Fungicide can solve the issue
              </Text>
            ) : responseText.herbicide ? (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                }}
              >
                Herbidide can solve the issue
              </Text>
            ) : responseText.insecticide === "true" ? (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                }}
              >
                Insecticide can solve the issue
              </Text>
            ) : responseText.pesticide === "true" ? (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                }}
              >
                Pesticide can solve the issue{" "}
              </Text>
            ) : null}
          </Text>

          <View
            style={{
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={{
                height: 60,
                width: "60%",
                backgroundColor: "green",
                justifyContent: "center",
                borderRadius: 25,
                marginLeft: "20%",
              }}
              onPress={() => {
                navigation.navigate("treatment", {
                  crop: newcrop,
                  category:
                    responseText.fertilizers === "true" ||
                    responseText.fertilizers === "True"
                      ? "fertilizer"
                      : responseText.fungicide === "true" ||
                        responseText.fungicide === "True"
                      ? "fungicide"
                      : responseText.herbicide === "true" ||
                        responseText.herbicide === "True"
                      ? "herbicide"
                      : responseText.insecticide === "true" ||
                        responseText.insecticide === "True"
                      ? "insecticide"
                      : responseText.pesticide === "true" ||
                        responseText.pesticide === "True"
                      ? "pesticide"
                      : null,
                  disease_name: responseText.disease,
                });
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  textAlign: "center",
                  color: "white",
                }}
              >
                SEE TREATMENT
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default TestImg;
