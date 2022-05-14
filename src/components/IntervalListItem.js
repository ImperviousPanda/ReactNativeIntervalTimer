import { StyleSheet, View, Text } from "react-native";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const tileColors = ["#3066BE", "#40531B", "#DE6E4B", "#7768AE"];

export default function IntervalListItem(props) {
  const styles = getTileStyle(props.index);
  if (props.addNew) {
    return (
      <View style={styles.newIntervalContainer}>
        <Text style={styles.title}>Add New Interval</Text>
        <Icon style={styles.icon} name="plus" size={20} color="#fff" />
      </View>
    );
  }

  const interval = props.interval;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{interval.name}</Text>
      <Text style={styles.text}>
        Number of intervals: {interval.times.length}
      </Text>
      <Text style={styles.text}>Times: {interval.times.join(",")}</Text>
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;

const getTileStyle = (i) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: screenWidth,
      color: "white",
      padding: 10,
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
      width: screenWidth,
      margin: 10,
    },
    icon: {
      margin: 10,
    },
  });
};
