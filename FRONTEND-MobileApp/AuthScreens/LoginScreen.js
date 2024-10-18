import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import LottieView from "lottie-react-native";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setUserInfo } from "../slice/userAuthSlice";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const loginUser = () => {
    if (email.trim() === "" || password.trim() === "") {
      ToastAndroid.show("Fill all fields", ToastAndroid.SHORT);
      return; // Stop further execution
    }

    setLoading(true);

    axios
      .post(`${process.env.EXPO_PUBLIC_BACKEND}api/user/login`, {
        email,
        password,
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 201) {
          ToastAndroid.show("Login Successful", ToastAndroid.SHORT);
          dispatch(
            setUserInfo({
              userId: response.data.userId,
              role: response.data.role,
              login: true,
            })
          );
        }
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 50 }}>
        <View>
          <Text style={styles.heading1}>Login</Text>
          <Text style={styles.heading2}>Sign in to continue</Text>
        </View>
        <View
          style={{
            width: "100%",
            height: "100%",
            paddingLeft: "5%",
            marginTop: "10%",
          }}
        >
          <View
            style={{
              marginTop: 30,
            }}
          >
            <Text style={styles.heading3}>EMAIL</Text>
            <TextInput
              cursorColor={"#1c6269"}
              style={styles.textbox}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="eg. Srushtijagtap@codexslinger.com"
              onChangeText={(newText) => setEmail(newText)}
            />
          </View>
          <View
            style={{
              marginTop: 30,
            }}
          >
            <Text style={styles.heading3}>PASSWORD</Text>
            <TextInput
              cursorColor={"#1c6269"}
              style={styles.textbox}
              secureTextEntry
              autoCapitalize="none"
              placeholder="eg. Idhar_Deep@hai"
              onChangeText={(newText) => setPassword(newText)}
            />
          </View>
          <TouchableOpacity onPress={loginUser} style={styles.signupbtn}>
            {!loading ? (
              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                }}
              >
                Log In
              </Text>
            ) : (
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
                source={require("../Loading/auth.json")}
              />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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

  heading3: {
    fontSize: 16,
    color: "#1c6269",
  },

  heading1: {
    fontSize: 50,
    textAlign: "center",
    marginTop: 20,
    color: "#1c6269",
  },
  heading2: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    color: "#1c6269",
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

export default LoginScreen;
