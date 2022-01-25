import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  StyleSheet,
  FlatList,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/favorites/actions";

import { APIKEY } from "@env";
import Film from "../components/Film";

const Home: React.FC = ({ navigation }: any) => {
  const [films, setFilms] = useState([] as object[]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const allFavorites = useSelector(({ favorites }: any) => favorites.favorites);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAllFavs());
    return;
  }, []);

  const fetchFilms: () => void = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const jsonData = await fetch(
        `http://www.omdbapi.com/?apikey=${APIKEY}&s=${search}`
      );
      const data = await jsonData.json();
      setFilms(data.Search);
      setLoading(false);
    } catch (error) {
      Alert.alert("There was an error");
      setLoading(false);
    }

    setSearch("");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='blue' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.title}>Please search for a film</Text>
        <TextInput
          value={search}
          onChangeText={(t) => setSearch(t)}
          style={styles.inputField}
        />
        <Button title='Search' onPress={fetchFilms} />

        <FlatList
          data={films}
          keyExtractor={(item: any) => item.imdbID}
          renderItem={({ item }: any) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Details", {
                  title: item.Title,
                  year: item.Year,
                  type: item.Type,
                  posterUri: item.Poster,
                  id: item.imdbID,
                })
              }
            >
              <Film title={item.Title} uri={item.Poster} />
            </TouchableOpacity>
          )}
        />
      </View>
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
    paddingTop: 60,
  },
  searchContainer: {},
  inputField: {
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    marginVertical: 5,
  },
  title: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
});

export default Home;
