import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import MenuBar from "../components/MenuBar";

export default function PlayInterval() {
  return (
    <SafeAreaView style={styles.container}>
      <MenuBar />
      <Text>Play interval</Text>
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