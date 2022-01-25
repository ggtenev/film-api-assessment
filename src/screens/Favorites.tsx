import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import Film from "../components/Film";

const Favorites: React.FC = ({ navigation }: any) => {
  const allFavorites = useSelector(({ favorites }: any) => favorites.favorites);
  console.log("FAV", allFavorites);

  return (
    <View style={styles.container}>
      <FlatList
        data={allFavorites}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Details", {
                title: item.title,
                year: item.year,
                type: item.type,
                posterUri: item.posterUri,
                id: "tt" + String(item.id),
              })
            }
          >
            <Film title={item.title} uri={item.posterUri} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 40,
    width: "100%",
  },
  searchContainer: {},
  inputField: {
    borderColor: "black",
    borderWidth: 1,
    // width: "80%",
    padding: 5,
    marginVertical: 5,
  },
});

export default Favorites;
