import { StyleSheet, View, Text, Pressable } from "react-native";
import Colors from "../constants/colors";
import PrimaryButton from "./PrimaryButton";

function GoalItem(props) {
  return (
    <View style={styles.goalItem}>
      <View style={styles.allContentContainer}>
        <View style={styles.datesAndButtonsContainer}>
          <View>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Created: </Text>
              {props.created}
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Deadline: </Text>
              {props.deadline}
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <PrimaryButton
              text="Delete"
              onButtonPress={() => props.onDeleteItem(props.id)}
              color={Colors.secondary700}
            />
            <PrimaryButton
              text="Update"
              onButtonPress={() =>
                props.onEditItem(props.id, props.deadline, props.description)
              }
            />
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.boldText}>Description:</Text>
          <Text style={styles.goalText}>{props.description}</Text>
        </View>
      </View>
    </View>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    backgroundColor: Colors.primary500,
    borderRadius: 6,
    padding: 3,
  },
  pressedItem: {
    opacity: 0.5,
  },

  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
  },
  datesAndButtonsContainer: {
    flexDirection: "row",
  },
  descriptionContainer: {
    alignItems: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
});
