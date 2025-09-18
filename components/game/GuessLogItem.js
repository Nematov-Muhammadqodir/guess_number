import { Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const GuessLogItem = ({ roundNumber, guess }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <FontAwesome5 name="jedi-order" size={24} color="black" />
        <Text style={styles.roundNumber}>{roundNumber}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.guessText}>Opponent's Guess: {guess}</Text>
      </View>
    </View>
  );
};

export default GuessLogItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    marginVertical: 8,
    borderColor: Colors.primary800,
    borderWidth: 2,
    borderRadius: 40,
    padding: 12,
    justifyContent: "space-between",
    width: "100%",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    backgroundColor: "white",
  },
  roundNumber: {
    fontFamily: "open-sans-bold",
  },
  guessText: {
    fontFamily: "open-sans-bold",
  },
});
