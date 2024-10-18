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
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import LottieView from "lottie-react-native";
import axios from "axios";

import { setUserInfo } from "../slice/userAuthSlice";

const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();

  const registerUser = () => {
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      role.trim() === ""
    ) {
      ToastAndroid.show("Fill all fields", ToastAndroid.SHORT);
      return; // Stop further execution
    }

    setLoading(true);

    axios
      .post(`${process.env.EXPO_PUBLIC_BACKEND}api/user/signup`, {
        username,
        email,
        password,
        role,
      })
      .then((response) => {
        if (response.status === 201) {
          ToastAndroid.show("Registration Successful", ToastAndroid.SHORT);
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
      <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 10 }}>
        <View>
          <Text style={styles.heading1}>Create New Account</Text>
          <Text
            onPress={() => {
              navigation.navigate("Login_Screen");
            }}
            style={styles.heading2}
          >
            Already Registered? Log in here.
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: "100%",
            paddingLeft: "5%",
            marginTop: "10%",
          }}
        >
          <View>
            <Text style={styles.heading3}>NAME</Text>
            <TextInput
              cursorColor={"#1c6269"}
              style={styles.textbox}
              keyboardType="default"
              placeholder="eg. Srushti Jagtap"
              onChangeText={(newText) => setUsername(newText)}
            />
          </View>
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
              placeholder="eg. DeepHirani@codexslinger.com"
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
              placeholder="eg. chinmay_ka_password"
              onChangeText={(newText) => setPassword(newText)}
            />
          </View>
          <View
            style={{
              marginTop: 30,
            }}
          >
            <Text style={styles.heading3}>Select Role</Text>
            <View
              style={{
                marginTop: 10,
                height: 60,
                width: "95%",
                borderWidth: 2,
                borderColor: "#1c6269",
                fontSize: 20,
                color: "#1c6269",
                //   marginTop: 10,
                paddingLeft: 15,
              }}
            >
              <Picker
                selectedValue={role}
                style={styles.picker}
                onValueChange={(itemValue) => setRole(itemValue)}
              >
                <Picker.Item label="Farmer" value="Farmer" />
                <Picker.Item label="Not Farmer" value="User" />
              </Picker>
            </View>
          </View>
          <TouchableOpacity onPress={registerUser} style={styles.signupbtn}>
            {!loading ? (
              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                }}
              >
                Sign Up
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

export default RegisterScreen;
