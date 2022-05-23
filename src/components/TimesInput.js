import { View, StyleSheet, Text } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import TimeInput from "./TimeInput";

export default function TimesInput({ times, onChange, onEdit }) {
  const [newTime, setNewTime] = useState(5);

  const renderItem = ({ drag, index, item }) => {
    const minutes = Math.floor(item / 60);
    const seconds = item % 60;
    return (
      <View style={styles.timeInterval}>
        <TouchableOpacity
          onPressIn={(data, i) => {
            const newTimes = [...times];
            newTimes.splice(i, 1);
            onChange(newTimes);
          }}
        >
          <Icon style={styles.icon} name="close" size={20} color="#fff" />
        </TouchableOpacity>
        <View style={styles.numberInput}>
          <Text style={styles.timeDisplay}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        </View>
        <View style={styles.touchableContainer}>
          <TouchableOpacity
            onPressIn={drag}
            style={index === 0 ? styles.displayNone : {}}
          >
            <Icon style={styles.icon} name="bars" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <DraggableFlatList
        onDragEnd={({ data }) => {
          onChange(data);
        }}
        data={times}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
      <View style={styles.timeInterval}>
        <View style={styles.numberInput}>
          <TimeInput value={newTime} onChange={setNewTime} />
        </View>
        <TouchableOpacity
          onPress={() => {
            const newTimes = [...times];
            newTimes.push(newTime);
            onChange(newTimes);
          }}
        >
          <Icon style={styles.icon} name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  timeInterval: {
    backgroundColor: "#69847D",
    margin: 5,

    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    padding: 20,
  },
  numberInput: {
    marginLeft: 30,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  displayNone: {
    display: "none",
  },
  touchableContainer: {
    width: 60,
  },
  timeDisplay: {
    color: "white",
    fontSize: 24,
  },
});
