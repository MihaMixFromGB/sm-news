import { StyleSheet, View, Text } from "react-native";

export function Home() {
  return (
    <View style={styles.container}>
      <Text>Oops!...this page is under development</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
