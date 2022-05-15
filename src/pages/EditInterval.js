import { View, Text, SafeAreaView, StyleSheet } from "react-native";

export default function EditInterval() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Edit interval</Text>
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
