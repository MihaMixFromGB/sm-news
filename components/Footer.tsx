import { StyleSheet, View, Pressable, Text } from "react-native";

import HomeIcon from "../assets/icons/home.svg";
import NewsIcon from "../assets/icons/news.svg";

interface FooterProps {
  section: string;
  onChange: (section: string) => void;
}

export function Footer({ section, onChange }: FooterProps) {
  const isHomeActive = section === "Главная";
  const isNewsActive = section === "Новости";

  const itemLabelActiveClass = {
    ...styles.itemLabel,
    ...styles.itemLabelActive,
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.item, { marginRight: 25 }]}
        onPress={() => onChange("Главная")}
      >
        <HomeIcon
          style={styles.itemImage}
          fill={isHomeActive ? activeIconFill : defaultIconFill}
        />
        <Text style={isHomeActive ? itemLabelActiveClass : styles.itemLabel}>
          Главная
        </Text>
      </Pressable>
      <Pressable style={styles.item} onPress={() => onChange("Новости")}>
        <NewsIcon
          style={styles.itemImage}
          fill={isNewsActive ? activeIconFill : defaultIconFill}
        />
        <Text style={isNewsActive ? itemLabelActiveClass : styles.itemLabel}>
          Новости
        </Text>
      </Pressable>
    </View>
  );
}

const defaultIconFill = "#ADB4BB";
const activeIconFill = "#0666EB";

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "stretch",
    paddingTop: 12,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  item: {
    flex: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  itemImage: {
    width: 20,
    height: 20,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 6,
    color: "#8B959E",
  },
  itemLabelActive: {
    color: "#0666EB",
  },
});
