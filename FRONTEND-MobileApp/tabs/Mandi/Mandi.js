import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useState } from "react";

import { Picker } from "@react-native-picker/picker";
import { states, crops } from "../../utils/mandi";

import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Mandi = () => {
  const [state, setState] = useState(null);
  const [crop, setCrop] = useState(null);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const navigation = useNavigation();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const dateObj = new Date(date);
    const year = dateObj.getUTCFullYear();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    setYear(year);
    setMonth(month);
    setDay(day);
    hideDatePicker();
  };

  const showPrice = () => {
    if (state === null || crop === null) {
      if (isChecked) {
        if (year === null || month === null || day === null) {
          ToastAndroid.show("Select all fields", ToastAndroid.SHORT);
          return;
        }
      }
      ToastAndroid.show("Select all fields", ToastAndroid.SHORT);
      return;
    }
    navigation.navigate("mandiprice", {
      state: state,
      crop: crop,
      checked: isChecked,
      year: year,
      month: month,
      day: day,
    });
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 28,
          textAlign: "center",
          fontWeight: 600,
          marginVertical: 20,
        }}
      >
        Enter information
      </Text>
      <View
        style={{
          borderWidth: 2,
          width: "90%",
          marginLeft: "5%",
          borderRadius: 15,
          color: "white",
          marginVertical: 20,
        }}
      >
        <Picker
          selectedValue={state}
          onValueChange={(itemValue) => setState(itemValue)}
        >
          <Picker.Item label="-- Select State --" value={null} />
          {states.map((state) => (
            <Picker.Item key={state} label={state} value={state} />
          ))}
        </Picker>
      </View>
      <View
        style={{
          borderWidth: 2,
          width: "90%",
          marginLeft: "5%",
          borderRadius: 15,
          color: "white",
          marginVertical: 20,
        }}
      >
        <Picker
          selectedValue={crop}
          onValueChange={(itemValue) => setCrop(itemValue)}
        >
          <Picker.Item label="-- Select Crop --" value={null} />
          {crops.map((crop) => (
            <Picker.Item key={crop} label={crop} value={crop} />
          ))}
        </Picker>
      </View>
      {isChecked && (
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              height: 45,
              width: "90%",
              marginLeft: "5%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
              marginVertical: 20,
            }}
            onPress={showDatePicker}
          >
            {!year ? (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: "white",
                }}
              >
                Pick Date
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: "white",
                }}
              >
                {day}/{month}/{year}
              </Text>
            )}
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          width: "30%",
          marginLeft: "8%",
        }}
      >
        <Checkbox value={isChecked} onValueChange={setChecked} />
        <Text
          style={{
            marginLeft: "10%",
          }}
        >
          Include Date
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "green",
          height: 45,
          width: "90%",
          marginLeft: "5%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 15,
          marginVertical: 20,
        }}
        onPress={showPrice}
      >
        {!isChecked ? (
          <Text
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "white",
            }}
          >
            Show Todays Price
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "white",
            }}
          >
            Show Price
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Mandi;
