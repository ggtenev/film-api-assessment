import React, { useLayoutEffect, useEffect, useState } from "react";
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
import * as Linking from "expo-linking";
import { APIKEY } from "@env";

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

const Deeplinks: React.FC<Props> = (props) => {
  // const { navigation, route } = props;
  // const { title, year, type, posterUri, id }: routeParams = route.params;

  // const allFavorites = useSelector(({ favorites }: any) => favorites.favorites);
  // console.log("from details", allFavorites);

  const [data, setData] = useState(null);
  const [film, setFilm] = useState(null);

  const dispatch = useDispatch();

  const _handleUrl = ({ url }) => {
    let data = Linking.parse(url);
    console.log("data", data);

    fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${data.queryParams.id}`)
      .then((res) => res.json())
      .then((film) => {
        console.log(film);
        setFilm(film);
      });

    setData(data);
  };

  useEffect(() => {
    Linking.addEventListener("url", _handleUrl);
    return () => {
      Linking.removeEventListener("url");
    };
  }, []);

  //

  return (
    <View style={styles.container}>
      <Image source={{ uri: film?.Poster }} style={styles.img} />

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>{film?.Title}</Text>
      <Text>Released: {film?.Year}</Text>
      <Text>Type: {film?.Type}</Text>
      {/* <Text>ID: {id}</Text> */}
      {/* <Text>{film}</Text> */}
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

export default Deeplinks;
