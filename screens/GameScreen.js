import { Text, View, StyleSheet, Alert, FlatList } from "react-native";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import { useState, useEffect } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (userNumber === currentGuess) {
      onGameOver();
    }
  }, [userNumber, currentGuess, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  }
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess!</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View style={styles.card}>
        <Text style={styles.direction}>Higher or Lower!</Text>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="remove" size={24} color="white" />
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="add-sharp" size={24} color="white" />
          </PrimaryButton>
        </View>
      </View>
      <View>
        {/* {guessRounds.map((guessRound) => (
          <Text key={guessRound}>{guessRound}</Text>
        ))} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => <Text>{itemData.item}</Text>}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24 },
  card: {
    backgroundColor: Colors.primary800,
    padding: 16,
    borderRadius: 8,
  },
  direction: {
    color: Colors.secondary500,
    textAlign: "center",
    fontSize: 24,
    marginBottom: 12,
    fontWeight: "bold",
  },
});
