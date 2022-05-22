import { View, StyleSheet } from "react-native";
import NumericInput from "react-native-numeric-input";
import DraggableFlatList from "react-native-draggable-flatlist";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export default function TimesInput(props) {
  const times = props.times;

  const [newTime, setNewTime] = useState(5);

  const renderItem = ({ drag, index, item }) => {
    return (
      <View style={styles.timeInterval}>
        <TouchableOpacity
          onPressIn={(data, i) => {
            const newTimes = [...times];
            newTimes.splice(i, 1);
            props.onChange(newTimes);
          }}
        >
          <Icon style={styles.icon} name="close" size={20} color="#fff" />
        </TouchableOpacity>
        <View style={styles.numberInput}>
          <NumericInput
            value={item}
            rounded
            textColor="white"
            rightButtonBackgroundColor="#9bbfb6"
            leftButtonBackgroundColor="#9bbfb6"
            borderColor="#9bbfb6"
            minValue={5}
            onChange={(value) => {
              const newTimes = [...times];
              newTimes[index] = value;
              props.onChange(newTimes);
            }}
          />
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
          props.onChange(data);
        }}
        data={times}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
      <View style={styles.timeInterval}>
        <View style={styles.numberInput}>
          <NumericInput
            value={newTime}
            rounded
            textColor="white"
            rightButtonBackgroundColor="#9bbfb6"
            leftButtonBackgroundColor="#9bbfb6"
            borderColor="#9bbfb6"
            minValue={5}
            onChange={setNewTime}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            const newTimes = [...times];
            newTimes.push(newTime);
            props.onChange(newTimes);
            setNewTime(5);
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
});
