import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../redux/favorites/actions";

interface Props {
  navigation: any;
  route: any;
}

interface routeParams {
  title: string;
  year: string;
  type: string;
  posterUri: string;
  id: string;
  favs: [];
}

const Details: React.FC<Props> = (props) => {
  const { navigation, route } = props;
  const { title, year, type, posterUri, id }: routeParams = route.params;

  const allFavorites = useSelector(({ favorites }: any) => favorites.favorites);
  console.log("from details", allFavorites);

  const dispatch = useDispatch();

  const headerRightHeart = () => {
    const slicedID = Number(id.slice(2));
    let isFav = false;
    allFavorites.forEach((element: any) => {
      if (element.id == slicedID) {
        isFav = true;
      }
    });

    if (isFav) {
      return (
        <TouchableOpacity
          onPress={() => dispatch(actions.removeFromFavoritesHandler(id))}
        >
          <AntDesign name='heart' size={24} color='red' />
        </TouchableOpacity>
      );
    } else
      return (
        <TouchableOpacity
          onPress={() => {
            dispatch(
              actions.addToFavorite({ title, year, type, posterUri, id })
            );
          }}
        >
          <AntDesign name='heart' size={24} color='lightgrey' />
        </TouchableOpacity>
      );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => headerRightHeart(),
    });
  }, [navigation, allFavorites]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: posterUri }} style={styles.img} />

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>{title}</Text>
      <Text>Released: {year}</Text>
      <Text>Type: {type}</Text>
      <Text>ID: {id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  img: {
    width: "60%",
    height: 260,
  },
});

export default Details;
