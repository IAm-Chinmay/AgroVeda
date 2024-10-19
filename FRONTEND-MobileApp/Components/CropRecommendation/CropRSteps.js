import { View, Text, FlatList } from "react-native";
import React from "react";

const CropRSteps = ({ route }) => {
  const { steps } = route.params;
  return (
    <>
      <FlatList
        data={steps}
        renderItem={({ index, item }) => {
          return <StepsList index={index} item={item} />;
        }}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </>
  );
};

const StepsList = ({ index, item }) => {
  return (
    <View
      style={{
        width: "90%",
        marginLeft: "5%",
        marginVertical: 20,
        borderWidth: 1,
        borderRadius: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 8,
        }}
      >
        <Text
          style={{
            fontSize: 22,
          }}
        >
          Step {index + 1} :
        </Text>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 800,
            marginHorizontal: 4,
            marginVertical: 10,
            width: "75%",
          }}
        >
          {item.title}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 400,
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      >
        {item.desc}
      </Text>
    </View>
  );
};

export default CropRSteps;
