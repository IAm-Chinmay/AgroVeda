//React Hooks
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import * as Location from "expo-location";
import { Text, TouchableOpacity } from "react-native";

//Slice and Store
import { store } from "./store/store";
import { changeLat } from "./slice/locationSlice";

//Dashboard
import MainPage from "./MainPage";
import Mandi from "./tabs/Mandi/Mandi";
import MandiPrice from "./tabs/Mandi/MandiPrice";
import WeatherScreen from "./tabs/WeatherScreen";
import CameraScreen from "./tabs/CameraScreen";
import CommunityForum from "./tabs/CommunityForum";

//Auth
import LoginScreen from "./AuthScreens/LoginScreen";
import RegisterScreen from "./AuthScreens/RegisterScreen";

//Components
import WeatherModel from "./Components/WeatherModel";
import TestImg from "./Components/TestImg";
import Treatment from "./Components/RecommendTreatment.js/Treatment";
import FindVendors from "./Components/RecommendTreatment.js/FindVendors";
import AskQuery from "./Components/CommunityForum/AskQuery";
import DetailQuery from "./Components/CommunityForum/DetailQuery";
import MyPosts from "./Components/CommunityForum/MyPosts";

//other
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Octicons from "@expo/vector-icons/Octicons";
import Entypo from "@expo/vector-icons/Entypo";

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const BottomStack = createBottomTabNavigator();

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

  function BottomTabNavigator() {
    return (
      <BottomStack.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let sizes;
            if (route.name === "Disscussion") {
              iconName = focused ? "comment-discussion" : "comment-discussion";
              sizes = focused ? 24 : 34;
            } else if (route.name === "My_Post") {
              iconName = focused ? "feed-person" : "feed-person";
              sizes = focused ? 24 : 34;
            }
            return <Octicons name={iconName} size={sizes} color={color} />;
          },
          tabBarLabel: ({ focused }) => {
            let name;
            let non;
            if (route.name === "Disscussion") {
              name = focused ? "Discuss" : "";
              non = focused ? "" : "none";
            } else if (route.name === "My_Post") {
              name = focused ? "My Post" : "";
              non = focused ? "" : "none";
            }
            return (
              <Text
                style={{
                  color: "#58ceb2",
                  display: non && "none",
                  fontWeight: 800,
                }}
              >
                {name}
              </Text>
            );
          },
          tabBarActiveTintColor: "#58ceb2",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            paddingVertical: 5,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: "white",
            position: "absolute",
            height: 50,
          },
          tabBarLabelStyle: { paddingBottom: 3 },
        })}
      >
        <BottomStack.Screen
          name="Disscussion"
          options={{
            statusBarHidden: true,
            title: "Discussion",
            headerStyle: {
              backgroundColor: "#76b39d",
              height: 50,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          component={CommunityForum}
        />
        <BottomStack.Screen
          name="My_Post"
          options={{
            statusBarHidden: true,
            title: "My Posts",
            headerStyle: {
              backgroundColor: "#76b39d",
              height: 50,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          component={MyPosts}
        />
      </BottomStack.Navigator>
    );
  }

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
          <MainStack.Screen
            name="community_forum"
            options={{
              // statusBarHidden: true,
              // title: "Meet your peers",
              // headerStyle: {
              //   backgroundColor: "#76b39d",
              //   height: 150,
              // },
              // headerTintColor: "#fff",
              // headerTitleStyle: {
              //   fontWeight: "bold",
              // },
              headerShown: false,
              statusBarHidden: true,
            }}
            component={BottomTabNavigator}
          />
          <MainStack.Screen
            name="ask_query"
            component={AskQuery}
            options={{
              title: "Ask your query",
              headerShown: false,
              statusBarHidden: true,
            }}
          />
          <MainStack.Screen
            name="detail_query"
            component={DetailQuery}
            options={{
              title: "Ask your query",
              headerShown: false,
              statusBarHidden: true,
            }}
          />
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
