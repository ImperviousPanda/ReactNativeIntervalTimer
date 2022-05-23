import { View, StyleSheet, Text, TextInput } from "react-native";
import { useState, useEffect } from "react";
import ModalSelector from "react-native-modal-selector";

const dropdownValues = [...Array(60).keys()].map((item) => {
  const number = item < 10 ? "0" + item : item;
  return { key: number + "", label: number + "" };
});

export default function TimeInput({ value, onChange }) {
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  useEffect(() => {
    const minutes = Math.floor(value / 60);
    setMinutes((minutes < 10 ? "0" + minutes : minutes) + "");
    const seconds = value % 60;
    setSeconds((seconds < 10 ? "0" + seconds : seconds) + "");
  }, []);

  useEffect(() => {
    onChange(Number(minutes) * 60 + Number(seconds));
  }, [minutes, seconds]);

  return (
    <View style={styles.container}>
      <ModalSelector
        data={dropdownValues}
        onChange={(option) => {
          setMinutes(option.key);
        }}
      >
        <TextInput
          style={styles.textInput}
          editable={false}
          value={minutes + " min."}
        />
      </ModalSelector>
      <ModalSelector
        data={dropdownValues}
        onChange={(option) => {
          setSeconds(option.key);
        }}
      >
        <TextInput
          style={styles.textInput}
          editable={false}
          value={seconds + " sec."}
        />
      </ModalSelector>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    color: "white",
    fontSize: 24,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderColor: "white",
  },
  container: {
    width: 200,
    flexDirection: "row",
    justifyContent: "center",
  },
});
