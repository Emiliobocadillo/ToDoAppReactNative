import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../constants/colors";

function PrimaryButton({ onButtonPress, icon, text, color }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : [
                styles.buttonInnerContainer,
                { backgroundColor: color || Colors.secondary600 },
              ]
        }
        onPress={onButtonPress}
        android_ripple={{ color: Colors.primary600 }}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>{text}</Text>
          {icon}
        </View>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonContent: {
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
