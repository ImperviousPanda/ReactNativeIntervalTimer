import { Text, SafeAreaView, StyleSheet } from "react-native";

export default function PlayInterval() {
  return (
    <SafeAreaView style={styles.container}>
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
