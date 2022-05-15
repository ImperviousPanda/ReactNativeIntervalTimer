import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import IntervalListItem from "../components/IntervalListItem";
import { useState, useEffect } from "react";
import storage from "../state/Storage";

export default function Main({ navigation }) {
  const [intervals, setIntervals] = useState({});

  useEffect(() => {
    storage
      .load({
        key: "intervals",
      })
      .then((storedIntervals) => {
        setIntervals(storedIntervals);
      });
  }, []);
  useEffect(() => {}, [intervals]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {Object.keys(intervals).map((key, i) => {
          const interval = intervals[key];
          return (
            <IntervalListItem
              key={i}
              index={i}
              interval={interval}
              onEdit={() => navigation.navigate("EditInterval", { id: key })}
              onDelete={() => {
                const newIntervals = { ...intervals };
                delete newIntervals[key];
                setIntervals(newIntervals);
              }}
              onPlay={() => navigation.navigate("PlayInterval")}
            />
          );
        })}
        <IntervalListItem
          key={intervals.length}
          index={intervals.length}
          onEdit={() => navigation.navigate("EditInterval")}
          addNew={true}
        />
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#84A59D",
    alignItems: "center",
    justifyContent: "center",
  },
});
