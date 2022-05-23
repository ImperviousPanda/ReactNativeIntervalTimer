import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import storage from "../state/Storage";
import TimesInput from "../components/TimesInput";
import uuid from "react-native-uuid";

export default function EditInterval({ route, navigation }) {
  const intervalId = route.params ? route.params.id : null;
  const [name, setName] = useState("");
  const [times, setTimes] = useState([]);
  const [intervals, setIntervals] = useState({});

  useEffect(() => {
    storage
      .load({
        key: "intervals",
      })
      .then((storedIntervals) => {
        setIntervals(storedIntervals);
        if (intervalId) {
          const interval = storedIntervals[intervalId];
          setName(interval.name);
          setTimes(interval.times);
        } else {
          let defaultName = "test";

          const keys = Object.keys(storedIntervals);
          for (let i = 0; i < 100; i++) {
            const testName = "Default " + i;
            if (!keys.includes(testName)) {
              defaultName = testName;
              break;
            }
          }

          setName(defaultName);
        }
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formView}>
        <Text style={[styles.text, styles.titleText]}>
          {intervalId ? "Edit Interval" : "Create Interval"}
        </Text>
        <View style={styles.textInputView}>
          <Text style={[styles.text, styles.inputLabel]}>Name:</Text>
          <TextInput
            style={[styles.text, styles.input]}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View>
          <Text style={[styles.text, styles.inputLabel]}>Times:</Text>
          <TimesInput times={times} onChange={setTimes} />
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={navigation.goBack}>
            <Text style={[styles.text, styles.inputLabel]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (intervalId) {
                intervals[intervalId].name = name;
                intervals[intervalId].times = times;
              } else {
                const newId = uuid.v4();
                intervals[newId] = {
                  name,
                  times,
                };
              }
              storage
                .save({
                  key: "intervals",
                  data: intervals,
                })
                .then(() => {
                  navigation.navigate("Home", {
                    refresh: true,
                  });
                });
            }}
          >
            <Text style={[styles.text, styles.inputLabel]}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formView: {
    margin: 20,
    marginTop: 30,
  },
  text: {
    color: "white",
  },
  titleText: {
    fontSize: 30,
  },
  input: {
    backgroundColor: "#9bbfb6",
    padding: 10,
    margin: 10,
    width: 200,
    borderRadius: 8,
  },
  textInputView: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 20,
  },
  button: {
    backgroundColor: "#465753",
    padding: 7,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    borderRadius: 8,
    marginRight: 10,
    marginLeft: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
