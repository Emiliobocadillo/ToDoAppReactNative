import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  Platform,
  Text,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import GoalUpdate from "./components/GoalUpdate";
import Colors from "./constants/colors";
import formatDateTime from "./util/formatDateTime";
import dateStringToDateObject from "./util/dateStringToDateObject";
import { createGoal, updateGoal, deleteGoal, getAllGoals } from "./util/dbCRUD";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  //  Goals array
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    // Fetch the initial goals
    getAllGoals()
      .then((fetchedGoals) => {
        setGoals(fetchedGoals);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // CREATE A NEW GOAL
  const [addModalIsVisible, setAddModalIsVisible] = useState(false);

  // Deadline
  const [deadline, setDeadline] = useState(formatDateTime(new Date()));

  function addDeadlineHandler(deadline) {
    setDeadline(deadline);
  }

  function startAddGoalHandler() {
    setAddModalIsVisible(true);
    setDeadline(null);
  }

  function endAddGoalHandler() {
    setAddModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    if (!enteredGoalText || enteredGoalText.trim().length === 0) {
      // Show alert if enteredGoalText is null or an empty string
      alert("Please enter a goal!");
      return;
    }
    // Check if user has chosen a deadline
    if (!deadline) {
      alert("Please choose a deadline!");
      return;
    }
    // ensure that user picks a deadline in future
    if (dateStringToDateObject(deadline) < new Date()) {
      alert("You can't choose a deadline in the past");
      return;
    }

    // add to database
    createGoal(enteredGoalText, deadline, formatDateTime(new Date()));

    getAllGoals()
      .then((fetchedGoals) => {
        setGoals(fetchedGoals);
      })
      .catch((error) => {
        console.log(error);
      });

    setAddModalIsVisible(false);
  }

  // UPDATE AN EXISTING GOAL

  const [editModalIsVisible, setEditModalIsVisible] = useState(false);

  const [editGoalId, setEditGoalId] = useState(null);
  const [editGoalDeadline, setEditGoalDeadline] = useState(null);
  const [editGoalDescription, setEditGoalDescription] = useState(null);

  function startEditGoalHandler(id, deadline, description) {
    setEditModalIsVisible(true);
    setEditGoalId(id);
    setEditGoalDeadline(deadline);
    setEditGoalDescription(description);
    setUpdatedDeadline(deadline)
  }

  const [updatedDeadline, setUpdatedDeadline] = useState(editGoalDeadline);

  function addUpdatedDeadlineHandler(updatedDeadline) {
    setUpdatedDeadline(updatedDeadline);
  }

  function endEditGoalHandler() {
    setEditModalIsVisible(false);
  }

  function editGoalHandler(enteredGoalText) {
    if (!enteredGoalText || enteredGoalText.trim().length === 0) {
      // Show alert if enteredGoalText is null or an empty string
      alert("Please enter a goal!");
      return;
    }
    // Check if user has chosen a deadline
    if (!updatedDeadline) {
      alert("Please choose a deadline!");
      return;
    }
    // ensure that user picks a deadline in future
    if (dateStringToDateObject(updatedDeadline) < new Date()) {
      alert("You can't choose a deadline in the past - from update function");
      return;
    }

    updateGoal(enteredGoalText, updatedDeadline, editGoalId);

    getAllGoals()
      .then((fetchedGoals) => {
        setGoals(fetchedGoals);
      })
      .catch((error) => {
        console.log(error);
      });

    setEditModalIsVisible(false);
  }

  // DELETE AN EXISTING GOAL

  function deleteGoalHandler(id) {
    deleteGoal(id);
    getAllGoals()
      .then((fetchedGoals) => {
        setGoals(fetchedGoals);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <StatusBar style="auto" />
      <LinearGradient
        colors={[Colors.secondary600, Colors.primary600]}
        style={styles.appContainer}
      >
        <Button
          title="Add New Goal"
          color={Colors.primary600}
          onPress={startAddGoalHandler}
        />

        <GoalInput
          onAddGoal={addGoalHandler}
          visible={addModalIsVisible}
          onCancel={endAddGoalHandler}
          addDeadline={addDeadlineHandler}
        />

        <GoalUpdate
          onEditGoal={editGoalHandler}
          visible={editModalIsVisible}
          onCancel={endEditGoalHandler}
          id={editGoalId}
          deadline={editGoalDeadline}
          description={editGoalDescription}
          addUpdatedDeadline={addUpdatedDeadlineHandler}
        />

        <View style={styles.goalsContainer}>
          <FlatList
            data={goals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  description={itemData.item.description}
                  id={itemData.item.id}
                  created={itemData.item.created}
                  deadline={itemData.item.deadline}
                  onDeleteItem={deleteGoalHandler}
                  onEditItem={startEditGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
  },
  goalsContainer: {
    flex: 6,
  },
  inputField: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    width: 300,
    marginBottom: 20,
  },
});
