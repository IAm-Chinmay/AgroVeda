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
import FarmerMarket from "./tabs/FarmerMarket/FarmerMarket";
import FarmerToolsMarket from "./tabs/FarmerMarket/FarmerToolsMarket";

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
import DetailedProduct from "./Components/Market/DetailedProduct";
import MyProducts from "./Components/Market/MyProducts";
import SearchProduct from "./Components/Market/SearchProduct";
import NonFarmerMarket from "./MarketForNonFamers/NonFarmerMarket";

//other
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Octicons from "@expo/vector-icons/Octicons";
import Entypo from "@expo/vector-icons/Entypo";
import { MaterialIcons } from "@expo/vector-icons";
import { StripeProvider } from "@stripe/stripe-react-native";

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const BottomStack = createBottomTabNavigator();

function MainApp() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.userAuth.login);
  const userRole = useSelector((state) => state.userAuth.role);

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

  function BottomMarketNavigator() {
    return (
      <BottomStack.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let sizes;
            if (route.name === "farmermarket") {
              iconName = focused ? "shopping-cart" : "shopping-cart";
              sizes = focused ? 24 : 34;
            } else if (route.name === "farmermarkettools") {
              iconName = focused ? "sell" : "sell";
              sizes = focused ? 24 : 34;
            }
            return <MaterialIcons name={iconName} size={sizes} color={color} />;
          },
          tabBarLabel: ({ focused }) => {
            let name;
            let non;
            if (route.name === "farmermarket") {
              name = focused ? "Bazar" : "";
              non = focused ? "" : "none";
            } else if (route.name === "farmermarkettools") {
              name = focused ? "Sell Crops" : "";
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
            height: 60,
          },
          tabBarLabelStyle: { paddingBottom: 3 },
        })}
      >
        <BottomStack.Screen
          name="farmermarket"
          options={{
            statusBarHidden: true,
            title: "Bazar",
            headerStyle: {
              backgroundColor: "#76b39d",
              height: 50,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          component={FarmerMarket}
        />
        <BottomStack.Screen
          name="farmermarkettools"
          options={{
            statusBarHidden: true,
            title: "Sell Your Crops",
            headerStyle: {
              backgroundColor: "#76b39d",
              height: 50,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          component={FarmerToolsMarket}
        />
      </BottomStack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainStack.Navigator>
          {userRole === "User" ? (
            <MainStack.Group>
              <MainStack.Screen
                name="nonfarmermarket"
                component={NonFarmerMarket}
                options={{
                  headerShown: false,
                  statusBarHidden: true,
                }}
              />
            </MainStack.Group>
          ) : (
            <MainStack.Group>
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
              </MainStack.Group>
              <MainStack.Group
                screenOptions={{
                  presentation: "containedModal",
                  animation: "fade",
                  animationDuration: 1,
                }}
              >
                <MainStack.Screen
                  name="Image_Result"
                  component={TestImg}
                  options={{
                    title: "Loading...",
                    // headerShown: false,
                    // statusBarHidden: true,
                  }}
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
              </MainStack.Group>
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
              <MainStack.Group>
                <MainStack.Screen
                  name="FarmerMarket"
                  component={BottomMarketNavigator}
                  options={{
                    headerShown: false,
                    statusBarHidden: true,
                  }}
                />
                <MainStack.Screen
                  name="myproduct"
                  component={MyProducts}
                  options={{
                    title: "My Products",
                    statusBarHidden: true,
                  }}
                />
                <MainStack.Screen
                  name="searchproduct"
                  component={SearchProduct}
                  options={{
                    title: "Searched Results",
                    statusBarHidden: true,
                  }}
                />
                <MainStack.Screen
                  name="detailedproduct"
                  component={DetailedProduct}
                  options={{
                    title: "Buy this product",
                    statusBarHidden: true,
                  }}
                />
              </MainStack.Group>
              <MainStack.Group>
                <MainStack.Screen
                  name="croprecommendation"
                  component={CropRecommendation}
                  options={{
                    title: "Crop Recommendation",
                    statusBarHidden: true,
                  }}
                />
                <MainStack.Screen
                  name="recommendedcrops"
                  component={RecommendedCrops}
                  options={{
                    title: "Top 3 Crops",
                    statusBarHidden: true,
                  }}
                />
                <MainStack.Screen
                  name="detailcroprecommendation"
                  component={DetailedCropRecommendation}
                  options={{
                    title: "Recommended Crop",
                    statusBarHidden: true,
                  }}
                />
                <MainStack.Screen
                  name="cropsteps"
                  component={CropRSteps}
                  options={{
                    title: "Follow this steps",
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
            </MainStack.Group>
          )}
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
    <StripeProvider publishableKey="pk_test_51QBcZQRrq29vGEbGNbdau4pjlkJX8oXAYcLjEFn5CbulDQjevjtneRYDZ3pTOQtrWObzhV6YI6tBYS6iMX18RDc600n8m9i58y">
      <Provider store={store}>
        <MainApp />
      </Provider>
    </StripeProvider>
  );
}
