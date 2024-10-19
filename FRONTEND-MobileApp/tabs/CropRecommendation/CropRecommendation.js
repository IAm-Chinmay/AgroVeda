import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const CropRecommendation = () => {
  const [rain, setRain] = useState(0);
  const [temp, setTemp] = useState(0);
  const [humid, setHumid] = useState(0);
  const [n, setN] = useState(0);
  const [p, setP] = useState(0);
  const [k, setK] = useState(0);
  const [ph, setPH] = useState(0);

  const lat = useSelector((state) => state.location.lat);
  const long = useSelector((state) => state.location.long);

  const navigation = useNavigation();

  const currentWeather = async () => {
    try {
      const res = await axios.post(
        `https://api.weatherapi.com/v1/current.json?key=ebd9f70e4d5042a289e125017242707&q=${lat},${long}&aqi=no`
      );
      const rainfall = res.data.current.precip_mm;
      const temperature = res.data.current.temp_c;
      const humidity = res.data.current.humidity;

      setRain(rainfall);
      setTemp(temperature);
      setHumid(humidity);

      console.log("Rain:", rainfall);
      console.log("Humidity:", humidity);
      console.log("Temperature:", temperature);
    } catch (err) {
      console.log("Error fetching weather data:", err);
    }
  };

  useEffect(() => {
    if (lat && long) {
      currentWeather();
    }
  }, [lat, long]);

  const onSubmit = () => {
    if (!n || !p || !k || !ph) {
      ToastAndroid.show("All fields are required", ToastAndroid.SHORT);
      return;
    }

    const N_MIN = 0,
      N_MAX = 300;
    const P_MIN = 0,
      P_MAX = 100;
    const K_MIN = 0,
      K_MAX = 250;
    const PH_MIN = 5.5,
      PH_MAX = 7.5;

    if (n < N_MIN || n > N_MAX) {
      ToastAndroid.show(
        `Enter valid Nitrogen (N) value (range ${N_MIN}-${N_MAX} kg/ha)`,
        ToastAndroid.SHORT
      );
      return;
    }

    if (p < P_MIN || p > P_MAX) {
      ToastAndroid.show(
        `Enter valid Phosphorus (P) value (range ${P_MIN}-${P_MAX} kg/ha)`,
        ToastAndroid.SHORT
      );
      return;
    }

    if (k < K_MIN || k > K_MAX) {
      ToastAndroid.show(
        `Enter valid Potassium (K) value (range ${K_MIN}-${K_MAX} kg/ha)`,
        ToastAndroid.SHORT
      );
      return;
    }
    if (ph < PH_MIN || ph > PH_MAX) {
      ToastAndroid.show(
        `Enter valid pH value (range ${PH_MIN}-${PH_MAX})`,
        ToastAndroid.SHORT
      );
      return;
    }
    navigation.navigate("recommendedcrops", {
      rain: rain,
      humid: humid,
      temp: temp,
      n: n,
      p: p,
      k: k,
      ph: ph,
    });
  };

  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          marginVertical: 22,
          fontSize: 30,
          fontWeight: "800",
        }}
      >
        Enter Soil Data
      </Text>
      <View>
        <TextInput
          placeholder="pH Level of soil"
          style={styles.textInput}
          keyboardType="decimal-pad"
          onChangeText={(text) => setPH(parseFloat(text))}
        />
        <TextInput
          placeholder="Nitrogen in soil (N)"
          style={styles.textInput}
          keyboardType="decimal-pad"
          onChangeText={(text) => setN(parseFloat(text))}
        />
        <TextInput
          placeholder="Phosphorus in soil (P)"
          style={styles.textInput}
          keyboardType="decimal-pad"
          onChangeText={(text) => setP(parseFloat(text))}
        />
        <TextInput
          placeholder="Potassium in soil (K)"
          style={styles.textInput}
          keyboardType="decimal-pad"
          onChangeText={(text) => setK(parseFloat(text))}
        />
        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 2,
    height: 50,
    width: "90%",
    marginLeft: "5%",
    paddingHorizontal: 20,
    borderRadius: 15,
    marginVertical: 25,
  },
  submitButton: {
    backgroundColor: "#008000",
    height: 50,
    width: "90%",
    marginLeft: "5%",
    borderRadius: 15,
    marginVertical: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    fontSize: 25,
    color: "white",
    fontWeight: "600",
  },
});

export default CropRecommendation;
