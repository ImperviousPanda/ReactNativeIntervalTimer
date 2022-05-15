import { StyleSheet, View, Text, Button } from "react-native";
import { Dimensions, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import GestureRecognizer from "react-native-swipe-gestures";

const tileColors = ["#3066BE", "#40531B", "#DE6E4B", "#7768AE"];

export default function IntervalListItem(props) {
  const [mode, setMode] = useState("view");
  const styles = getTileStyle(props.index);
  if (props.addNew) {
    return (
      <View style={styles.newIntervalContainer}>
        <Text style={styles.title}>Add New Interval</Text>
        <Icon style={styles.addIcon} name="plus" size={20} color="#fff" />
      </View>
    );
  }

  const interval = props.interval;

  return (
    <View style={styles.container}>
      <GestureRecognizer
        onSwipeLeft={(state) => {
          setMode("edit");
        }}
        onSwipeRight={(state) => {
          setMode("view");
        }}
      >
        {mode === "view" && (
          <TouchableOpacity onPress={props.onPlay} style={styles.touchable}>
            <View style={styles.intervalListItemView}>
              <Text style={styles.title}>{interval.name}</Text>
              <Text style={styles.text}>
                Number of intervals: {interval.times.length}
              </Text>
              <Text style={styles.text}>Times: {interval.times.join(",")}</Text>
            </View>
          </TouchableOpacity>
        )}
        {mode === "edit" && (
          <View style={[styles.intervalListItemView, styles.editIntervalView]}>
            <View>
              <Text style={styles.title}>{interval.name}</Text>
              <Text style={styles.text}>
                Number of intervals: {interval.times.length}
              </Text>
              <Text style={styles.text}>Times: {interval.times.join(",")}</Text>
            </View>
            <View style={styles.editButtons}>
              <TouchableOpacity onPress={props.onDelete}>
                <Icon
                  style={styles.editIcon}
                  name="trash"
                  size={30}
                  color="#fff"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={props.onEdit}>
                <Icon
                  style={styles.editIcon}
                  name="pencil"
                  size={30}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </GestureRecognizer>
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;

const getTileStyle = (i) => {
  return StyleSheet.create({
    editButtons: {
      justifyContent: "flex-end",
      alignItems: "center",
      flexGrow: 1,
      display: "flex",
      height: 70,
      flexDirection: "row",
    },
    touchable: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      width: screenWidth,
    },
    intervalListItemView: {
      alignItems: "center",
      justifyContent: "center",
      width: screenWidth,
      flex: 1,
      height: 90,
      padding: 10,
    },
    editIntervalView: {
      backgroundColor: "red",
      alignItems: "flex-start",
      flexDirection: "row",
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: screenWidth,
      color: "white",
      backgroundColor: tileColors[i % tileColors.length],
    },
    text: {
      color: "white",
    },
    title: {
      color: "white",
      fontSize: 24,
      marginBottom: 5,
    },
    newIntervalContainer: {
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      margin: 10,
    },
    addIcon: {
      margin: 10,
    },
    editIcon: {
      padding: 15,
      paddingLeft: 20,
      paddingRight: 20,
    },
  });
};
