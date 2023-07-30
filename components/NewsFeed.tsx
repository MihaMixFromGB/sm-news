import { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { News as INews } from "../interfaces";
import { News } from "./News";
import smAPI from "../services/sm-api";

export function NewsFeed() {
  const [news, setNews] = useState<INews[]>([]);

  useEffect(() => {
    smAPI.getNews().then((news) => setNews(news));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.feed}
        data={news}
        renderItem={({ item }) => (
          <News news={item} first={news.length > 0 && item.id === news[0].id} />
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feed: {
    paddingHorizontal: 16,
  },
});
