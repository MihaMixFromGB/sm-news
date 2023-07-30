import { StyleSheet, View, Text } from "react-native";

import HomeIcon from "../assets/icons/home.svg";
import NewsIcon from "../assets/icons/news.svg";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <View style={styles.container}>
      {title === "Главная" && <HomeIcon style={styles.icon} fill="#000" />}
      {title === "Новости" && <NewsIcon style={styles.icon} fill="#000" />}
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "stretch",
    paddingHorizontal: 15,
    paddingTop: 60,
    paddingBottom: 24,
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 4,
    marginRight: 7,
  },
  text: {
    fontFamily: "Montserrat-Bold",
    fontSize: 28,
    color: "#191C1F",
  },
});
