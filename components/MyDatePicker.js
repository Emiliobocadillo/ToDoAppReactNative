import { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "./PrimaryButton";
import formatDateTime from "../util/formatDateTime";
import dateStringToDateObject from "../util/dateStringToDateObject";

const MyDatePicker = (props) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("None");

  if (props.deadline) {
    useEffect(() => {
      setText(props.deadline);
      setDate(dateStringToDateObject(props.deadline));
    }, [props.deadline]);
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    const formattedDateTime = formatDateTime(currentDate);
    setText(formattedDateTime);

    if (props.addDeadline) {
      props.addDeadline(formattedDateTime);
    }
    if (props.addUpdatedDeadline) {
      props.addUpdatedDeadline(formattedDateTime);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.timeButtonsContainer}>
        <PrimaryButton
          onButtonPress={() => showMode("date")}
          icon={<Ionicons name="calendar-outline" size={24} color="black" />}
          text="Select Due Date"
        ></PrimaryButton>
        <PrimaryButton
          onButtonPress={() => showMode("time")}
          icon={<Ionicons name="time-outline" size={24} color="black" />}
          text="Select Due time"
        ></PrimaryButton>
      </View>
      <Text
        style={{ fontWeight: "bold", fontSize: 20, color: "white" }}
      >{`Chosen deadline: ${text}`}</Text>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
export default MyDatePicker;

const styles = StyleSheet.create({
  timeButtonsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
});
