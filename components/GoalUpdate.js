import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Modal,
  Image,
  Text,
} from "react-native";
import Colors from "../constants/colors";
import MyDatePicker from "./MyDatePicker";
import { LinearGradient } from "expo-linear-gradient";

function GoalUpdate(props) {
  const [enteredGoalText, setEnteredGoalText] = useState("");

   useEffect(() => {
     setEnteredGoalText(props.description);
   }, [props.description]);


  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function editGoalHandler() {
    props.onEditGoal(enteredGoalText);
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <LinearGradient
        colors={[Colors.secondary600, Colors.primary600]}
        style={styles.inputContainer}
      >
        <Text style={{ fontSize: 30, color: Colors.primary600 }}>
          Update Goal!
        </Text>
        <Image
          style={styles.image}
          source={require("../assets/images/goal.png")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your Goal!"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <MyDatePicker
          addUpdatedDeadline={props.addUpdatedDeadline}
          deadline={props.deadline}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Save"
              onPress={editGoalHandler}
              color={Colors.primary500}
            />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" color={Colors.secondary700} onPress={props.onCancel} />
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );
}

export default GoalUpdate;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#120438",
    borderRadius: 6,
    width: "100%",
    padding: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  button: {
    width: "30%",
    marginHorizontal: 8,
  },
});
