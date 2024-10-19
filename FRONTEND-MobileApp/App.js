//React Hooks
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import * as Location from "expo-location";
// import { Text, TouchableOpacity } from "react-native";

//Slice and Store
import { store } from "./store/store";
import { changeLat } from "./slice/locationSlice";

//Dashboard
import MainPage from "./MainPage";
import Mandi from "./tabs/Mandi/Mandi";
import MandiPrice from "./tabs/Mandi/MandiPrice";
import WeatherScreen from "./tabs/WeatherScreen";
import CameraScreen from "./tabs/CameraScreen";

//Auth
import LoginScreen from "./AuthScreens/LoginScreen";
import RegisterScreen from "./AuthScreens/RegisterScreen";

//Components
import WeatherModel from "./Components/WeatherModel";
import TestImg from "./Components/TestImg";
import Treatment from "./Components/RecommendTreatment.js/Treatment";
import FindVendors from "./Components/RecommendTreatment.js/FindVendors";
//other
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Octicons from "@expo/vector-icons/Octicons";
import Entypo from "@expo/vector-icons/Entypo";

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
function MainApp() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.userAuth.login);

  useEffect(() => {
    const getLocationAsync = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        dispatch(
          changeLat({
            lat: location.coords.latitude,
            long: location.coords.longitude,
          })
        );
        console.log(location.coords.latitude);
      }
    };
    getLocationAsync();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainStack.Navigator>
          <MainStack.Group
            screenOptions={{
              contentStyle: {
                backgroundColor: "#fcfbf5",
              },
            }}
          >
            <MainStack.Screen
              name="Home"
              component={MainPage}
              options={{
                headerShown: false,
                statusBarHidden: true,
              }}
            />
          </MainStack.Group>
          <MainStack.Group>
            <MainStack.Screen
              name="mandi"
              component={Mandi}
              options={{
                title: "Find Mandi Price",
                statusBarHidden: true,
              }}
            />
            <MainStack.Screen
              name="mandiprice"
              component={MandiPrice}
              options={{
                headerShown: false,
                statusBarHidden: true,
              }}
            />
          </MainStack.Group>
          <MainStack.Group>
            <MainStack.Screen
              name="Weather_updates"
              options={{
                statusBarHidden: true,
                title: "Weather Forecast",
                headerStyle: {
                  backgroundColor: "#76b39d",
                  height: 150,
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              component={WeatherScreen}
            />
            <MainStack.Group
              screenOptions={{
                presentation: "transparentModal",
                animation: "slide_from_bottom",
                animationDuration: 2,
              }}
            >
              <MainStack.Screen
                options={{
                  headerShown: false,
                }}
                name="modal"
                component={WeatherModel}
              />
            </MainStack.Group>
          </MainStack.Group>
          <MainStack.Group>
            <MainStack.Screen
              name="Test_Image"
              component={CameraScreen}
              options={{
                // headerShown: false,

                statusBarHidden: true,
                headerStyle: {
                  backgroundColor: "#bdd1d3",
                },
                headerLeft: () => (
                  <Entypo name="location-pin" size={34} color="#155e6d" />
                ),
              }}
            />
            <MainStack.Screen
              name="treatment"
              component={Treatment}
              options={{
                headerShown: false,
                statusBarHidden: true,
              }}
            />
            <MainStack.Screen
              name="nearestvendors"
              component={FindVendors}
              options={{
                headerShown: false,
                statusBarHidden: true,
              }}
            />
            <MainStack.Screen
              name="Image_Result"
              component={TestImg}
              options={{
                title: "Loading...",
                // headerShown: false,
                statusBarHidden: true,
              }}
            />
          </MainStack.Group>
        </MainStack.Navigator>
      ) : (
        <AuthStack.Navigator initialRouteName="Registration_Screen">
          <AuthStack.Group>
            <AuthStack.Screen
              name="Registration_Screen"
              component={RegisterScreen}
              options={{
                headerShown: false,
                statusBarHidden: true,
              }}
            />
            <AuthStack.Screen
              name="Login_Screen"
              component={LoginScreen}
              options={{
                headerShown: false,
                statusBarHidden: true,
              }}
            />
          </AuthStack.Group>
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
