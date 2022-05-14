import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import IntervalListItem from "../components/IntervalListItem";
import MenuBar from "../components/MenuBar";

const list = [
  {
    name: "default 1",
    times: [60, 90, 60, 90, 60],
  },
  {
    name: "default 12",
    times: [60, 90, 60, 90, 60],
  },
  {
    name: "default 13",
    times: [60, 90, 60, 90, 60],
  },
];

export default function Main() {
  return (
    <SafeAreaView style={styles.container}>
      <MenuBar />
      <ScrollView>
        {list.map((l, i) => (
          <IntervalListItem key={i} index={i} interval={l} />
        ))}
        <IntervalListItem key={list.length} index={list.length} addNew={true} />
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
    width: "100%",
  },
});
