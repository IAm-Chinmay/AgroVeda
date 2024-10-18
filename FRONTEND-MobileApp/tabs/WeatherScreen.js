import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import LottieView from "lottie-react-native";
import FarmNewsComp from "../Components/FarmNewsComp";
import { useSelector } from "react-redux";

const WeatherScreen = ({ navigation }) => {
  const [res, setRes] = useState();
  const [dailyRes, setDailyRes] = useState();
  const [news, setNews] = useState();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefresh] = useState(false);

  const lat = useSelector((state) => state.location.lat);
  const long = useSelector((state) => state.location.long);

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    currentWeather();
    get7DaysWeather();
    getNews();
    setRefresh(false);
  }, []);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // const API_KEY = "2b2bdf31dcaf5fb4ca6302db6d2596d9";
  // const API_KEYchin = "9a6499bb8ce4f0dacd38ae51dbcb0cf4";

  //Expires on 10 Aug

  const currentWeather = async () => {
    await axios
      .post(
        `https://api.weatherapi.com/v1/current.json?key=ebd9f70e4d5042a289e125017242707&q=${lat},${long}&aqi=no`
      )
      .then((res) => {
        setRes(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const get7DaysWeather = async () => {
    await axios
      .post(
        `https://api.weatherapi.com/v1/forecast.json?key=ebd9f70e4d5042a289e125017242707&q=${lat},${long}&days=7&aqi=no&alerts=yes`
      )
      .then((res) => {
        setDailyRes(res.data.forecast.forecastday);
      })
      .catch((e) => {
        console.log("Dailly --- er ", e);
        setLoading(false);
      });
  };

  const getNews = async () => {
    await axios
      .get(
        "https://newsdata.io/api/1/news?apikey=pub_497914dd7132d6313d3f2d7ebcc22ccf98cc6&q=Agriculture,Farming,Farmer,Crops&country=in"
      )
      .then((res) => {
        setNews(res.data.results);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  useEffect(() => {
    const fetchWeatherData = async () => {
      await currentWeather();
      await get7DaysWeather();
      await getNews();
      setLoading(false);
    };

    fetchWeatherData();
  }, [lat, long]);

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
          source={require("../Loading/WLoading.json")}
        />
      )}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!loading && res && (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 120,
                }}
              >
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: 600,
                    color: "#155e63",
                  }}
                >
                  {res.location.name}
                </Text>
                <Text
                  style={{
                    fontSize: 35,
                    fontWeight: 800,
                    color: "#155e63",
                  }}
                >
                  {res.current.feelslike_c}°C
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    marginTop: 15,
                    color: "#155e63",
                  }}
                >
                  Sunset : 7:12pm
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    marginTop: 5,
                    color: "#155e63",
                  }}
                >
                  Sunrise : 7:12pm
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{
                    uri: `https:${res.current.condition.icon}`,
                  }}
                  style={{
                    width: 160,
                    height: 160,
                    resizeMode: "contain",
                  }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    // left: "10%",
                    color: "#155e63",
                  }}
                >
                  {res.current.condition.text}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#bdd1d3",
                  width: "45%",
                  borderRadius: 10,
                  elevation: 10,
                  marginTop: 20,
                  height: 180,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color: "#155e63",
                    marginTop: 30,
                  }}
                >
                  General
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#155e63",
                    marginTop: 10,
                  }}
                >
                  Feels Like : {res.current.feelslike_c} °C
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    marginTop: 10,
                    color: "#155e63",
                    marginBottom: 15,
                  }}
                >
                  Humidity : {res.current.humidity}%
                </Text>
              </View>

              <View
                style={{
                  marginTop: 20,
                  backgroundColor: "#bdd1d3",
                  width: "45%",
                  borderRadius: 10,
                  elevation: 10,
                  height: 180,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color: "#155e63",
                    marginTop: 30,
                  }}
                >
                  Wind
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#155e63",
                    marginTop: 10,
                  }}
                >
                  Speed : {res.current.wind_kph} KPH
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#155e63",
                    marginTop: 10,
                    marginBottom: 15,
                  }}
                >
                  Direction:{" "}
                  {res.current.wind_dir
                    ? "West"
                    : "W"
                    ? "East"
                    : "E"
                    ? "North"
                    : "N"
                    ? "South"
                    : "S"}
                </Text>
              </View>
            </View>
          </>
        )}
        {!loading && news && (
          <>
            <Text
              style={{
                textAlign: "center",
                marginTop: 30,
                fontSize: 40,
                fontWeight: 600,
                color: "#155e63",
              }}
            >
              News
            </Text>
            <View
              style={{
                marginTop: 20,
                backgroundColor: "#bdd1d3",
                height: 400,
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  top: 20,
                  left: 20,
                  color: "#155e63",
                }}
              >
                Current News ...
              </Text>
              <ScrollView horizontal>
                {!loading &&
                  news &&
                  news.map((e) => (
                    <FarmNewsComp
                      key={e.title}
                      img={e.image_url}
                      title={e.title}
                      date={e.pubDate}
                      logo={e.source_icon}
                      link={e.link}
                    />
                  ))}
              </ScrollView>
            </View>
          </>
        )}
        {!loading && dailyRes && (
          <>
            <Text
              style={{
                marginTop: 30,
                fontSize: 25,
                paddingLeft: 20,
                fontWeight: 600,
                color: "#155e63",
              }}
            >
              Daily Weather
            </Text>
            <View
              style={{
                marginTop: 20,
                marginBottom: 20,
                backgroundColor: "#76b39d",
                width: "94%",
                marginLeft: "3%",
                borderRadius: 15,
              }}
            >
              {dailyRes.map((e, index) => (
                <View key={e.date}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("modal", {
                        temp: e.day.avgtemp_c,
                        wind: e.day.maxwind_kph,
                        rain: e.day.daily_chance_of_rain,
                        humidity: e.day.avghumidity,
                        name: e.day.condition.text,
                        img: e.day.condition.icon,
                      })
                    }
                  >
                    <View
                      style={{
                        marginRight: 20,
                        marginLeft: 20,
                        alignItems: "center",
                        flexDirection: "row",
                        marginBottom: 10,
                        borderBottomColor: "black",
                        borderBottomWidth: index !== 6 ? 1 : 0,
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 800,
                          color: "#155e63",
                        }}
                      >
                        {index == 0
                          ? "Today"
                          : daysOfWeek[new Date(e.date).getDay()]}
                      </Text>
                      <Image
                        source={{
                          uri: `https:${e.day.condition.icon}`,
                        }}
                        style={{
                          width: 50,
                          height: 50,
                          resizeMode: "contain",
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 800,
                          color: "#155e63",
                        }}
                      >
                        {e.day.mintemp_c} °C / {e.day.maxtemp_c} °C
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

export default WeatherScreen;
