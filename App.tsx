import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";

import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { NewsFeed } from "./components/NewsFeed";
import { Footer } from "./components/Footer";

export default function App() {
  const [section, setSection] = useState("Новости");
  const [loaded] = useFonts({
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Header title={section} />
      {section === "Главная" && <Home />}
      {section === "Новости" && <NewsFeed />}
      <Footer section={section} onChange={setSection} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
  },
});
