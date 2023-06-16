import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../config";

// Function to get all the goals
export function getAllGoals() {
  return new Promise((resolve, reject) => {
    getDocs(collection(db, "goals"))
      .then((docSnap) => {
        let goals = [];
        docSnap.forEach((doc) => {
          goals.push({ ...doc.data(), id: doc.id });
        });
        resolve(goals);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Function to create a goal and pass it to database
export function createGoal(
  description,
  deadline,
  created
) {
  addDoc(collection(db, "goals"), {
    description: description,
    deadline: deadline,
    created: created,
  })
    .then(() => {
      console.log("Goal created");
    })
    .catch((error) => {
      console.log(error);
    });
}

// Function to update a goal and pass it to database
export function updateGoal(description, deadline, id) {
  updateDoc(doc(db, "goals", id), {
    description: description,
    deadline: deadline,
  })
    .then(() => {
      console.log("Goal updated");
    })
    .catch((error) => {
      console.log(error);
    });
}

// Function to delete a goal from the database
export function deleteGoal(id) {
  deleteDoc(doc(db, "goals", id))
    .then(() => {
      console.log("Goal deleted");
    })
    .catch((error) => {
      console.log(error);
    });
}
