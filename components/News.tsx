import { ReactElement, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Linking,
} from "react-native";

import {
  News as INews,
  UIItem as IUIItem,
  Text as IText,
  Image as IImage,
  Link as ILink,
} from "../interfaces";
import { cutText } from "../services/news";

import DownIcon from "../assets/icons/down.svg";

interface NewsProps {
  news: INews;
  first?: boolean;
}

export function News({ news, first }: NewsProps) {
  const { title, body, date } = news;
  const [full, setFull] = useState(false);

  let content = null;
  if (body.length > 0 && full) {
    content = body.map(createUIElement) as Array<React.JSX.Element | null>;
  }
  if (body.length > 0 && !full) {
    const firstItem =
      body[0].type === "text"
        ? { ...body[0], content: cutText(body[0].content) }
        : body[0];
    content = createUIElement(firstItem);
  }

  return (
    <View style={[styles.container, { marginTop: first ? 16 : 0 }]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{content}</View>
      <View style={styles.details}>
        <Text style={styles.date}>{date}</Text>
        <Pressable style={styles.detailsButton} onPress={() => setFull(!full)}>
          <Text style={styles.detailsButtonLabel}>
            {full ? "Скрыть" : "Подробнее"}
          </Text>
          <DownIcon
            style={[
              styles.detailsButtonIcon,
              { transform: [{ rotate: full ? "180deg" : "0deg" }] },
            ]}
          />
        </Pressable>
      </View>
    </View>
  );
}

function createUIElement<T extends IUIItem>(item: T) {
  const { type } = item;
  if (type === "text") return createText(item);
  if (type === "link") return createLink(item);
  if (type === "image") return createImage(item);
  return null;
}

function createText(item: IText) {
  return (
    <Text
      key={item.content.substring(0, 10)}
      style={[styles.text, { fontFamily: `Montserrat-${item.weight}` }]}
    >
      {item.content}
    </Text>
  );
}

function createLink({ href, label }: ILink) {
  return (
    <Text key={href} style={styles.link} onPress={() => Linking.openURL(href)}>
      {label}
    </Text>
  );
}

function createImage({ src }: IImage) {
  return <Image key={src} style={styles.image} source={{ uri: src }} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  title: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 17,
    alignSelf: "stretch",
    textAlign: "left",
    color: "#191C1F",
    marginBottom: 16,
  },
  content: {
    flex: 0,
    alignSelf: "stretch",
    marginBottom: 16,
  },
  text: {
    fontSize: 15,
    alignSelf: "stretch",
    textAlign: "left",
    color: "#191C1F",
  },
  link: {
    fontFamily: "Montserrat-Medium",
    fontSize: 15,
    color: "#FF7700",
  },
  image: {
    alignSelf: "stretch",
    height: 150,
    borderRadius: 8,
  },
  details: {
    flex: 0,
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
  },
  date: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    color: "#8B959E",
  },
  detailsButton: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsButtonLabel: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14,
    color: "#FF7700",
  },
  detailsButtonIcon: {
    width: 12,
    height: 7,
    marginTop: 5,
    marginLeft: 10,
  },
});
