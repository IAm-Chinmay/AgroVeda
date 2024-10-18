import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import LottieView from "lottie-react-native";
import { BarChart } from "react-native-chart-kit";

const MandiPrice = ({ route }) => {
  const { state, crop, checked, year, month, day } = route.params;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showGraph, setShowGraph] = useState(false); // New state for toggling views

  useEffect(() => {
    const callAction = async () => {
      try {
        setLoading(true);
        checked ? await histData() : await getData();
        setLoading(false);
      } catch (error) {
        console.error("Failed to get data:", error);
      }
    };
    callAction();
  }, [state, crop]);

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001fc03d8c2867743784a5cb18bb3ff7fed&format=json&limit=99&filters%5Bstate.keyword%5D=${state}&filters%5Bcommodity%5D=${crop}`
      );
      setData(res.data.records);
    } catch (error) {
      console.log(error);
    }
  };

  const histData = async () => {
    try {
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND}api/histecodata`,
        { crop, state, year, date: day, month }
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <LottieView
        autoPlay
        loop
        speed={2}
        style={styles.lottie}
        source={require("../../Loading/mandi.json")}
      />
    );
  }

  if (!data || data.length === 0) {
    return <Text style={styles.noDataText}>No Data Found</Text>;
  }

  const mandiLabels = data.map((item) =>
    !checked ? item.market : item.Market
  );
  const mandiPrices = data.map((item) =>
    !checked ? parseFloat(item.modal_price) : parseFloat(item.Modal_Price)
  );

  const chartData = {
    labels: mandiLabels.slice(0, 6), // Show max 6 markets for readability
    datasets: [{ data: mandiPrices.slice(0, 6) }],
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          backgroundColor: "#609966",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          height: 60,
          marginLeft: "5%",
          marginTop: "5%",
          borderRadius: 15,
        }}
        onPress={() => setShowGraph(!showGraph)}
      >
        {showGraph ? (
          <Text
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#EDF1D6",
            }}
          >
            Show List
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#EDF1D6",
            }}
          >
            Show Graph
          </Text>
        )}
      </TouchableOpacity>
      {!checked ? (
        <Text
          style={{
            textAlign: "center",
            fontSize: 25,
            fontWeight: 800,
            color: "#EDF1D6",
          }}
        >
          Today's Pricing
        </Text>
      ) : (
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            fontWeight: 800,
            paddingTop: 30,
            color: "#EDF1D6",
          }}
        >
          Prices
        </Text>
      )}
      {showGraph ? (
        <ScrollView
          style={{
            height: "100%",
          }}
          contentContainerStyle={
            {
              // alignItems: "center",
            }
          }
          horizontal
        >
          <BarChart
            data={chartData}
            width={Dimensions.get("window").width * 1.5}
            height={400}
            yAxisLabel="₹"
            chartConfig={{
              backgroundColor: "#609966", // Set background color to light green
              backgroundGradientFrom: "#EDF1D6", // Optional: Set a lighter gradient if needed
              backgroundGradientTo: "#EDF1D6", // Optional: Set a lighter gradient if needed
              decimalPlaces: 0,
              color: (opacity = 0) => `rgba(64, 81, 59, ${opacity})`, // Bar color to dark green
              style: { borderRadius: 16 },
            }}
            verticalLabelRotation={30}
            style={styles.chart}
          />
        </ScrollView>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <MandiCard
              commodity={!checked ? item.commodity : item.Commodity}
              market={!checked ? item.market : item.Market}
              district={!checked ? item.district : item.District}
              min_price={!checked ? item.min_price : item.Min_Price}
              max_price={!checked ? item.max_price : item.Max_Price}
              avg={!checked ? item.modal_price : item.Modal_Price}
              date={!checked ? item.arrival_date : item.Arrival_Date}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingBottom: 150,
          }}
        />
      )}
    </View>
  );
};

const MandiCard = ({
  commodity,
  market,
  district,
  min_price,
  max_price,
  avg,
  date,
}) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <Text style={styles.label}>Commodity:</Text>
      <Text style={styles.value}>{commodity}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Market:</Text>
      <Text style={styles.value}>{market}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>District:</Text>
      <Text style={styles.value}>{district}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Min Price:</Text>
      <Text style={styles.value}>₹{min_price}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Max Price:</Text>
      <Text style={styles.value}>₹{max_price}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Avg Price:</Text>
      <Text style={styles.value}>₹{avg}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Arrival Date:</Text>
      <Text style={styles.value}>{date}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { marginVertical: 20, backgroundColor: "#40513B" },
  lottie: { height: "100%", width: "100%" },
  noDataText: {
    textAlign: "center",
    marginTop: "45%",
    fontSize: 40,
    fontWeight: "600",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "95%",
    marginLeft: "2.5%",
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: { fontWeight: "bold", fontSize: 16 },
  value: { fontSize: 16, color: "#333" },
  chart: { marginVertical: 50, borderRadius: 16 },
});

export default MandiPrice;
