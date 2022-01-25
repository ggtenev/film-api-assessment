import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface Props {
  title: string;
  uri: string;
}

const Film: React.FC<Props> = (props) => {
  const { title, uri } = props;
  return (
    <View style={styles.container}>
      <Image source={{ uri: uri }} style={styles.img} />
      <Text numberOfLines={2}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 5,
    borderColor: "grey",
    borderWidth: 0.4,
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  img: {
    width: 80,
    marginRight: 10,
    height: 120,
  },
});

export default Film;
