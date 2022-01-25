import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";

import Nav from "./navigation/Navigation";
import store from "./src/redux/store";
import { init } from "./src/db/db";

init()
  .then(() => {
    console.log("Initialized");
  })
  .catch((err) => {
    console.log(err);
  });

export default function App() {
  return (
    <Provider store={store}>
      <Nav />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
