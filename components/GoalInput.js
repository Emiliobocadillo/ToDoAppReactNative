import { useState } from "react";
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


function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    props.onAddGoal(enteredGoalText);
    setEnteredGoalText("");
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <LinearGradient
        colors={[Colors.secondary600, Colors.primary600]}
        style={styles.inputContainer}
      >
        <Text style={{ fontSize: 30, color: Colors.primary600 }}>
          Add Goal!
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
        <MyDatePicker addDeadline={props.addDeadline} />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Add Goal"
              onPress={addGoalHandler}
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

export default GoalInput;

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
